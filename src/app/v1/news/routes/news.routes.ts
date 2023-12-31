import express from "express";
const router = express.Router();
import { news, searchNews } from "../controllers/news.get.controller";
import addNews from "../controllers/news.add.controller";
import updateNews from "../controllers/news.update.controller";
import deleteNews from "../controllers/news.delete.controller";

router.get("/", news);
router.get("/search", searchNews);
router.post("/", addNews);
router.patch("/:id", updateNews);
router.delete("/:id", deleteNews);

export default router;
