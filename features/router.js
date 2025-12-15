import { Router } from "express";
import tempRouter from "./temp/tempRouter.js";

const router = Router();

router.use("/temp", tempRouter);

export default router;
