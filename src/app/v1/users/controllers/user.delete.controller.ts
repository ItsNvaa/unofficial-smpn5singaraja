import { Response, Request } from "express";
import { SuccessResponses, ErrorsResponses } from "../../../../utils/res";
import FilesSystem from "../../../../services/FilesSystem";
import logger from "../../../../libs/logger";
import deleteUserViaClient from "../services/deleteUserViaClient";
import validator from "validator";
import client from "../../../../libs/configs/prisma";
import TUser from "../interfaces/types/UserTypes";

export default async function deleteUser(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id))
      return new ErrorsResponses().badRequest(
        res,
        "The User ID was not valid."
      );

    const findUser: Awaited<TUser> | null = await client.user.findUnique({
      where: { id },
    });

    if (!findUser || findUser == null)
      return new ErrorsResponses().badRequest(
        res,
        "Failed to delete user, please try again later."
      );

    if (findUser) {
      const fileName =
        findUser.picture == "" || findUser.picture == null
          ? "notExist.png"
          : findUser.picture.split("/")[6];
      const path: string = `./public/img/users/pictures/${fileName}`;
      const isExist: boolean | null = new FilesSystem().isExist(path);

      if (isExist) {
        await deleteUserViaClient(id);

        new FilesSystem().deleteFile(path);

        return new SuccessResponses().success(res, "deleted");
      }

      await deleteUserViaClient(id);

      return new SuccessResponses().success(res, "deleted");
    }
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
