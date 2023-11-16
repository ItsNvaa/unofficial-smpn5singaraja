import express from "express";
const router = express.Router();
import addAchivement from "../controllers/achivement.add.controller";
import {
  achivements,
  singleAchivement,
} from "../controllers/achivement.get.controller";

router.get("/", achivements);
router.get("/:id", singleAchivement);
router.post("/", addAchivement);

export default router;
