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
  } finally {
    await client.$disconnect();
  }
}

export async function singleAchivement(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id))
      return new ErrorsResponses().badRequest(res, "Invalid Achivements ID!");

    const achivement: Awaited<TAchivement> | null =
      await client.achivement.findUnique({
        where: { id },
      });

    if (!achivement) return new ErrorsResponses().notFound(res);

    return new SuccessResponses().sendSuccessSingleData(
      res,
      "achivement",
      achivement
    );
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
