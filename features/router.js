import { Router } from "express";
import tempRouter from "./temp/tempRouter.js";
import studentsRouter from "./students/StudentRouter.js";

const router = Router();

router.use("/temp", tempRouter);
router.use("/students", studentsRouter);

export default router;
