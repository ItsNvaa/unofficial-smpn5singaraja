import "dotenv/config";
import process from "process";

export const {
  PORT,
  DATABASE_URL,
  JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN,
  CLIENT_URL,
  CLIENT_FRONTEND_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env;
