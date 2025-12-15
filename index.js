import express from "express";
import mainRouter from "./features/router.js";
import authRoutes from "./features/auth/authRoutes.js";
import authMiddleware from "./features/auth/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRoutes);

// app.use(authMiddleware);

app.use("/api", mainRouter);

app.listen(PORT, () =>
  console.log("Server is running to get some beer on port " + PORT),
);
