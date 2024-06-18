import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  return (
    <div className="p-2">
      <h2>Create Expense</h2>
      <form className="max-w-xl m-auto">
        <Label htmlFor="title">Title</Label>
        <Input id="title" type="text" placeholder="Title" />
        <Label htmlFor="amount">Amount</Label>
        <Input id="amount" type="number" placeholder="Amount" />
        <Button className="mt-4" type="submit">
          Create Expense
        </Button>
      </form>
    </div>
  );
}
