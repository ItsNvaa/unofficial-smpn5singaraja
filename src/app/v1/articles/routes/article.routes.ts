import express from "express";
import {
  articles,
  searchArticles,
} from "../controllers/article.get.controller";
import addArticle from "../controllers/article.add.controller";
import updateArticle from "../controllers/article.update.controller";
import deleteArticle from "../controllers/article.delete.controller";
const router = express.Router();

router.get("/", articles);
router.get("/search", searchArticles);
router.post("/", addArticle);
router.patch("/:id", updateArticle);
router.delete("/:id", deleteArticle);

export default router;
