"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart2,
  Clock,
  FileText,
  Home,
  Receipt,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import Image from "next/image";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Invoices", href: "/dashboard/invoices", icon: FileText },
  { name: "Expenses", href: "/dashboard/expenses", icon: Receipt },
  { name: "Time Tracking", href: "/dashboard/time", icon: Clock },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
  { name: "Payments", href: "/dashboard/payments", icon: Wallet },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2 px-4 py-6">
      <div className="mb-8">
        {/* <span className="text-2xl font-bold">Lunariss</span> */}
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Image src="/lunariss.svg" alt="Lunariss" width={150} height={150} />
        </Link>
      </div>
      <div className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-primary",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
