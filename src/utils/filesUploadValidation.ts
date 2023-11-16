import { ErrorsResponses } from "./res";
import path from "path";
import imgExt from "../const/readonly/imageExtension";
import { Response } from "express";
import type { UploadedFile } from "express-fileupload";

export default function fileUploadValidation(
  response: Response,
  file: UploadedFile
) {
  if (file.data.length > 5 * 1024 * 1024)
    return new ErrorsResponses().unprocessable(
      response,
      "The image file size must be less than 5mb."
    );
  const ext: string = path.extname(file.name);
  if (!imgExt.includes(ext.toLowerCase()))
    return new ErrorsResponses().badRequest(
      response,
      "The image file extension was not supported."
    );
}
