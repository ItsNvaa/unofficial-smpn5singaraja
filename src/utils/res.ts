import { Response } from "express";

class Responses {
  success<T>(res: Response, key: string, datas: T[]): Response {
    return res.status(200).json({
      [key]: datas,
      status: "OK",
    });
  }
  successWithSingleData<T>(res: Response, key: string, data: T): Response {
    return res.status(200).json({
      [key]: data,
      status: "OK",
    });
  }
  badRequest(res: Response, messege?: string): Response {
    return res.status(400).json({
      TypeError: "Bad Request",
      messege: "",
      status: "KO",
    });
  }
  notFound(res: Response, messege?: string): Response {
    return res.status(404).json({
      TypeError: "Not Found",
      messege: "",
      status: "KO",
    });
  }
}

export default Responses;
