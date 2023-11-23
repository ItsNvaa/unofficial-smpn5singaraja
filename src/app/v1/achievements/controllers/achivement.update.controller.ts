import { Request, Response } from "express";
import filesUploadFieldsValidation from "../../../../utils/filesUploadFieldsValidation";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";
import logger from "../../../../libs/logger";
import client from "../../../../libs/configs/prisma";
import achivement from "../../../../validations/achivementValidation";
import FilesUpload from "../../../../services/FilesUpload";
import path from "path";
import validator from "validator";
import validateEmptyField from "../../../../utils/validateEmptyField";
import TAchivement from "../interfaces/types/AchivementTypes";
import FilesSystem from "../../../../services/FilesSystem";

export default async function updateAchivement(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id)) return new ErrorsResponses().badRequest(res);

    validateEmptyField(req, res);

    const achivementValidation = achivement({ required: false });
    const { value, error } = achivementValidation.validate(req.body);
    if (error) return new ErrorsResponses().badRequest(res, error.message);

    const isAchivementExist: TAchivement | null =
      await client.achivement.findUnique({
        where: { id },
      });

    if (!isAchivementExist) return new ErrorsResponses().notFound(res);

    if (!req.files) {
      await client.achivement.update({
        where: { id },
        data: { ...value },
      });

      return new SuccessResponses().success(res, "updated");
    }

    if (req.files) {
      filesUploadFieldsValidation(req, res, "picture");

      const pathName = "./public/img/achivements/pictures";
      // @ts-ignore
      const picture: UploadedFile = req.files.picture;
      const urlPath: string = `${req.protocol}://${req.get(
        "host"
      )}/img/achivements/pictures/${picture.md5 + path.extname(picture.name)}`;

      const oldImageFileName = isAchivementExist.picture.split("/")[6];
      const oldImagePath: string = `./public/img/achivements/pictures/${oldImageFileName}`;
      new FilesSystem().deleteFile(oldImagePath);

      new FilesUpload().save({
        request: req,
        response: res,
        file: picture,
        pathName,
      });

      await client.achivement.update({
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
