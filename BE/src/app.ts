import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// test route
app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", authRoutes);

export default app;
