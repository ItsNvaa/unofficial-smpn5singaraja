import express from "express";
import { galeries } from "../controllers/galery.get.controller";
const router = express.Router();

router.get("/", galeries);

export default router;
