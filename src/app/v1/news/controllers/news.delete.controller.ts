import validator from "validator";
import { Request, Response } from "express";
import client from "../../../../libs/configs/prisma";
import logger from "../../../../libs/logger";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";
import FilesSystem from "../../../../services/FilesSystem";
import responsesMessege from "../../../../const/readonly/responsesMessege";
import TArticle from "../../../../interfaces/types/ArticlesTypes";

export default async function deleteNews(
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

    const findNews: Awaited<TArticle> | null = await client.news.findUnique({
      where: { id },
    });

    if (!findNews || findNews == null)
      return new ErrorsResponses().badRequest(
        res,
        responsesMessege.cannotDelete
      );

    if (findNews) {
      const fileName =
        findNews.picture == "" || findNews.picture == null
          ? "notExist.png"
          : findNews.picture.split("/")[6];
      const path: string = `./public/img/news/pictures/${fileName}`;
      const isExist: boolean | null = new FilesSystem().isExist(path);

      if (isExist) {
        await client.news.delete({ where: { id } });

        new FilesSystem().deleteFile(path);

        return new SuccessResponses().success(res, "deleted");
      }

      await client.news.delete({ where: { id } });

      return new SuccessResponses().success(res, "deleted");
    }
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
