"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Lunariss has completely transformed how I manage my freelance business. The automated invoicing and expense tracking save me hours every week.",
    author: "Sarah Chen",
    title: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&crop=face",
  },
  {
    quote:
      "The financial analytics have given me insights I never had before. I can now make data-driven decisions about my business's future.",
    author: "Marcus Rodriguez",
    title: "Web Developer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&crop=face",
  },
  {
    quote:
      "As a creative professional, dealing with finances was always a challenge. Lunariss makes it simple and even enjoyable.",
    author: "Emma Thompson",
    title: "Graphic Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&auto=format&fit=crop&crop=face",
  },
];

export function LandingTestimonials() {
  return (
    <section id="testimonials" className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Loved by Freelancers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Here's what our users have to say about Lunaris
          </motion.p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <p className="text-lg mb-6">{testimonial.quote}</p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={testimonial.image}
                        alt={testimonial.author}
                      />
                      <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
