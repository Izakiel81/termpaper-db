import express from "express";
import cors from "cors";
import mainRouter from "./features/router.js";
import authRoutes from "./features/auth/authRoutes.js";
import authMiddleware from "./features/auth/authMiddleware.js";
import TempService from "./features/temp/tempService.js";

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.JWT_SECRET) console.warn('[server] WARNING: JWT_SECRET not set');
if (!process.env.REFRESH_SECRET) console.warn('[server] WARNING: REFRESH_SECRET not set');

// Configure CORS - allow the frontend dev server by default
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

// app.use(authMiddleware);

app.use("/api", mainRouter);

app.listen(PORT, () =>
  console.log("Server is running to get some beer on port " + PORT),
);
