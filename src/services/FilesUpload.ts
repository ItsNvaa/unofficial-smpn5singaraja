import path from "path";
import { Response, Request } from "express";
import { ErrorsResponses, SuccessResponses } from "../utils/res";
import type { UploadedFile } from "express-fileupload";
import imgExt from "../const/readonly/imageExtension";
import client from "../libs/configs/prisma";
import TUser from "../app/v1/users/interfaces/types/UserTypes";

class FilesUpload {
  create(req: Request, res: Response) {
    if (!req.files)
      return new ErrorsResponses().badRequest(
        res,
        "The image fields must be filled."
      );
  }
  update({
    request,
    response,
    pathName,
    body,
    id,
    urlPath,
  }: {
    request: Request;
    response: Response;
    pathName: string;
    id: string;
    body: TUser;
    urlPath: string;
  }) {
    // @ts-ignore
    const picture: UploadedFile = request.files.picture;
    if (picture.data.length > 5 * 1024 * 1024)
      return new ErrorsResponses().unprocessable(
        response,
        "The image file size must be less than 5mb."
      );
    const ext: string = path.extname(picture.name);
    if (!imgExt.includes(ext.toLowerCase()))
      return new ErrorsResponses().badRequest(
        response,
        "The image file extension was not supported."
      );

    if (request.files) {
      const fileName: string = picture.md5 + ext;
      const filePath: string = `${pathName}/${fileName}`;
      picture.mv(filePath, async (err) => {
        if (err)
          return new ErrorsResponses().badRequest(
            response,
            "The image file was failed to store, please try again later."
          );
        await client.user.update({
          where: { id },
          data: { ...body, picture: urlPath },
        });
        return new SuccessResponses().success(response, "update");
      });
    }
  }
  delete() {}
}

export default FilesUpload;
