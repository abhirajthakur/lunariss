"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const plans = [
  {
    name: "Starter",
    price: "$9",
    description: "Perfect for freelancers just starting out",
    features: [
      "Up to 10 clients",
      "Unlimited invoices",
      "Expense tracking",
      "Basic reports",
      "Email support",
    ],
    priceId: "price_starter",
  },
  {
    name: "Professional",
    price: "$29",
    description: "For growing freelance businesses",
    features: [
      "Unlimited clients",
      "Custom invoice templates",
      "Time tracking",
      "Advanced analytics",
      "Priority support",
      "Client portal",
      "Multi-currency",
    ],
    priceId: "price_professional",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For agencies and large teams",
    features: [
      "Everything in Professional",
      "Team collaboration",
      "Custom workflows",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "99.9% uptime SLA",
    ],
    priceId: "price_enterprise",
  },
];

export function LandingPricing() {
  const handleSubscribe = async (priceId: string) => {
    try {
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (!data.url) throw new Error("Failed to create checkout session");

      window.location.href = data.url;
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Choose the perfect plan for your business
          </motion.p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`relative flex flex-col h-full ${plan.popular ? "border-primary shadow-lg" : ""}`}
              >
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-4xl font-bold mb-6">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">
                      /mo
                    </span>
                  </div>
                  <ul className="grid gap-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSubscribe(plan.priceId)}
                  >
                    Start Trial
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
