import "dotenv/config";
import { Response, Request } from "express";
import JsonWebToken from "../../../../services/JsonWebToken";
import client from "../../../../libs/configs/prisma";
import logger from "../../../../libs/logger";
import { OAuth2Client, authUrl } from "../../../../libs/configs/google";
import { google } from "googleapis";
import { ErrorsResponses } from "../../../../utils/res";
import user from "../../../../validations/userValidation";
import { CLIENT_FRONTEND_URL } from "../../../../const/config";

export async function loginWithGoogle(
  req: Request,
  res: Response
): Promise<void | Response> {
  try {
    const authValidation = user({ required: false });
    const { value, error } = authValidation.validate(req.body);
    if (error) return new ErrorsResponses().badRequest(res, error.message);

    const { code } = req.query;
    const { tokens } = await OAuth2Client.getToken(code as string);

    if (!tokens) return new ErrorsResponses().badRequest(res, "Login Failed");
    if (tokens) OAuth2Client.setCredentials(tokens);
    const oAuth2Config = google.oauth2({ version: "v2", auth: OAuth2Client });

    const { data } = await oAuth2Config.userinfo.get();

    if (!data) return res.redirect(`${CLIENT_FRONTEND_URL}/auth/register`);

    const users = await client.user.findMany({
      where: { email: data.email!, name: data.name! },
    });

    if (!users[0]) {
      await client.user.create({
        data: {
          email: data.email!,
          name: data.name!,
          picture: data.picture!,
          gender: data.gender! || value.gender,
          age: value.age,
          password: "",
        },
      });
    }

    // @ts-expect-error Return type did not match
    const { accessToken, refreshToken } = new JsonWebToken().sign({
      payload: { name: data.name!, email: data.email!, id: data.id! },
    });

    const isSecured = process.env.NODE_ENV == "production" ? true : false;
    res.cookie("refreshToken", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      secure: isSecured,
      httpOnly: true,
    });

    return res.redirect(
      `${CLIENT_FRONTEND_URL}/auth/login/google?token=${accessToken}`
    );
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res, "Login Failed");
  } finally {
    await client.$disconnect();
  }
}

export function redirectGoogleAuth(
  req: Request,
  res: Response
): Response | void {
  return res.redirect(authUrl);
}
