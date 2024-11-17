"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

export function LandingHero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-blur" />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">
              Revolutionizing Freelance Management
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-8">
            <span className="text-gradient">
              Streamline Your Freelance Business
            </span>{" "}
            <br className="hidden sm:block" />
            with <span className="text-primary">Lunariss</span>
          </h1>

          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
            The all-in-one platform for freelancers to manage invoices, track
            expenses, and grow their business with powerful analytics and
            automation.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="text-lg button-gradient group relative overflow-hidden rounded-full"
            >
              <Link href="/signup" className="flex items-center">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg spotlight animated-border"
            >
              <Link href="#features" className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                See Features
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { label: "Active Users", value: "10,000+" },
              { label: "Invoices Generated", value: "$50M+" },
              { label: "Time Saved", value: "1000+ hrs" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="floating p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-colors"
              >
                <dt className="text-base text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="text-3xl font-bold tracking-tight text-gradient">
                  {stat.value}
                </dd>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
