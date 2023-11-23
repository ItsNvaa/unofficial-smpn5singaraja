import { Request, Response } from "express";
import rateLimit, { ValueDeterminingMiddleware } from "express-rate-limit";

const rateLimitter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1min
  max: 2,
  message: {
    TypeError: "Rate Limit Exceeded Error",
    messege:
      "Too Many API request from this IP, please try again after 1 minutes.",
    status: "KO",
  },
  keyGenerator: (req: Request, res: Response): string | Promise<string> =>
    req.ip as string,
});

export default rateLimitter;
