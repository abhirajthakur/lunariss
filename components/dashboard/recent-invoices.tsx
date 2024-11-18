import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";

const recentInvoices = [
  {
    id: "INV001",
    client: "Acme Corp",
    amount: 1250.0,
    status: "paid",
    date: new Date("2024-03-10"),
  },
  {
    id: "INV002",
    client: "Globex Inc",
    amount: 850.0,
    status: "pending",
    date: new Date("2024-03-08"),
  },
  {
    id: "INV003",
    client: "Tech Solutions",
    amount: 2340.0,
    status: "overdue",
    date: new Date("2024-03-01"),
  },
  {
    id: "INV004",
    client: "Design Studio",
    amount: 1100.0,
    status: "paid",
    date: new Date("2024-03-05"),
  },
  {
    id: "INV005",
    client: "Marketing Pro",
    amount: 750.0,
    status: "pending",
    date: new Date("2024-03-07"),
  },
];

export function RecentInvoices() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Invoices</h2>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      invoice.status === "paid"
                        ? "success"
                        : invoice.status === "pending"
                          ? "warning"
                          : "destructive"
                    }
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(invoice.date, { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
