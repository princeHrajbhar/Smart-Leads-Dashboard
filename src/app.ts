//backend\src\app.ts
import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import todoRoutes from "./modules/todo/todo.routes";
import leadRoutes from "./modules/lead/lead.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("Server running...");
});

export default app;