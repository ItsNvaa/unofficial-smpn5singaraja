import path from "path";
import { Request, Response } from "express";
import client from "../../../../libs/configs/prisma";
import logger from "../../../../libs/logger";
import article from "../../../../validations/articleValidation";
import responsesMessege from "../../../../const/readonly/responsesMessege";
import FilesUpload from "../../../../services/FilesUpload";
import filesUploadFieldsValidation from "../../../../utils/filesUploadFieldsValidation";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";

export default async function addArticle(
  req: Request,
  res: Response
): Promise<void | Response<Record<any, string>>> {
  try {
    if (!Object.keys(req.body).length)
      return new ErrorsResponses().badRequest(
        res,
        responsesMessege.emptyFields
      );

    const articleValidation = article({ required: true });
    const { value, error } = articleValidation.validate(req.body);
    if (error) return new ErrorsResponses().badRequest(res, error.message);

    if (!req.files)
      return new ErrorsResponses().badRequest(
        res,
        "The picture field must be filled."
      );

    if (req.files) {
      filesUploadFieldsValidation(req, res, "picture");

      const pathName = "./public/img/articles/pictures";
      // @ts-ignore
      const picture: UploadedFile = req.files.picture;
      const urlPath: string = `${req.protocol}://${req.get(
        "host"
      )}/img/articles/pictures/${picture.md5 + path.extname(picture.name)}`;

      new FilesUpload().save({
        request: req,
        response: res,
        file: picture,
        pathName,
      });

      await client.article.create({
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
