"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Lunaris has completely transformed how I manage my freelance business. The automated invoicing and expense tracking save me hours every week.",
    author: "Sarah Chen",
    title: "UX Designer",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&crop=face",
  },
  {
    quote:
      "The financial analytics have given me insights I never had before. I can now make data-driven decisions about my business's future.",
    author: "Marcus Rodriguez",
    title: "Web Developer",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&crop=face",
  },
  {
    quote:
      "As a creative professional, dealing with finances was always a challenge. Lunaris makes it simple and even enjoyable.",
    author: "Emma Thompson",
    title: "Graphic Designer",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&auto=format&fit=crop&crop=face",
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

export function LandingTestimonials() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 grid-background opacity-10" />
      <div className="absolute inset-0 noise" />

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${i === 0 ? "hsl(var(--primary))" : "hsl(var(--secondary))"} 0%, transparent 70%)`,
              filter: "blur(80px)",
              opacity: 0.1,
              left: i === 0 ? "-20%" : "auto",
              right: i === 1 ? "-20%" : "auto",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            animate={{
              y: ["-10%", "10%"],
            }}
            transition={{
              duration: 8,
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
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Customer Stories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight mb-4"
          >
            Loved by
            <span className="block text-gradient">Freelancers Worldwide</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Join thousands of satisfied freelancers who have transformed their
            business with Lunaris
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={item} className="group relative">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/50 to-secondary/50 opacity-50 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl" />
              <Card className="relative h-full glass rounded-2xl p-8 transition-transform duration-500 hover:scale-[1.02]">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-primary fill-primary"
                    />
                  ))}
                </div>
                <p className="text-lg mb-6 text-foreground/90 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-4">
                  <Avatar className="ring-2 ring-primary/20">
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.author}
                    />
                    <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gradient">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
