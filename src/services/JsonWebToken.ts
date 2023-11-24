import jwt from "jsonwebtoken";
import logger from "../libs/logger";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from "../const/config";
import type TUserPayload from "../interfaces/types/UserPayloadTypes";

class JsonWebToken {
  sign({
    payload,
  }: {
    payload: TUserPayload;
  }): { accessToken: string; refreshToken: string } | null {
    try {
      const accessToken: string = jwt.sign(payload, JWT_ACCESS_TOKEN!, {
        expiresIn: "120s",
      });

      const refreshToken: string = jwt.sign(payload, JWT_REFRESH_TOKEN!, {
        expiresIn: "1d",
      });

      return { accessToken, refreshToken };
    } catch (err) {
      logger.error(err);
      return null;
    }
  }
}

export default JsonWebToken;
