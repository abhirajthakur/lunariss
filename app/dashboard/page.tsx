import { DashboardCards } from "@/components/dashboard/cards";
import { DashboardOverview } from "@/components/dashboard/overview";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your business.
        </p>
      </div>
      <DashboardCards />
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <DashboardOverview />
          <RecentInvoices />
        </TabsContent>
        <TabsContent value="analytics">
          Analytics content coming soon...
        </TabsContent>
        <TabsContent value="reports">
          Reports content coming soon...
        </TabsContent>
        <TabsContent value="notifications">
          Notifications content coming soon...
        </TabsContent>
      </Tabs>
    </div>
  );
}
