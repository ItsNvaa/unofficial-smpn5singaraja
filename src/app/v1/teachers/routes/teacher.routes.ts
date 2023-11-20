import express from "express";
import {
  teachers,
  singeTeacher,
  searchTeachers,
} from "../controllers/teacher.get.controller";
const router = express.Router();

router.get("/", teachers);
router.get("/search", searchTeachers);
router.get("/:id", singeTeacher);

export default router;
