"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, DollarSign, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface ExpenseStats {
  totalExpenses: number;
  monthlyExpenses: number;
  averageExpense: number;
  monthlyChange: number;
}

export function ExpenseStats() {
  const [stats, setStats] = useState<ExpenseStats>({
    totalExpenses: 0,
    monthlyExpenses: 0,
    averageExpense: 0,
    monthlyChange: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/expenses/stats");
        if (!response.ok) throw new Error("Failed to fetch expense stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching expense stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${stats.totalExpenses.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">All time expenses</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Monthly Expenses
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${stats.monthlyExpenses.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Expense</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${stats.averageExpense.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">Per transaction</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Change</CardTitle>
          {stats.monthlyChange > 0 ? (
            <ArrowUp className="h-4 w-4 text-destructive" />
          ) : (
            <ArrowDown className="h-4 w-4 text-emerald-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.monthlyChange > 0 ? "+" : ""}
            {stats.monthlyChange.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">From last month</p>
        </CardContent>
      </Card>
    </div>
  );
}
