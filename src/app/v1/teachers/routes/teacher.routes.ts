import express from "express";
import {
  teachers,
  singeTeacher,
  searchTeachers,
} from "../controllers/teacher.get.controller";
import addTeacher from "../controllers/teacher.add.controller";
const router = express.Router();

router.get("/", teachers);
router.get("/search", searchTeachers);
router.get("/:id", singeTeacher);
router.post("/", addTeacher);

export default router;
