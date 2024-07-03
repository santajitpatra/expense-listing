import { type ApiRoutes } from "@server/app";
import { CreateExpense } from "@server/sharedTypes";
import { queryOptions } from "@tanstack/react-query";
import { hc } from "hono/client";

const client = hc<ApiRoutes>("/");

export const api = client.api;

async function getCurrentUser() {
  const response = await api.user.$get();
  if (!response.ok) {
    throw new Error("Failed to fetch total spent");
  }
  const data = await response.json();
  return data;
}

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});

export async function getAllExpenses() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await api.expenses.$get();
  if (!response.ok) {
    throw new Error("Failed to fetch total spent");
  }
  const data = await response.json();
  return data;
}

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ["get-all-expenses"],
  queryFn: getAllExpenses,
  staleTime: 1000 * 60 * 5,
});

export async function createExpense({ value }: { value: CreateExpense }) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await api.expenses.$post({ json: value });
  if (!response.ok) {
    throw new Error("Failed to create expense");
  }

  const newExpense = await response.json();
  return newExpense;
}

export const loadingCreateExpenseQueryOptions = queryOptions<{
  expense?: CreateExpense;
}>({
  queryKey: ["loading-create-expense"],
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
});

export async function deleteExpense({ id }: { id: number }) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await api.expenses[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  });
  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }
}
