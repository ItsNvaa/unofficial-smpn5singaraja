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

export default app;
