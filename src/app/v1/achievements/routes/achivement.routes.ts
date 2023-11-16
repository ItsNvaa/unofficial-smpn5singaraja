import express from "express";
const router = express.Router();
import {
  achivements,
  singleAchivement,
} from "../controllers/achivement.get.controller";

router.get("/", achivements);
router.get("/:id", singleAchivement);

export default router;
