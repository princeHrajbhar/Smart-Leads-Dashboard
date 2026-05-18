import { Router } from "express";

import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "./todo.controller";

import { protect } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.use(protect);

router.post(
  "/",
  authorize("ADMIN", "SALES"),
  createTodo
);

router.get(
  "/",
  authorize("ADMIN", "SALES"),
  getTodos
);

router.put(
  "/:id",
  authorize("ADMIN", "SALES"),
  updateTodo
);

router.delete(
  "/:id",
  authorize("ADMIN"),
  deleteTodo
);

export default router;