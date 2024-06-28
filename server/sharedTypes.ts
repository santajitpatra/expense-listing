import { z } from "zod";

export const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters",
    })
    .max(100, {
      message: "Title must be at most 100 characters",
    }),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "amount must be a positive number",
    }),
});

export const createPostSchema = expenseSchema.omit({ id: true });
