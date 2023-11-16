import { Response, Request } from "express";
import validator from "validator";
import client from "../../../../libs/configs/prisma";
import logger from "../../../../libs/logger";
import { SuccessResponses, ErrorsResponses } from "../../../../utils/res";
import TAchivement from "../interfaces/types/AchivementTypes";

export async function achivements(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { skip, limit } = req.query;
    const totalUser = await client.achivement.count();

    const achivements: Awaited<TAchivement[]> =
      await client.achivement.findMany({
        take: Number(limit) || totalUser,
        skip: Number(skip) || 0,
      });

    if (!achivements.length) return new ErrorsResponses().notFound(res);

    return new SuccessResponses().sendSuccessWithMultipleData(
      res,
      "achivements",
      achivements
    );
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  }
}
