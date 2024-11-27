"use client";

import { motion } from "framer-motion";
import {
  FileText,
  BarChart2,
  Clock,
  CreditCard,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: FileText,
    title: "Smart Invoicing",
    description:
      "Create professional invoices with automated recurring billing and customizable templates.",
    color: "from-purple-500 to-pink-500",
    delay: 0.1,
  },
  {
    icon: BarChart2,
    title: "Financial Analytics",
    description:
      "Get detailed insights into your business with comprehensive financial reports and forecasts.",
    color: "from-blue-500 to-cyan-500",
    delay: 0.2,
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description:
      "Track billable hours and automatically generate invoices based on time entries.",
    color: "from-green-500 to-emerald-500",
    delay: 0.3,
  },
  {
    icon: CreditCard,
    title: "Payment Processing",
    description:
      "Accept payments online with multiple payment gateway integrations and automated reconciliation.",
    color: "from-orange-500 to-red-500",
    delay: 0.4,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function LandingFeatures() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 grid-background opacity-20" />
      <div className="absolute inset-0 noise" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center space-x-2 mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Powerful Features</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight mb-4"
          >
            Everything You Need to
            <span className="block text-gradient">Grow Your Business</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Streamline your workflow with our comprehensive suite of tools
            designed specifically for modern freelancers and agencies.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item} className="group relative">
              <div
                className="absolute -inset-px rounded-2xl bg-gradient-to-r opacity-50 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl"
                style={{
                  background: `linear-gradient(to right, ${feature.color.split(" ")[1]}, ${feature.color.split(" ")[3]})`,
                }}
              />
              <div className="relative h-full glass rounded-2xl p-8 transition-transform duration-500 hover:scale-[1.02]">
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-5 ring-2 ring-white/10`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-3 flex items-center group-hover:text-primary transition-colors">
                  {feature.title}
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <Button asChild size="lg" variant="gradient" className="rounded-full">
            <Link href="/signup">
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
