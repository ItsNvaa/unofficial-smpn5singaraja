import { UploadedFile } from "express-fileupload";
import { ErrorsResponses } from "./res";
import { Response } from "express";

export default function saveFile({
  response,
  file,
  filePath,
}: {
  file: UploadedFile;
  filePath: string;
  response: Response;
}): void {
  file.mv(filePath, (err) => {
    if (err)
      return new ErrorsResponses().badRequest(
        response,
        "The image file was failed to store, please try again later."
      );
  });
}
