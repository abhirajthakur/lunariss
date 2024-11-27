"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const plans = [
  {
    name: "Free Trial",
    price: "$0",
    duration: "14 days",
    description: "Perfect for trying out Lunaris",
    features: [
      "Up to 5 clients",
      "10 invoices per month",
      "Basic expense tracking",
      "Email support",
    ],
    priceId: "free_trial",
    gradient: "from-blue-500/20 to-cyan-500/20",
    buttonGradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Professional",
    price: "$29",
    duration: "per month",
    description: "For growing freelance businesses",
    features: [
      "Unlimited clients",
      "Unlimited invoices",
      "Advanced analytics",
      "Priority support",
      "Client portal",
      "Multi-currency",
    ],
    priceId: "price_pro123",
    popular: true,
    gradient: "from-primary/20 to-secondary/20",
    buttonGradient: "from-primary to-secondary",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For agencies and large teams",
    features: [
      "Everything in Professional",
      "Team collaboration",
      "Custom workflows",
      "API access",
      "Dedicated support",
      "Custom integrations",
    ],
    priceId: "price_enterprise123",
    gradient: "from-purple-500/20 to-pink-500/20",
    buttonGradient: "from-purple-500 to-pink-500",
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

export function LandingPricing() {
  const router = useRouter();

  const handlePlanSelect = (priceId: string) => {
    if (priceId === "price_enterprise123") {
      window.location.href = "mailto:sales@lunaris.com";
      return;
    }

    const signupUrl = new URL("/signup", window.location.origin);
    if (priceId !== "free_trial") {
      signupUrl.searchParams.set("priceId", priceId);
    }
    router.push(signupUrl.toString());
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 grid-background opacity-10" />
      <div className="absolute inset-0 noise" />

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                i === 0
                  ? "hsl(var(--primary))"
                  : i === 1
                    ? "hsl(var(--secondary))"
                    : "hsl(var(--accent))"
              } 0%, transparent 70%)`,
              filter: "blur(100px)",
              opacity: 0.1,
              left: `${i * 40}%`,
              top: "50%",
              transform: "translateY(-50%)",
            }}
            animate={{
              y: ["-20%", "20%"],
              x: ["-10%", "10%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center space-x-2 mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Simple Pricing</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight mb-4"
          >
            Choose the Perfect Plan for
            <span className="block text-gradient">Your Business</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Start with our free trial and upgrade as your business grows
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 lg:grid-cols-3"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={item}
              className="relative group"
            >
              <div
                className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${plan.gradient} opacity-50 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl`}
              />
              <Card
                className={`relative h-full glass rounded-2xl p-8 transition-transform duration-500 hover:scale-[1.02] ${
                  plan.popular ? "border-primary/50" : "border-transparent"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-primary px-4 py-1 text-sm font-medium text-primary-foreground rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.duration && (
                      <span className="text-muted-foreground">
                        /{plan.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div
                        className={`flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-gradient-to-r ${plan.buttonGradient}`}
                      >
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Button
                    className="w-full group relative overflow-hidden rounded-xl"
                    style={{
                      background: `linear-gradient(to right, ${plan.buttonGradient.split(" ")[1]}, ${plan.buttonGradient.split(" ")[3]})`,
                    }}
                    onClick={() => handlePlanSelect(plan.priceId)}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {plan.price === "Custom"
                        ? "Contact Sales"
                        : "Get Started"}
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
