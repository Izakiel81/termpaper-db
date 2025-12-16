import { Router } from "express";
import tempRouter from "./temp/tempRouter.js";
import studentsRouter from "./students/StudentRouter.js";
import teacherRouter from "./teachers/TeacherRoutes.js";

const router = Router();

router.use("/temp", tempRouter);
router.use("/students", studentsRouter);
router.use("/teacher", teacherRouter);

export default router;
