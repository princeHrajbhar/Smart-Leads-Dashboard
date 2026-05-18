//backend\src\app.ts
import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import todoRoutes from "./modules/todo/todo.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Server running...");
});

export default app;