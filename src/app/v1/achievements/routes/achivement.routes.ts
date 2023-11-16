import express from "express";
const router = express.Router();
import { achivements } from "../controllers/achivement.get.controller";

router.get("/", achivements);

export default router;
