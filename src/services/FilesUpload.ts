import path from "path";
import { Response, Request } from "express";
import type { UploadedFile } from "express-fileupload";
import saveFile from "../utils/saveFile";
import { ErrorsResponses } from "../utils/res";
import imgExt from "../const/readonly/imageExtension";

class FilesUpload {
  save<T>({
    request,
    response,
    pathName,
    file,
  }: {
    request: Request;
    response: Response;
    pathName: string;
    file: UploadedFile;
  }) {
    // @ts-ignore
    const ext: string = path.extname(file.name);

    if (file.data.length > 5 * 1024 * 1024)
      return new ErrorsResponses().unprocessable(
        response,
        "The image file size must be less than 5mb."
      );
    if (!imgExt.includes(ext.toLowerCase()))
      return new ErrorsResponses().badRequest(
        response,
        "The image file extension was not supported."
      );

    if (request.files) {
      const fileName: string = file.md5 + ext;
      const filePath: string = `${pathName}/${fileName}`;
      saveFile({ response, file, filePath });
    }
  }
}

export default FilesUpload;
