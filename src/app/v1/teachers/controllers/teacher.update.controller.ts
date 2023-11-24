import path from "path";
import validator from "validator";
import { Request, Response } from "express";
import client from "../../../../libs/configs/prisma";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";
import logger from "../../../../libs/logger";
import validateEmptyField from "../../../../utils/validateEmptyField";
import filesUploadFieldsValidation from "../../../../utils/filesUploadFieldsValidation";
import FilesUpload from "../../../../services/FilesUpload";
import responsesMessege from "../../../../const/readonly/responsesMessege";
import teacher from "../../../../validations/teacherValidation";
import TeacherType from "../interfaces/types/TeacherTypes";
import FilesSystem from "../../../../services/FilesSystem";
import { UploadedFile } from "express-fileupload";

export default async function updateTeacher(
  req: Request,
  res: Response
): Promise<void | Response> {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id))
      return new ErrorsResponses().badRequest(
        res,
        responsesMessege.wrongRequestID
      );

    validateEmptyField(req, res);

    const teacherValidation = teacher({ required: false });
    const { value, error } = teacherValidation.validate(req.body);
    if (error) return new ErrorsResponses().badRequest(res, error.message);

    const isTeacherExist: TeacherType | null = await client.teacher.findUnique({
      where: { id },
    });

    if (!isTeacherExist) return new ErrorsResponses().notFound(res);

    if (!req.files) {
      await client.teacher.update({
        where: { id },
        data: { ...value },
      });

      return new SuccessResponses().success(res, "updated");
    }

    if (req.files) {
      filesUploadFieldsValidation(req, res, "picture");

      const pathName = "./public/img/teachers/pictures";
      const picture: UploadedFile | UploadedFile[] = Array.isArray(
        req.files.picture
      )
        ? req.files.picture[0]
        : req.files.picture;
      const urlPath: string = `${req.protocol}://${req.get(
        "host"
      )}/img/teachers/pictures/${picture.md5 + path.extname(picture.name)}`;

      const oldImageFileName = isTeacherExist.picture.split("/")[6];
      const oldImagePath: string = `./public/img/galeries/pictures/${oldImageFileName}`;
      new FilesSystem().deleteFile(oldImagePath);

      new FilesUpload().save({
        request: req,
        response: res,
        file: picture,
        pathName,
      });

      await client.teacher.update({
        where: { id },
        data: { ...value, picture: urlPath },
      });

      return new SuccessResponses().success(res, "updated");
    }
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
