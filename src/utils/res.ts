import { Response } from "express";

class Responses {
  success<T>(res: Response, key: string, datas: T[]): Response {
    return res.status(200).json({
      [key]: datas,
      status: "OK",
    });
  }
}

export default Responses;
