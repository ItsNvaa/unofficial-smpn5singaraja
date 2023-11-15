import { Request, Response } from "express";
import { ErrorsResponses } from "./res";

export default function handleValidation<T>({
  req,
  res,
  schema,
  required = true,
}: {
  req: Request;
  res: Response;
  schema: Function;
  required?: boolean;
}): T | Response {
  const userValidation = schema({ required });
  const { value, error } = userValidation.validate(req.body);
  if (error) return new ErrorsResponses().badRequest(res, error.message);

  return value;
}
