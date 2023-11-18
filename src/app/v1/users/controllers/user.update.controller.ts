import { Response, Request } from "express";
import client from "../../../../libs/configs/prisma";
import validator from "validator";
import logger from "../../../../libs/logger";
import user from "../../../../validations/userValidation";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";
import FilesUpload from "../../../../services/FilesUpload";
import path from "path";
import TUser from "../interfaces/types/UserTypes";
import filesUploadFieldsValidation from "../../../../utils/filesUploadFieldsValidation";
import responsesMessege from "../../../../const/readonly/responsesMessege";
import Argon2 from "../../../../services/Argon2";

export default async function updateUser(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id)) return new ErrorsResponses().badRequest(res);
    if (!Object.keys(req.body).length)
      return new ErrorsResponses().badRequest(
        res,
        responsesMessege.emptyFields
      );

    const userValidation = user({ required: false });
    const { value, error } = userValidation.validate(req.body);
    if (error) return new ErrorsResponses().badRequest(res, error.message);

    let password: string | null;
    password = new Argon2().hash(value.password);
    if (!password || !value.password) password = value.password;

    if (!req.files) {
      await client.user.update({
        where: { id },
        data: {
          ...value,
          password,
        },
      });

      if (!error) return new SuccessResponses().success(res, "updated");
    }

    if (req.files) {
      filesUploadFieldsValidation(req, res, "picture");
      const pathName = "./public/img/users/pictures";
      // @ts-ignore
      const picture: UploadedFile = req.files.picture;
      const urlPath: string = `${req.protocol}://${req.get(
        "host"
      )}/img/users/pictures/${picture.md5 + path.extname(picture.name)}`;

      new FilesUpload().save<TUser>({
        request: req,
        response: res,
        pathName,
        file: picture,
      });

      await client.user.update({
        where: { id },
        data: { ...value, picture: urlPath, password },
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
