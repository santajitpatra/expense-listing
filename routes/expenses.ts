import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

type Expense = {
  id: number;
  title: string;
  amount: number;
  date: string;
};

const fakeExpenses: Expense[] = [
 {
    id: 1,
    title: "Groceries",
    amount: 100.00,
    date: "2021-01-01",
  },
  {
    id: 2,
    title: "Rent",
    amount: 1000.00,
    date: "2021-01-02",
  },
  {
    id: 3,
    title: "Gas",
    amount: 20.00,
    date: "2021-01-03",
  }
];

const createPostSchema = z.object({
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
  date: z.string(),
});

export const expensesRoute = new Hono()
  .get("/", async (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const expense = await c.req.json();
    fakeExpenses.push({...expense, id: fakeExpenses.length + 1 });
    return c.json(expense);
  });
