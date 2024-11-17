// "use client";
//
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { SocialLogin } from "@/components/ui/social-login";
// import { useToast } from "@/hooks/use-toast";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Loader2 } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
//
// const signupSchema = z.object({
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
//   password: z.string().min(8, {
//     message: "Password must be at least 8 characters.",
//   }),
// });
//
// export default function SignUpPage() {
//   const router = useRouter();
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const form = useForm<z.infer<typeof signupSchema>>({
//     resolver: zodResolver(signupSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });
//
//   const onSubmit = async (values: z.infer<typeof signupSchema>) => {
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
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background px-4">
//       <div className="absolute inset-0 gradient-blur" />
//       <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
//
//       <Card className="w-full max-w-md relative">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold">
//             Create an account
//           </CardTitle>
//           <CardDescription>
//             Enter your information to get started
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-6">
//             <SocialLogin />
//
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <span className="w-full border-t" />
//               </div>
//               <div className="relative flex justify-center text-xs uppercase">
//                 <span className="bg-card px-2 text-muted-foreground">
//                   Or continue with
//                 </span>
//               </div>
//             </div>
//
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-4"
//               >
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input placeholder="name@example.com" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Password</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="password"
//                           placeholder="*********"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button
//                   className="w-full button-gradient"
//                   type="submit"
//                   disabled={isLoading}
//                 >
//                   {isLoading && (
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   )}
//                   Create Account
//                 </Button>
//               </form>
//             </Form>
//
//             <div className="text-center text-sm">
//               <Link
//                 href="/login"
//                 className="text-primary hover:text-primary/90 hover:underline"
//               >
//                 Already have an account? Sign in
//               </Link>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

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
