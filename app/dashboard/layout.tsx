import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen">
        <div className="fixed hidden lg:block left-0 top-0 bottom-0 w-64 border-r bg-muted/40">
          <div className="flex h-full flex-col">
            <DashboardSidebar />
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="fixed top-0 right-0 left-0 lg:left-72 z-10">
            <DashboardHeader />
          </div>
          <div className="pt-16">
            <ScrollArea className="h-[calc(100vh-4rem)]">
              <main className="p-6">{children}</main>
            </ScrollArea>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
