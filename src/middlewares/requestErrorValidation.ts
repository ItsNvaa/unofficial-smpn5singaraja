import { Response, Request, NextFunction, ErrorRequestHandler } from "express";

export default function requestErrorValidation(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof SyntaxError)
    return res.status(400).json({
      TypeError: "Syntax Error",
      messege: "The request you made is invalid.",
      status: "KO",
    });

  return next();
}
