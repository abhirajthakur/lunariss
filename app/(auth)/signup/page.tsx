"use client";

import { AuthForm } from "@/components/auth-form";
import { useToast } from "@/hooks/use-toast";
import type { AuthFormData } from "@/types/auth-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values: AuthFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      // Send OTP verification email
      await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      });

      toast({
        title: "Verification Required",
        description: "Please check your email for the verification code.",
      });

      router.push(`/verify?email=${encodeURIComponent(values.email)}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return <AuthForm mode="signup" onSubmit={onSubmit} isLoading={isLoading} />;
}
