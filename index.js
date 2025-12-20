import express from "express";
import cors from "cors";
import mainRouter from "./features/router.js";
import authMiddleware from "./features/auth/authMiddleware.js";
import authRoutes from "./features/auth/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.JWT_SECRET) console.warn('[server] WARNING: JWT_SECRET not set');
if (!process.env.REFRESH_SECRET) console.warn('[server] WARNING: REFRESH_SECRET not set');

// Configure CORS - allow the frontend dev server by default
app.use(cors({
  origin: "http://localhost:5173", // your frontend origin
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Public auth endpoints must be accessible without a Bearer token.
app.use("/api/auth", authRoutes);

// Everything else under /api requires authentication.
app.use("/api", authMiddleware, mainRouter);

app.use((req,res,next)=>{ console.log(req.method, req.originalUrl); next(); });

app.listen(PORT, () =>
  console.log("Server is running to get some beer on port " + PORT),
);
