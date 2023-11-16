import { Request, Response } from "express";
import client from "../../../../libs/configs/prisma";
import validator from "validator";
import { ErrorsResponses, SuccessResponses } from "../../../../utils/res";
import TAchivement from "../interfaces/types/AchivementTypes";
import responsesMessege from "../../../../const/readonly/responsesMessege";
import FilesSystem from "../../../../services/FilesSystem";
import deleteAchivementViaId from "../services/deleteAchivement";

export default async function deleteAchivement(
  req: Request,
  res: Response
): Promise<void | Response<Record<any, string>>> {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id)) return new ErrorsResponses().badRequest(res);

    const findAchivement: Awaited<TAchivement> | null =
      await client.achivement.findUnique({
        where: { id },
      });

    if (!findAchivement || findAchivement == null)
      return new ErrorsResponses().badRequest(
        res,
        responsesMessege.cannotDelete
      );

    if (findAchivement) {
      const fileName =
        findAchivement.picture == "" || findAchivement.picture == null
          ? "notExist.png"
          : findAchivement.picture.split("/")[6];
      const path: string = `./public/img/achivements/pictures/${fileName}`;
      const isExist: boolean | null = new FilesSystem().isExist(path);

      if (isExist) {
        await deleteAchivementViaId(id);

        new FilesSystem().deleteFile(path);

        return new SuccessResponses().success(res, "deleted");
      }

      await deleteAchivementViaId(id);

      return new SuccessResponses().success(res, "deleted");
    }
  } catch (err) {
  } finally {
    await client.$disconnect();
  }
}
