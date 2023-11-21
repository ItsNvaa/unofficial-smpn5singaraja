import express from "express";
import {
  teachers,
  singeTeacher,
  searchTeachers,
} from "../controllers/teacher.get.controller";
import addTeacher from "../controllers/teacher.add.controller";
import updateTeacher from "../controllers/teacher.update.controller";
const router = express.Router();

router.get("/", teachers);
router.get("/search", searchTeachers);
router.get("/:id", singeTeacher);
router.post("/", addTeacher);
router.patch("/:id", updateTeacher);

export default router;
