import express from "express";
import {
  articles,
  searchArticles,
} from "../controllers/article.get.controller";
import addArticle from "../controllers/article.add.controller";
const router = express.Router();

router.get("/", articles);
router.get("/search", searchArticles);
router.post("/", addArticle);

export default router;
