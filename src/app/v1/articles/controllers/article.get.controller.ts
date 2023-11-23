import { Request, Response } from "express";
import client from "../../../../libs/configs/prisma";
import logger from "../../../../libs/logger";
import type TArticle from "../../../../interfaces/types/ArticlesTypes";
import { SuccessResponses, ErrorsResponses } from "../../../../utils/res";

export async function articles(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { skip, limit } = req.query;
    const total: number = await client.article.count();

    const articles: Awaited<TArticle[]> = await client.article.findMany({
      take: Number(limit) || total,
      skip: Number(skip) || 0,
    });

    if (!articles.length) return new ErrorsResponses().notFound(res);

    return new SuccessResponses().sendSuccessWithMultipleData(
      res,
      "articles",
      articles
    );
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}

export async function searchArticles(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { q } = req.query;

    const articles: Awaited<TArticle[]> = await client.article.findMany({
      where: { title: { contains: String(q) } },
    });

    return new SuccessResponses().sendSuccessWithMultipleData(
      res,
      "articles",
      articles
    );
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
