import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { useForm } from "@tanstack/react-form";
import { api } from "@/lib/api";
// import type { FieldApi } from "@tanstack/react-form";

import { zodValidator } from "@tanstack/zod-form-adapter";
import { createExpenseSchema } from "@server/sharedTypes";
import { Calendar } from "@/components/ui/calendar";

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  const navigate = useNavigate();
  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      title: "",
      amount: "0",
      date: new Date().toISOString(),
    },
    onSubmit: async ({ value }) => {
      // Do something with form data

      const response = await api.expenses.$post({ json: value });
      if (!response.ok) {
        throw new Error("Failed to create expense");
      }
      // Redirect to the list of expenses
      navigate({ to: "/expenses" });
    },
  });
  return (
    <div className="p-2">
      <h2>Create Expense</h2>
      <form
        className="flex flex-col gap-y-4 max-w-xl m-auto"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          validators={{
            onChange: createExpenseSchema.shape.title,
          }}
          children={(field) => (
            <div>
              <Label htmlFor={field.name}>Title</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
            </div>
          )}
        />

        <form.Field
          name="amount"
          validators={{
            onChange: createExpenseSchema.shape.amount,
          }}
          children={(field) => (
            <div>
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
            </div>
          )}
        />

        <form.Field
          name="date"
          validators={{
            onChange: createExpenseSchema.shape.date,
          }}
          children={(field) => (
            <div className="self-center">
              <Calendar
                mode="single"
                selected={new Date(field.state.value)}
                onSelect={(date) => {
                  field.handleChange((date ?? new Date()).toISOString());
                }}
                className="rounded-md border"
              />
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
            </div>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button className="mt-4" type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
