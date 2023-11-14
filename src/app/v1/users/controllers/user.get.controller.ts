import { Response, Request } from "express";
import logger from "../../../../libs/logger";
import type TUser from "../interfaces/types/UserTypes";
import client from "../../../../libs/configs/prisma";
import validator from "validator";
import Responses from "../../../../utils/res";
const response = new Responses();

export async function singleUser(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id))
      return response.badRequest(res, "The User ID was not valid.");
    const user: TUser | null = await client.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return response.notFound(res);

    return response.successWithSingleData(res, "users", user);
  } catch (err) {
    logger.error(err);
    return response.badRequest(res);
  } finally {
    client.$disconnect();
  }
}
