import { type ApiRoutes } from "@server/app";
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
