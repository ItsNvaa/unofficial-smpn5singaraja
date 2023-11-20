import client from "../../../../libs/configs/prisma";
import { Request, Response } from "express";
import logger from "../../../../libs/logger";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";
import TGalery from "../interfaces/types/GaleryTypes";
import validator from "validator";
import responsesMessege from "../../../../const/readonly/responsesMessege";

export async function galeries(
  req: Request,
  res: Response
): Promise<void | Response<Record<any, string>>> {
  try {
    const { skip, limit } = req.query;
    const totalGalery = await client.galery.count();

    const galeries: Awaited<TGalery[]> = await client.galery.findMany({
      skip: Number(skip) || 0,
      take: Number(limit) || totalGalery,
    });

    if (!galeries.length) return new ErrorsResponses().notFound(res);

    return new SuccessResponses().sendSuccessWithMultipleData(
      res,
      "galeries",
      galeries
    );
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}

export async function singleGalery(
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

    const galery: Awaited<TGalery> | null = await client.galery.findUnique({
      where: { id },
    });

    if (!galery) return new ErrorsResponses().notFound(res);

    return new SuccessResponses().sendSuccessSingleData(res, "galery", galery);
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
