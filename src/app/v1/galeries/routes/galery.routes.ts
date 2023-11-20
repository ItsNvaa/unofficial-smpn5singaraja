import express from "express";
import {
  galeries,
  searchGaleries,
  singleGalery,
} from "../controllers/galery.get.controller";
import addGalery from "../controllers/galery.add.controller";
import updateGalery from "../controllers/galery.update.controller";
const router = express.Router();

router.get("/", galeries);
router.get("/search", searchGaleries);
router.get("/:id", singleGalery);
router.post("/", addGalery);
router.patch("/:id", updateGalery);

export default router;
