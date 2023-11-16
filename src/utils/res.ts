import { Response } from "express";

class Responses {
  protected jsonResponse<T>(
    res: Response,
    key: string,
    datas: T[] | T,
    status: number | string
  ): Response {
    status = status == 200 ? "OK" : "KO";
    return res.status(200).json({
      [key]: datas,
      status,
    });
  }
}

export class SuccessResponses extends Responses {
  sendSuccessWithMultipleData<T>(
    res: Response,
    key: string,
    datas: T[]
  ): Response {
    return this.jsonResponse<T>(res, key, datas, 200);
  }
  sendSuccessSingleData<T>(res: Response, key: string, data: T): Response {
    return this.jsonResponse<T>(res, key, data, 200);
  }
  success(res: Response, key: string, usage?: string): Response {
    const status = usage == "create" ? 201 : 200;
    return res.status(status).json({
      [key]: true,
      status: "OK",
    });
  }
}

export class ErrorsResponses {
  private ErrorResponse(
    res: Response,
    messege: string | undefined,
    statusCode: number,
    TypeError: string
  ): Response {
    return res.status(statusCode).json({
      TypeError,
      messege,
      status: "KO",
    });
  }
  badRequest(res: Response, messege?: string): Response {
    return this.ErrorResponse(
      res,
      messege ||
        "Oops! Your request cannot be processed due to a bad request. Please check your input and try again.",
      400,
      "Bad Request"
    );
  }
  notFound(res: Response, messege?: string): Response {
    return this.ErrorResponse(
      res,
      messege || "Oops! The data you are looking for could not be found.",
      404,
      "Not Found"
    );
  }
  unprocessable(res: Response, messege?: string): Response {
    return this.ErrorResponse(
      res,
      messege ||
        "The content you provided could not be processed due to errors in the data. Please review your input and make sure it meets the required format and criteria.",
      422,
      "Unprocessable Content"
    );
  }
  unauth(res: Response, messege?: string): Response {
    return this.ErrorResponse(
      res,
      messege ||
        "You are not authorized to access this resource. Please provide valid credentials or authentication.",
      401,
      "Unauthorized"
    );
  }
}
