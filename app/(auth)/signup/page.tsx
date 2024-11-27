// "use client";
//
// import { AuthForm } from "@/components/auth-form";
// import { useToast } from "@/hooks/use-toast";
// import type { AuthFormData } from "@/types/auth-form";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";
//
// export default function SignUpPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const { toast } = useToast();
//   const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
//
//   const onSubmit = async (values: AuthFormData) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });
//
//       if (!response.ok) {
//         throw new Error("Registration failed");
//       }
//
//       // Send OTP verification email
//       await fetch("/api/auth/send-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: values.email }),
//       });
//
//       toast({
//         title: "Verification Required",
//         description: "Please check your email for the verification code.",
//       });
//
//       router.push(`/verify?email=${encodeURIComponent(values.email)}`);
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Something went wrong. Please try again.",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   return <AuthForm mode="signup" onSubmit={onSubmit} isLoading={isLoading} />;
// }

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Loader2, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({
    credentials: false,
    google: false,
    github: false,
  });

  const priceId = searchParams.get("priceId");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading({ ...isLoading, credentials: true });
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

      const verifyUrl = new URL("/verify", window.location.origin);
      verifyUrl.searchParams.set("email", values.email);
      if (priceId) {
        verifyUrl.searchParams.set("priceId", priceId);
      }
      router.push(verifyUrl.toString());
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading({ ...isLoading, credentials: false });
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    try {
      setIsLoading({ ...isLoading, [provider]: true });
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Could not sign in with ${provider}.`,
      });
    } finally {
      setIsLoading({ ...isLoading, [provider]: false });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute inset-0 gradient-blur" />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <Card className="w-full max-w-md relative">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="spotlight animated-border"
                onClick={() => handleOAuthSignIn("google")}
                disabled={isLoading.google}
              >
                {isLoading.google ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="mr-2 h-4 w-4" />
                )}
                Google
              </Button>
              <Button
                variant="outline"
                className="spotlight animated-border"
                onClick={() => handleOAuthSignIn("github")}
                disabled={isLoading.github}
              >
                {isLoading.github ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Github className="mr-2 h-4 w-4" />
                )}
                GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="********"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full button-gradient"
                  type="submit"
                  disabled={isLoading.credentials}
                >
                  {isLoading.credentials && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create Account
                </Button>
              </form>
            </Form>

            <div className="text-center text-sm">
              <Link
                href="/login"
                className="text-primary hover:text-primary/90 hover:underline"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
