import express from "express";
const router = express.Router();
import addAchivement from "../controllers/achivement.add.controller";
import updateAchivement from "../controllers/achivement.update.controller";
import deleteAchivement from "../controllers/achivement.delete.controller";
import {
  achivements,
  singleAchivement,
} from "../controllers/achivement.get.controller";

router.get("/", achivements);
router.patch("/:id", updateAchivement);
router.delete("/:id", deleteAchivement);
router.get("/:id", singleAchivement);
router.post("/", addAchivement);

export default router;
