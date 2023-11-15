import { Response, Request } from "express";
import client from "../../../../libs/configs/prisma";
import validator from "validator";
import logger from "../../../../libs/logger";
import user from "../../../../validations/userValidation";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";
import FilesUpload from "../../../../services/FilesUpload";
import path from "path";

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
        "The input fields must be filled."
      );

    const userValidation = user({ required: false });
    const { value, error } = userValidation.validate(req.body);
    if (error) return new ErrorsResponses().badRequest(res, error.message);

    if (!req.files) {
      await client.user.update({
        where: { id },
        data: {
          ...value,
        },
      });

      if (!error) return new SuccessResponses().success(res, "update");
    }

    if (req.files) {
      if (!validator.contains("picture", Object.keys(req.files)))
        return new ErrorsResponses().unprocessable(
          res,
          `The ${Object.keys(req.files)[0]} was not allowed`
        );
      const pathName = "./public/img/users/pictures";
      // @ts-ignore
      const picture: UploadedFile = req.files.picture;
      const urlPath: string = `${req.protocol}://${req.get(
        "host"
      )}/img/users/pictures/${picture.md5 + path.extname(picture.name)}`;

      new FilesUpload().update({
        request: req,
        response: res,
        pathName,
        body: value,
        id,
        urlPath,
      });
    }
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    client.$disconnect();
  }
}