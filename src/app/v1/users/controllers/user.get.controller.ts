import { Response, Request } from "express";
import logger from "../../../../libs/logger";
import type TUser from "../interfaces/types/UserTypes";
import client from "../../../../libs/configs/prisma";
import validator from "validator";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";

export async function singleUser(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id))
      return new ErrorsResponses().badRequest(
        res,
        "The User ID was not valid."
      );
    const user: TUser | null = await client.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return new ErrorsResponses().notFound(res);

    return new SuccessResponses().sendSuccessSingleData(res, "users", user);
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
