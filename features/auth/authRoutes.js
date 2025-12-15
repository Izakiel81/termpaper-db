import express from "express";
import authController from "./authController.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/refresh", authController.refresh);

export default router;
