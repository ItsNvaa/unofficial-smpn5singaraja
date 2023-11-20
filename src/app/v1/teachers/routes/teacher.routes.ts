import express from "express";
import { teachers } from "../controllers/teacher.get.controller";
const router = express.Router();

router.get("/", teachers);

export default router;
