"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  BarChart2,
  Clock,
  CreditCard,
  FileText,
  Globe2,
  LayoutDashboard,
  Receipt,
  RefreshCcw,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart Invoice Generation",
    description:
      "Create professional invoices with custom templates and automated recurring billing.",
  },
  {
    icon: Receipt,
    title: "Expense Tracking",
    description:
      "Automatically capture and categorize expenses with receipt scanning and processing.",
  },
  {
    icon: BarChart2,
    title: "Financial Analytics",
    description:
      "Get detailed insights into your business with comprehensive financial reports.",
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description:
      "Track billable hours and automatically generate invoices based on time entries.",
  },
  {
    icon: Globe2,
    title: "Multi-Currency Support",
    description:
      "Work with clients globally using automatic currency conversion and management.",
  },
  {
    icon: CreditCard,
    title: "Payment Processing",
    description:
      "Accept payments online with multiple payment gateway integrations.",
  },
  {
    icon: RefreshCcw,
    title: "Automated Workflows",
    description:
      "Set up custom automation rules for invoicing, reminders, and reconciliation.",
  },
  {
    icon: Wallet,
    title: "Tax Management",
    description:
      "Track tax obligations and generate reports for easy tax filing.",
  },
  {
    icon: LayoutDashboard,
    title: "Client Portal",
    description:
      "Provide clients with a dedicated portal to view invoices and make payments.",
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Everything You Need to Run Your Business
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Powerful features designed specifically for freelancers and small
            businesses
          </motion.p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary" />
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
