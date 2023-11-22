import express from "express";
import {
  articles,
  searchArticles,
} from "../controllers/article.get.controller";
const router = express.Router();

router.get("/", articles);
router.get("/search", searchArticles);

export default router;
