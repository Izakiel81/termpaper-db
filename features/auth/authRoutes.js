import { Router } from "express";
import authController from "./authController.js";
import authenticateJWT from "./authMiddleware.js";

const router = Router();

router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.get("/me", authenticateJWT, authController.me);

export default router;
