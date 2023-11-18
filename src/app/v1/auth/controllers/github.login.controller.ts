import { Request, Response } from "express";
import client from "../../../../libs/configs/prisma";
import logger from "../../../../libs/logger";
import { ErrorsResponses } from "../../../../utils/res";
import { CLIENT_FRONTEND_URL } from "../../../../const/config";
import user from "../../../../validations/userValidation";
import {
  githubUrl,
  userGithubUrl,
  rediretGithubAuthUrl,
} from "../const/readonly/githubAuthUrl";
import type TGithubAccessToken from "../interfaces/types/GithubAccessTokenTypes";
import JsonWebToken from "../../../../services/JsonWebToken";
import useFetch from "../../../../utils/useFetch";
import type TGithubUser from "../interfaces/types/GithubUserTypes";

export async function loginWithGithub(
  req: Request,
  res: Response
): Promise<void | Response<Record<any, string>>> {
  try {
    const authValidation = user({ required: false });
    const { value, error } = authValidation.validate(req.body);
    if (error) return new ErrorsResponses().badRequest(res, error.message);

    const { code } = req.query;

    const result: Awaited<TGithubAccessToken | null> =
      await useFetch<TGithubAccessToken>(`${githubUrl}&code=${code}`, "POST");

    if (!result)
      return new ErrorsResponses().badRequest(res, "Something wrong happen!");
    const { access_token, token_type } = result;

    const token: string = `${token_type} ${access_token}`;
    const userData: Awaited<null | TGithubUser> = await useFetch<TGithubUser>(
      userGithubUrl,
      "GET",
      token
    );

    if (!userData)
      return new ErrorsResponses().unprocessable(
        res,
        "Cannot proccess your login request"
      );

    const users = await client.user.findMany({
      where: {
        email: userData.email! || value.email || "",
        name: userData.name!,
      },
    });

    if (!users[0]) {
      await client.user.create({
        data: {
          email: userData.email! || value.email || "",
          name: userData.name!,
          picture: userData.avatar_url!,
          gender: userData.gender! || value.gender,
          age: value.age,
          password: "",
        },
      });
    }

    // @ts-ignore
    const { accessToken, refreshToken } = new JsonWebToken().sign({
      payload: {
        name: userData.name,
        email: userData.email || value.email || "",
      },
    });

    const isSecured = process.env.NODE_ENV == "production" ? true : false;
    res.cookie("refreshToken", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      secure: isSecured,
      httpOnly: true,
    });

    return res.redirect(
      `${CLIENT_FRONTEND_URL}/auth/login/github?token=${accessToken}`
    );
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res, "Login Failed");
  } finally {
    await client.$disconnect();
  }
}

export function redirectGithubAuth(
  req: Request,
  res: Response
): Response | void {
  return res.redirect(rediretGithubAuthUrl);
}
