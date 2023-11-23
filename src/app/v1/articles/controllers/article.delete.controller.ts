import validator from "validator";
import { Request, Response } from "express";
import client from "../../../../libs/configs/prisma";
import logger from "../../../../libs/logger";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";
import responsesMessege from "../../../../const/readonly/responsesMessege";
import TArticle from "../../../../interfaces/types/ArticlesTypes";
import FilesSystem from "../../../../services/FilesSystem";

export default async function deleteArticle(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id))
      return new ErrorsResponses().badRequest(
        res,
        responsesMessege.wrongRequestID
      );

    const findArticle: Awaited<TArticle> | null =
      await client.article.findUnique({
        where: { id },
      });

    if (!findArticle || findArticle == null)
      return new ErrorsResponses().badRequest(
        res,
        responsesMessege.cannotDelete
      );

    if (findArticle) {
      const fileName =
        findArticle.picture == "" || findArticle.picture == null
          ? "notExist.png"
          : findArticle.picture.split("/")[6];
      const path: string = `./public/img/articles/pictures/${fileName}`;
      const isExist: boolean | null = new FilesSystem().isExist(path);

      if (isExist) {
        await client.article.delete({
          where: { id },
        });

        new FilesSystem().deleteFile(path);

        return new SuccessResponses().success(res, "deleted");
      }

      await client.article.delete({
        where: { id },
      });

      return new SuccessResponses().success(res, "deleted");
    }
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
