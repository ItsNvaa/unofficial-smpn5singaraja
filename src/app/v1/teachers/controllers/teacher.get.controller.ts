import validator from "validator";
import { Request, Response } from "express";
import client from "../../../../libs/configs/prisma";
import logger from "../../../../libs/logger";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";

export async function teachers(
  req: Request,
  res: Response
): Promise<void | Response<Record<any, string>>> {
  try {
    const { limit, skip } = req.query;
    const total = await client.teacher.count();

    const teachers = await client.teacher.findMany({
      take: Number(limit) || total,
      skip: Number(skip) || 0,
    });

    if (!teachers.length) return new ErrorsResponses().notFound(res);

    return new SuccessResponses().sendSuccessWithMultipleData(
      res,
      "teachers",
      teachers
    );
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
