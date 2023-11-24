import { Response, Request } from "express";
import logger from "../../../../libs/logger";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";
import client from "../../../../libs/configs/prisma";

export default async function logout(
  req: Request,
  res: Response
): Promise<void | Response> {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken || refreshToken == undefined)
      return new ErrorsResponses().unprocessable(res, "Failed to logout user");

    if (refreshToken) res.clearCookie("refreshToken");

    return new SuccessResponses().success(res, "logout");
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
