import express from "express";
const router = express.Router();
import { singleUser } from "../controllers/user.get.controller";
import updateUser from "../controllers/user.update.controller";
import deleteUser from "../controllers/user.delete.controller";

router.get("/:id", singleUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
