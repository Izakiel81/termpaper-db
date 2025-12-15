import { Router } from "express";
import studentController from "./StudentController.js";

const router = Router();

router.get("/", studentController.getStudents);
router.get("/avg-above-7", studentController.getStudentsAVGAbove7);
router.get("/class", studentController.getStudentsByClass);
router.get("/ranking", studentController.getStudentRanking);
router.get("/by-parent/:parentId", studentController.getStudentsByParent);
router.get(
  "/grades-and-absences",
  studentController.getStudentGradeAndAbsences,
);
router.get("/marks", studentController.getStudentMarks);
router.get("/attendance", studentController.getStudentAttendanceReport);
router.get("/day-plan", studentController.getStudentDayPlan);

router.post("/", studentController.addStudent);
router.patch("/", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

export default router;
