import express from "express";
import { articles } from "../controllers/article.get.controller";
const router = express.Router();

router.get("/", articles);

export default router;
