import { PrismaClient } from "../../../generated/client/edge";
import { DATABASE_URL } from "../../const/config";

const client = new PrismaClient({ datasources: { db: { url: DATABASE_URL } } });

export default client;
