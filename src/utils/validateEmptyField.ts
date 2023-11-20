import { Request, Response } from "express";
import responsesMessege from "../const/readonly/responsesMessege";
import { ErrorsResponses } from "./res";

export default function validateEmptyField(
  req: Request,
  res: Response
): Response | void {
  if (!Object.keys(req.body).length)
    return new ErrorsResponses().badRequest(res, responsesMessege.emptyFields);
}
