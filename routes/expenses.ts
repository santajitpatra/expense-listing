import { Hono } from "hono";

type Expense = {
  id: number;
  amount: number;
  description: string;
  date: string;
};

const fakeExpenses: Expense[] = [
  {
    id: 1,
    amount: 1000,
    description: "Groceries",
    date: "2021-01-01",
  },
  {
    id: 2,
    amount: 2000,
    description: "Rent",
    date: "2021-01-02",
  },
  {
    id: 3,
    amount: 3000,
    description: "Coffee",
    date: "2021-01-03",
  },
];

export const expensesRoute = new Hono()
  .get("/", async (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", async (c) => {
    const expense = await c.req.json();
    console.log(expense);
    return c.json(expense);
  });
