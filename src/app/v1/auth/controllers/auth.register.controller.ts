import { Request, Response } from "express";
import { ErrorsResponses } from "../../../../utils/res";
import logger from "../../../../libs/logger";
import user from "../../../../validations/userValidation";
import filesUploadFieldsValidation from "../../../../utils/filesUploadFieldsValidation";
import client from "../../../../libs/configs/prisma";
import FilesUpload from "../../../../services/FilesUpload";
import Argon2 from "../../../../services/Argon2";
import registerUser from "../services/registerUser";
import path from "path";
import validateUsernameAndEmail from "../services/validateUsernameAndEmail";
import validateEmptyField from "../../../../utils/validateEmptyField";
import { UploadedFile } from "express-fileupload";

export default async function register(
  req: Request,
  res: Response
): Promise<void | Response> {
  try {
    validateEmptyField(req, res);

    const authValidation = user({ required: true });
    const { value, error } = authValidation.validate(req.body);
    if (error) return new ErrorsResponses().badRequest(res, error.message);

    validateUsernameAndEmail(res, value);
    const password: string | null = new Argon2().hash(value.password)!;

    if (!req.files) {
      registerUser(res, value, password, value.picture);
    }

    if (req.files) {
      filesUploadFieldsValidation(req, res, "picture");

      const pathName = "./public/img/users/pictures";
      const picture: UploadedFile | UploadedFile[] = Array.isArray(
        req.files.picture
      )
        ? req.files.picture[0]
        : req.files.picture;
      const urlPath: string = `${req.protocol}://${req.get(
        "host"
      )}/img/users/pictures/${picture?.md5 + path.extname(picture?.name)}`;

      new FilesUpload().save({
        request: req,
        response: res,
        pathName,
        file: picture,
      });

      registerUser(res, value, password, urlPath);
    }
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
