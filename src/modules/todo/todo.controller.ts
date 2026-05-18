import { Response } from "express";

import { AuthRequest } from "../../middlewares/auth.middleware";

import {
  createTodoService,
  deleteTodoService,
  getTodosService,
  updateTodoService,
} from "./todo.service";

export const createTodo = async (
  req: AuthRequest,
  res: Response
) => {
  const todo = await createTodoService(
    req.body,
    req.user.id
  );

  res.status(201).json({
    success: true,
    todo,
  });
};

export const getTodos = async (
  req: AuthRequest,
  res: Response
) => {
  const todos = await getTodosService(
    req.user.id,
    req.user.role
  );

  res.status(200).json({
    success: true,
    todos,
  });
};

export const updateTodo = async (
  req: AuthRequest,
  res: Response
) => {
  const todoId = req.params.id as string;

  const todo = await updateTodoService(
    todoId,
    req.body,
    req.user.id,
    req.user.role
  );

  res.status(200).json({
    success: true,
    todo,
  });
};

export const deleteTodo = async (
  req: AuthRequest,
  res: Response
) => {
  const todoId = req.params.id as string;

  await deleteTodoService(
    todoId,
    req.user.id,
    req.user.role
  );

  res.status(200).json({
    success: true,
    message: "Todo Deleted",
  });
};