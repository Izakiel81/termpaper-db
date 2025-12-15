import tempController from "./tempController.js";
import { Router } from "express";

const router = Router();

router.post("/data-set", tempController.createData);

export default router;
