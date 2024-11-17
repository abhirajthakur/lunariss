"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    name: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "positive",
  },
  {
    name: "Pending Invoices",
    value: "$12,234.00",
    change: "4 invoices",
    changeType: "neutral",
  },
  {
    name: "Total Expenses",
    value: "$8,234.00",
    change: "-4.5%",
    changeType: "negative",
  },
  {
    name: "Active Projects",
    value: "12",
    change: "+2 this month",
    changeType: "positive",
  },
];

export function DashboardCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
            {stat.changeType !== "neutral" && (
              <div
                className={cn(
                  "flex items-center rounded-full px-2 py-1 text-xs font-medium",
                  {
                    "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-400":
                      stat.changeType === "positive",
                    "bg-red-100 text-red-800 dark:bg-red-400/10 dark:text-red-400":
                      stat.changeType === "negative",
                  },
                )}
              >
                {stat.changeType === "positive" ? (
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-3 w-3" />
                )}
                {stat.change}
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.changeType === "neutral" && (
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
