"use client";

import { MobileNav } from "@/components/dashboard/mobile-nav";
import { UserNav } from "@/components/dashboard/user-nav";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        <MobileNav />

        <div className="ml-auto flex items-center space-x-4">
          <Button
            size="sm"
            onClick={() => router.push("/dashboard/invoices/new")}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
