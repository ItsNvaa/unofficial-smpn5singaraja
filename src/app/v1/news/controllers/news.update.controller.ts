import path from "path";
import validator from "validator";
import { Request, Response } from "express";
import article from "../../../../validations/articleValidation";
import client from "../../../../libs/configs/prisma";
import logger from "../../../../libs/logger";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";
import validateEmptyField from "../../../../utils/validateEmptyField";
import filesUploadFieldsValidation from "../../../../utils/filesUploadFieldsValidation";
import FilesUpload from "../../../../services/FilesUpload";
import FilesSystem from "../../../../services/FilesSystem";
import responsesMessege from "../../../../const/readonly/responsesMessege";
import TArticle from "../../../../interfaces/types/ArticlesTypes";

export default async function updateNews(
  req: Request,
  res: Response
): Promise<void | Response<Record<any, string>>> {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id))
      return new ErrorsResponses().badRequest(
        res,
        responsesMessege.wrongRequestID
      );

    validateEmptyField(req, res);

    const newsFeildValidation = article({ required: false });
    const { value, error } = newsFeildValidation.validate(req.body);
    if (error) return new ErrorsResponses().badRequest(res, error.message);

    const isNewsExist: TArticle | null = await client.news.findUnique({
      where: { id },
    });

    if (!isNewsExist) return new ErrorsResponses().notFound(res);

    if (!req.files) {
      await client.news.update({
        where: { id },
        data: { ...value },
      });

      return new SuccessResponses().success(res, "updated");
    }

    if (req.files) {
      filesUploadFieldsValidation(req, res, "picture");

      const pathName = "./public/img/news/pictures";
      // @ts-ignore
      const picture: UploadedFile = req.files.picture;
      const urlPath: string = `${req.protocol}://${req.get(
        "host"
      )}/img/news/pictures/${picture.md5 + path.extname(picture.name)}`;

      const oldImageFileName = isNewsExist.picture.split("/")[6];
      const oldImagePath: string = `./public/img/news/pictures/${oldImageFileName}`;
      new FilesSystem().deleteFile(oldImagePath);

      new FilesUpload().save({
        request: req,
        response: res,
        file: picture,
        pathName,
      });

      await client.news.update({
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
