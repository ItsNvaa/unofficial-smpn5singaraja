import { Request, Response } from "express";
import client from "../../../../libs/configs/prisma";
import logger from "../../../../libs/logger";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";
import type TArticle from "../../../../interfaces/types/ArticlesTypes";

export async function news(
  req: Request,
  res: Response
): Promise<void | Response<Record<any, string>>> {
  try {
    const { skip, limit } = req.query;
    const totalNews: number = await client.news.count();

    const news: Awaited<TArticle[]> = await client.news.findMany({
      take: Number(limit) || totalNews,
      skip: Number(skip) || 0,
    });

    if (!news.length) return new ErrorsResponses().notFound(res);

    return new SuccessResponses().sendSuccessWithMultipleData(
      res,
      "news",
      news
    );
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}

export async function searchNews(
  req: Request,
  res: Response
): Promise<void | Response<Record<any, string>>> {
  try {
    const { q } = req.query;

    const news: Awaited<TArticle[]> = await client.news.findMany({
      where: { title: { contains: String(q) } },
    });

    return new SuccessResponses().sendSuccessWithMultipleData<TArticle>(
      res,
      "news",
      news
    );
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
