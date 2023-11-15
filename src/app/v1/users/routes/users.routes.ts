import express from "express";
const router = express.Router();
import { singleUser } from "../controllers/user.get.controller";
import updateUser from "../controllers/user.update.controller";

router.get("/:id", singleUser);
router.patch("/:id", updateUser);

export default router;
