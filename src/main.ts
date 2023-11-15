import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static("./public"));
app.use(cors());
app.use(fileUpload());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(requestErrorValidation);

// Application Routes
import usersRoutes from "./app/v1/users/routes/users.routes.ts";
import requestErrorValidation from "./middlewares/requestErrorValidation.ts";

app.use("/v1/users", usersRoutes);

export default app;
