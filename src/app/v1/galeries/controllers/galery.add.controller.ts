import path from "path";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import client from "../../../../libs/configs/prisma";
import logger from "../../../../libs/logger";
import { SuccessResponses, ErrorsResponses } from "../../../../utils/res";
import galery from "../../../../validations/galeryValidation";
import FilesUpload from "../../../../services/FilesUpload";
import filesUploadFieldsValidation from "../../../../utils/filesUploadFieldsValidation";
import responsesMessege from "../../../../const/readonly/responsesMessege";

export default async function addGalery(
  req: Request,
  res: Response
): Promise<void | Response> {
  try {
    if (!Object.keys(req.body).length)
      return new ErrorsResponses().badRequest(
        res,
        responsesMessege.emptyFields
      );

    const galeryValidation = galery({ required: true });
    const { value, error } = galeryValidation.validate(req.body);
    if (error) return new ErrorsResponses().badRequest(res, error.message);

    if (!req.files)
      return new ErrorsResponses().unprocessable(
        res,
        "The picture field must be filled."
      );

    if (req.files) {
      filesUploadFieldsValidation(req, res, "picture");

      const pathName = "./public/img/galeries/pictures";
      const picture: UploadedFile | UploadedFile[] = Array.isArray(
        req.files.picture
      )
        ? req.files.picture[0]
        : req.files.picture;
      const urlPath: string = `${req.protocol}://${req.get(
        "host"
      )}/img/galeries/pictures/${picture.md5 + path.extname(picture.name)}`;

      new FilesUpload().save({
        request: req,
        response: res,
        file: picture,
        pathName,
      });

      await client.galery.create({
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
