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
import { SocialLogin } from "@/components/ui/social-login";
import { AuthFormData, AuthFormProps, authSchema } from "@/types/auth-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

export function AuthForm({ mode, onSubmit, isLoading = false }: AuthFormProps) {
  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const config = {
    login: {
      title: "Welcome back",
      description: "Sign in to your account to continue",
      buttonText: "Sign In",
      altLink: {
        text: "Don't have an account? Sign up",
        href: "/signup",
      },
    },
    signup: {
      title: "Create an account",
      description: "Enter your information to get started",
      buttonText: "Create Account",
      altLink: {
        text: "Already have an account? Sign in",
        href: "/login",
      },
    },
  };

  const currentConfig = config[mode];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute inset-0 gradient-blur" />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <Card className="w-full max-w-md relative">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {currentConfig.title}
          </CardTitle>
          <CardDescription>{currentConfig.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <SocialLogin />

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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            mode === "login"
                              ? "john.doe@example.com"
                              : "name@example.com"
                          }
                          {...field}
                        />
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
                          type="password"
                          placeholder="*********"
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
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {currentConfig.buttonText}
                </Button>
              </form>
            </Form>

            <div className="text-center text-sm">
              <Link
                href={currentConfig.altLink.href}
                className="text-primary hover:text-primary/90 hover:underline"
              >
                {currentConfig.altLink.text}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
