import path from "path";
import validator from "validator";
import { Request, Response } from "express";
import client from "../../../../libs/configs/prisma";
import logger from "../../../../libs/logger";
import validateEmptyField from "../../../../utils/validateEmptyField";
import filesUploadFieldsValidation from "../../../../utils/filesUploadFieldsValidation";
import galery from "../../../../validations/galeryValidation";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";
import FilesUpload from "../../../../services/FilesUpload";

export default async function updateGalery(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id)) return new ErrorsResponses().badRequest(res);

    validateEmptyField(req, res);

    const galeryValidation = galery({ required: false });
    const { value, error } = galeryValidation.validate(req.body);
    if (error) return new ErrorsResponses().badRequest(res, error.message);

    if (!req.files) {
      await client.galery.update({
        where: { id },
        data: { ...value },
      });

      return new SuccessResponses().success(res, "updated");
    }

    if (req.files) {
      filesUploadFieldsValidation(req, res, "picture");

      const pathName = "./public/img/galeries/pictures";
      // @ts-ignore
      const picture: UploadedFile = req.files.picture;
      const urlPath: string = `${req.protocol}://${req.get(
        "host"
      )}/img/galeries/pictures/${picture.md5 + path.extname(picture.name)}`;

      new FilesUpload().save({
        request: req,
        response: res,
        file: picture,
        pathName,
      });

      await client.galery.update({
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
