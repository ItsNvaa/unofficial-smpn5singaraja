import validator from "validator";
import FilesSystem from "../../../../services/FilesSystem";
import { Request, Response } from "express";
import client from "../../../../libs/configs/prisma";
import logger from "../../../../libs/logger";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";
import responsesMessege from "../../../../const/readonly/responsesMessege";
import TeacherType from "../interfaces/types/TeacherTypes";

export default async function deleteTeacher(
  req: Request,
  res: Response
): Promise<void | Response> {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id)) return new ErrorsResponses().badRequest(res);

    const findTeacher: Awaited<TeacherType> | null =
      await client.teacher.findUnique({
        where: { id },
      });

    if (!findTeacher || findTeacher == null)
      return new ErrorsResponses().badRequest(
        res,
        responsesMessege.cannotDelete
      );

    if (findTeacher) {
      const fileName =
        findTeacher.picture == "" || findTeacher.picture == null
          ? "notExist.png"
          : findTeacher.picture.split("/")[6];
      const path: string = `./public/img/achivements/pictures/${fileName}`;
      const isExist: boolean | null = new FilesSystem().isExist(path);

      if (isExist) {
        await client.teacher.delete({
          where: { id },
        });

        new FilesSystem().deleteFile(path);

        return new SuccessResponses().success(res, "deleted");
      }

      await client.teacher.delete({
        where: { id },
      });

      return new SuccessResponses().success(res, "deleted");
    }
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
