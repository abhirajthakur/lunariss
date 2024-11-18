"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { useRouter } from "next/navigation";

export default function InvoicesPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
          <p className="text-muted-foreground">
            Manage and create invoices for your clients
          </p>
        </div>
        <Button onClick={() => router.push("/dashboard/invoices/new")}>
          <Plus className="mr-2 h-4 w-4" />
          New Invoice
        </Button>
      </div>
      <RecentInvoices />
    </div>
  );
}
