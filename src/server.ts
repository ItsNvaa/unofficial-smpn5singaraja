import app from "./main";
import logger from "./libs/logger";
import { PORT } from "./const/config";
const port = 8000 || PORT;

app.listen(port, () =>
  logger.info(`The server is running in http://localhost:${port}`)
);
