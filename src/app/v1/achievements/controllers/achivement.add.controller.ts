import achivement from "../../../../validations/achivementValidation";
import { Response, Request } from "express";
import FilesUpload from "../../../../services/FilesUpload";
import client from "../../../../libs/configs/prisma";
import { UploadedFile } from "express-fileupload";
import logger from "../../../../libs/logger";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";
import filesUploadFieldsValidation from "../../../../utils/filesUploadFieldsValidation";
import path from "path";

export default async function addAchivement(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    if (!Object.keys(req.body).length)
      return new ErrorsResponses().badRequest(
        res,
        "The input fields must be filled."
      );

    const achivementValidation = achivement({ required: true });
    const { value, error } = achivementValidation.validate(req.body);
    if (error) return new ErrorsResponses().badRequest(res, error.message);

    if (!req.files) {
      await client.achivement.create({
        data: { ...value },
      });

      return new SuccessResponses().success(res, "created", "create");
    }

    if (req.files) {
      filesUploadFieldsValidation(req, res, "picture");

      const pathName = "./public/img/achivements/pictures";
      // @ts-ignore
      const picture: UploadedFile = req.files.picture;
      const urlPath: string = `${req.protocol}://${req.get(
        "host"
      )}/img/achivements/pictures/${picture.md5 + path.extname(picture.name)}`;

      new FilesUpload().save({
        request: req,
        response: res,
        file: picture,
        pathName,
      });

      await client.achivement.create({
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
