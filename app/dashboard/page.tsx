import { DashboardOverview } from "@/components/dashboard/overview";
import { DashboardCards } from "@/components/dashboard/cards";

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
      <DashboardOverview />
    </div>
  );
}
