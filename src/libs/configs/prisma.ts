import { PrismaClient } from "../../../generated/client/edge";
import { DATABASE_URL } from "../../const/config";
import { withAccelerate } from "@prisma/extension-accelerate";

const client = new PrismaClient({
  datasources: { db: { url: DATABASE_URL } },
}).$extends(withAccelerate());

export default client;
