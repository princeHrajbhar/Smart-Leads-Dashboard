import { z } from "zod";

export const todoSchema = z.object({
  title: z.string(),

  completed: z.boolean().optional(),
});