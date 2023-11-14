import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static("./public"));
app.use(cors());
app.use(fileUpload());
app.set("trust proxy", 1);

// Application Routes
import usersRoutes from "./app/v1/users/routes/users.routes.ts";

app.use("/v1/users", usersRoutes);

export default app;
