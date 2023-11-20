import express from "express";
import {
  galeries,
  searchGaleries,
  singleGalery,
} from "../controllers/galery.get.controller";
import addGalery from "../controllers/galery.add.controller";
import updateGalery from "../controllers/galery.update.controller";
import deleteGalery from "../controllers/galery.delete.controller";
const router = express.Router();

router.get("/", galeries);
router.get("/search", searchGaleries);
router.get("/:id", singleGalery);
router.post("/", addGalery);
router.patch("/:id", updateGalery);
router.delete("/:id", deleteGalery);

export default router;
