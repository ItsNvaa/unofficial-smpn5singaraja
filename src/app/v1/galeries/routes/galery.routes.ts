import express from "express";
import { galeries, singleGalery } from "../controllers/galery.get.controller";
const router = express.Router();

router.get("/", galeries);
router.get("/:id", singleGalery);

export default router;
