import path from "path";
import { Request, Response } from "express";
import logger from "../../../../libs/logger";
import client from "../../../../libs/configs/prisma";
import filesUploadFieldsValidation from "../../../../utils/filesUploadFieldsValidation";
import FilesUpload from "../../../../services/FilesUpload";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";
import teacher from "../../../../validations/teacherValidation";
import responsesMessege from "../../../../const/readonly/responsesMessege";
import { UploadedFile } from "express-fileupload";

export default async function addTeacher(
  req: Request,
  res: Response
): Promise<void | Response> {
  try {
    if (!Object.keys(req.body).length)
      return new ErrorsResponses().badRequest(
        res,
        responsesMessege.emptyFields
      );

    const teacherValidation = teacher({ required: true });
    const { value, error } = teacherValidation.validate(req.body);
    if (error) return new ErrorsResponses().badRequest(res, error.message);

    if (!req.files) {
      await client.teacher.create({
        data: { ...value },
      });

      return new SuccessResponses().success(res, "created", "create");
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

      new FilesUpload().save({
        request: req,
        response: res,
        file: picture,
        pathName,
      });

      await client.teacher.create({
        data: { ...value, picture: urlPath },
      });

      return new SuccessResponses().success(res, "created", "create");
    }
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
