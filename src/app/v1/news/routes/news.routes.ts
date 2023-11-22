import express from "express";
const router = express.Router();
import searchNews from "../controllers/news.get.controller";

router.get("/search", searchNews);

export default router;
