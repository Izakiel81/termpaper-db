import { Router } from "express";
import UserRoleController from "./UserRoleController.js";

const router = Router();

// Get all roles for a specific user
router.get("/:userId", UserRoleController.getRolesByUserId);

// Assign a role to a user
router.post("/assign", UserRoleController.assignRole);

// Remove a role from a user
router.delete("/remove", UserRoleController.removeRoleFromUser);

// Get a user's role
router.get("/role/:userId", UserRoleController.getUserRole);

export default router;

