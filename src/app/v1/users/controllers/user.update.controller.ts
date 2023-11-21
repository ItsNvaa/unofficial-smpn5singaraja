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
import Argon2 from "../../../../services/Argon2";
import validateEmptyField from "../../../../utils/validateEmptyField";
import FilesSystem from "../../../../services/FilesSystem";

export default async function updateUser(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id)) return new ErrorsResponses().badRequest(res);

    validateEmptyField(req, res);
    const userValidation = user({ required: false });
    const { value, error } = userValidation.validate(req.body);
    if (error) return new ErrorsResponses().badRequest(res, error.message);

    const isUserExits: TUser | null = await client.user.findUnique({
      where: { id },
    });

    if (!isUserExits) return new ErrorsResponses().notFound(res);

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

      const oldImageFileName = isUserExits.picture.split("/")[6];
      const oldImagePath: string = `./public/img/users/pictures/${oldImageFileName}`;
      new FilesSystem().deleteFile(oldImagePath);

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
