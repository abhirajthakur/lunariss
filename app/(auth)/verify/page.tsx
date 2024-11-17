"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function VerifyPage() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const email = searchParams.get("email");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        throw new Error("Invalid verification code");
      }

      toast({
        title: "Success",
        description: "Your email has been verified. You can now sign in.",
      });

      router.push("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid verification code. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;

    setIsResending(true);
    try {
      await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not resend verification code. Please try again.",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute inset-0 gradient-blur" />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <Card className="w-full max-w-md relative">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Verify your email
          </CardTitle>
          <CardDescription>
            Enter the verification code sent to {email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                placeholder="Enter code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="text-center text-lg tracking-widest"
                maxLength={6}
              />
            </div>
            <Button
              className="w-full button-gradient"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify Email
            </Button>
            <div className="text-center">
              <Button
                variant="link"
                onClick={handleResend}
                disabled={isResending}
                className="text-primary hover:text-primary/90"
              >
                {isResending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Resend Code"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
