import express from "express";
const router = express.Router();
import { singleUser } from "../controllers/user.get.controller";

router.get("/:id", singleUser);

export default router;
