import { Router } from "express";
import TimetableController from "./TimetableController.js";

const router = Router();

router.get("/", TimetableController.getAllTimetables);
router.get("/:id", TimetableController.getTimetableById);
router.post("/", TimetableController.createTimetable);
router.patch("/:id", TimetableController.updateTimetable);
router.delete("/:id", TimetableController.deleteTimetable);

export default router;

