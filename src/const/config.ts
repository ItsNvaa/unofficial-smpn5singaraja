import "dotenv/config";
import process from "process";

export const { PORT, DATABASE_URL, JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } =
  process.env;
