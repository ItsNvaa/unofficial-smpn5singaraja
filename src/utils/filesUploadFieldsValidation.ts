import validator from "validator";
import { ErrorsResponses } from "./res";
import { Request, Response } from "express";

export default function filesUploadFieldsValidation(
  req: Request,
  res: Response,
  field: string
): void | Response {
  if (!validator.contains(field, Object.keys(req.files!)))
    return new ErrorsResponses().unprocessable(
      res,
      `The ${Object.keys(req.files!)[0]} was not allowed`
    );
}
