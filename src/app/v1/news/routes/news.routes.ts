import express from "express";
const router = express.Router();
import { news, searchNews } from "../controllers/news.get.controller";
import addNews from "../controllers/news.add.controller";

router.get("/", news);
router.get("/search", searchNews);
router.post("/", addNews);

export default router;
