import express from "express";
import {
  galeries,
  searchGaleries,
  singleGalery,
} from "../controllers/galery.get.controller";
const router = express.Router();

router.get("/", galeries);
router.get("/search", searchGaleries);
router.get("/:id", singleGalery);

export default router;
