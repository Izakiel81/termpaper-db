import { Router } from "express";
import StudentDataController from "./StudentDataController.js";

const router = Router();

router.get("/", StudentDataController.getAllStudentData);
router.get("/:id", StudentDataController.getStudentDataById);
router.post("/", StudentDataController.createStudentData);
router.patch("/:id", StudentDataController.updateStudentData);
router.delete("/:id", StudentDataController.deleteStudentData);

export default router;

