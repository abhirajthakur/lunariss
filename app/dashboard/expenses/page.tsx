"use client";

import { ExpenseDialog } from "@/components/expenses/expense-dialog";
import { ExpenseStats } from "@/components/expenses/expense-stats";
import { ExpensesList } from "@/components/expenses/expenses-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function ExpensesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
          <p className="text-muted-foreground">
            Track and manage your business expenses
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>

      <ExpenseStats />
      <ExpensesList />
      <ExpenseDialog open={isDialogOpen} onOpenChangeAction={setIsDialogOpen} />
    </div>
  );
}
