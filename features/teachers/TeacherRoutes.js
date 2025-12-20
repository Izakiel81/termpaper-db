import { Router } from "express";
import teacherController from "./TeacherController.js";

const router = Router();

// Get all teachers
router.get("/", teacherController.getAllTeachers);

// Get teachers with their classes
router.get("/with-classes/:id", teacherController.getTeachersWithClasses);

// Teacher salary report
router.get("/salary", teacherController.getTeacherSalary);

// Get teacher by ID
router.get("/:id", teacherController.getTeacherById);

// Create a new teacher
router.post("/", teacherController.createTeacher);

// Update a teacher (by ID)
router.patch("/:id", teacherController.updateTeacher);

// Delete a teacher
router.delete("/:id", teacherController.deleteTeacher);

export default router;
