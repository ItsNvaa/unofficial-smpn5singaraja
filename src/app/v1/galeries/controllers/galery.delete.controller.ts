import { Response, Request } from "express";
import validator from "validator";
import client from "../../../../libs/configs/prisma";
import logger from "../../../../libs/logger";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";
import TGalery from "../interfaces/types/GaleryTypes";
import responsesMessege from "../../../../const/readonly/responsesMessege";
import FilesSystem from "../../../../services/FilesSystem";
import deleteGaleryViaId from "../services/deleteGalery";

export default async function deleteGalery(
  req: Request,
  res: Response
): Promise<void | Response> {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id)) return new ErrorsResponses().badRequest(res);

    const findGalery: Awaited<TGalery> | null = await client.galery.findUnique({
      where: { id },
    });

    if (!findGalery || findGalery == null)
      return new ErrorsResponses().badRequest(
        res,
        responsesMessege.cannotDelete
      );

    if (findGalery) {
      const fileName =
        findGalery.picture == "" || findGalery.picture == null
          ? "notExist.png"
          : findGalery.picture.split("/")[6];
      const path: string = `./public/img/achivements/pictures/${fileName}`;
      const isExist: boolean | null = new FilesSystem().isExist(path);

      if (isExist) {
        await deleteGaleryViaId(id);

        new FilesSystem().deleteFile(path);

        return new SuccessResponses().success(res, "deleted");
      }

      await deleteGaleryViaId(id);

      return new SuccessResponses().success(res, "deleted");
    }
  } catch (err) {
    logger.error(err);
    return new ErrorsResponses().badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
