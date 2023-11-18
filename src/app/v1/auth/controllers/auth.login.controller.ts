import "dotenv/config";
import { Response, Request } from "express";
import logger from "../../../../libs/logger";
import { ErrorsResponses } from "../../../../utils/res";
import client from "../../../../libs/configs/prisma";
import responsesMessege from "../../../../const/readonly/responsesMessege";
import user from "../../../../validations/userValidation";
import Argon2 from "../../../../services/Argon2";
import TUser from "../../users/interfaces/types/UserTypes";
import JsonWebToken from "../../../../services/JsonWebToken";
// import { CLIENT_URL } from "../../../../const/config";

export default async function login(
  req: Request,
  res: Response
): Promise<void | Response<Record<any, string>>> {
  try {
    if (!Object.keys(req.body).length)
      return new ErrorsResponses().badRequest(
        res,
        responsesMessege.emptyFields
      );

    const authValidation = user({ required: true });
    const { value, error } = authValidation.validate(req.body);
    if (error) return new ErrorsResponses().badRequest(res, error.message);

    const users: Awaited<TUser[]> = await client.user.findMany({
      where: { email: value.email, name: value.name },
    });

    if (!users.length)
      return new ErrorsResponses().notFound(res, "Invalid email or username!");

    const isVerified = new Argon2().verify(value, users[0].password);

    if (!isVerified)
      return new ErrorsResponses().unprocessable(
        res,
        "The password isn't correct!"
      );

    // @ts-ignore
    const { accessToken, refreshToken } = new JsonWebToken().sign({
      payload: { name: value.name, id: value.id, email: value.id },
    });

    const isSecured = process.env.NODE_ENV == "production" ? true : false;
    res.cookie("refreshToken", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      secure: isSecured,
      httpOnly: true,
    });

    return res.status(200).json({ access: true, token: accessToken });
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
