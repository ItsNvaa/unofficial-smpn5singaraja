import path from "path";
import validator from "validator";
import { Request, Response } from "express";
import client from "../../../../libs/configs/prisma";
import logger from "../../../../libs/logger";
import article from "../../../../validations/articleValidation";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";
import responsesMessege from "../../../../const/readonly/responsesMessege";
import TArticle from "../../../../interfaces/types/ArticlesTypes";
import validateEmptyField from "../../../../utils/validateEmptyField";
import filesUploadFieldsValidation from "../../../../utils/filesUploadFieldsValidation";
import FilesSystem from "../../../../services/FilesSystem";
import FilesUpload from "../../../../services/FilesUpload";
import { UploadedFile } from "express-fileupload";

export default async function updateArticle(
  req: Request,
  res: Response
): Promise<void | Response> {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id))
      return new ErrorsResponses().badRequest(
        res,
        responsesMessege.wrongRequestID
      );

    validateEmptyField(req, res);

    const articleValidation = article({ required: false });
    const { value, error } = articleValidation.validate(req.body);
    if (error) return new ErrorsResponses().badRequest(res, error.message);

    const isArticleExist: TArticle | null = await client.article.findUnique({
      where: { id },
    });

    if (!isArticleExist) return new ErrorsResponses().notFound(res);

    if (!req.files) {
      await client.article.update({
        where: { id },
        data: { ...value },
      });

      return new SuccessResponses().success(res, "updated");
    }

    if (req.files) {
      filesUploadFieldsValidation(req, res, "picture");

      const pathName = "./public/img/articles/pictures";
      const picture: UploadedFile | UploadedFile[] = Array.isArray(
        req.files.picture
      )
        ? req.files.picture[0]
        : req.files.picture;
      const urlPath: string = `${req.protocol}://${req.get(
        "host"
      )}/img/articles/pictures/${picture.md5 + path.extname(picture.name)}`;

      const oldImageFileName = isArticleExist.picture.split("/")[6];
      const oldImagePath: string = `./public/img/articles/pictures/${oldImageFileName}`;
      new FilesSystem().deleteFile(oldImagePath);

      new FilesUpload().save({
        request: req,
        response: res,
        file: picture,
        pathName,
      });

      await client.article.update({
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
