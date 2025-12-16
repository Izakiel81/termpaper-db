import { Router } from "express";
import teacherController from "./TeacherController.js";

const router = Router();

router.get("/", teacherController.getTeacher);
router.get("/:id", teacherController.getTeacherById);
router.get("/salary", teacherController.getTeacherSalary);
router.post("/", teacherController.addTeacher);
router.patch("/", teacherController.updateTeacher);
router.delete("/:id", teacherController.deleteTeacher);

export default router;
