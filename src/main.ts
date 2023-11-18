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
import achivementRoutes from "./app/v1/achievements/routes/achivement.routes.ts";
import authRoutes from "./app/v1/auth/routes/auth.routes.ts";
import googleAuthRoutes from "./app/v1/auth/routes/google.auth.routes.ts";
import githubAuthRoutes from "./app/v1/auth/routes/github.auth.routes.ts";

app.use("/v1/users", usersRoutes);
app.use("/v1/achivements", achivementRoutes);
app.use("/v1/auth", authRoutes);
app.use("/v1/auth/google", googleAuthRoutes);
app.use("/v1/auth/github", githubAuthRoutes);

export default app;
