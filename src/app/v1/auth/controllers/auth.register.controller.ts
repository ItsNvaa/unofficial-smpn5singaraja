import { Request, Response } from "express";
import { ErrorsResponses } from "../../../../utils/res";
import logger from "../../../../libs/logger";
import user from "../../../../validations/userValidation";
import filesUploadFieldsValidation from "../../../../utils/filesUploadFieldsValidation";
import client from "../../../../libs/configs/prisma";
import FilesUpload from "../../../../services/FilesUpload";
import responsesMessege from "../../../../const/readonly/responsesMessege";
import Argon2 from "../../../../services/Argon2";
import registerUser from "../services/registerUser";
import path from "path";
import validateUsernameAndEmail from "../services/validateUsernameAndEmail";

export default async function register(
  req: Request,
  res: Response
): Promise<void | Response<Record<any, string>>> {
  try {
    if (!Object.keys(req.body).length)
      return new ErrorsResponses().badRequest(
        res,
        responsesMessege.emptyFields
      );

    const authValidation = user({ required: true });
    const { value, error } = authValidation.validate(req.body);
    if (error) return new ErrorsResponses().badRequest(res, error.message);

    validateUsernameAndEmail(res, value);
    const password: string = new Argon2().hash(value.password);

    if (!req.files) {
      registerUser(res, value, password, value.picture);
    }

    if (req.files) {
      filesUploadFieldsValidation(req, res, "picture");

      const pathName = "./public/img/users/pictures";
      // @ts-ignore
      const picture: UploadedFile = req.files.picture;
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
