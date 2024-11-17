import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardNav } from "@/components/dashboard/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden border-r bg-muted/40 lg:block lg:w-72">
          <div className="flex h-full flex-col">
            <DashboardNav />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <ScrollArea className="flex-1">
            <main className="flex-1 p-6">{children}</main>
          </ScrollArea>
        </div>
      </div>
    </SessionProvider>
  );
}
