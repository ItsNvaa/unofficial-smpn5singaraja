import express from "express";
const router = express.Router();
import searchNews from "../controllers/news.get.controller";
import addNews from "../controllers/news.add.controller";

router.get("/search", searchNews);
router.post("/", addNews);

export default router;
