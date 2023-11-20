import express from "express";
import { teachers, singeTeacher } from "../controllers/teacher.get.controller";
const router = express.Router();

router.get("/", teachers);
router.get("/:id", singeTeacher);

export default router;
