import path from "path";
import { Response, Request } from "express";
import type { UploadedFile } from "express-fileupload";
import fileUploadValidation from "../utils/filesUploadValidation";
import saveFile from "../utils/saveFile";

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

    fileUploadValidation(response, file);

    if (request.files) {
      const fileName: string = file.md5 + ext;
      const filePath: string = `${pathName}/${fileName}`;
      saveFile({ response, file, filePath });
    }
  }
}

export default FilesUpload;
