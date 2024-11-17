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
// import { signIn } from "next-auth/react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
//
// const loginSchema = z.object({
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
//   password: z.string().min(8, {
//     message: "Password must be at least 8 characters.",
//   }),
// });
//
// export default function LoginPage() {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const { toast } = useToast();
//   const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
//
//   const form = useForm<z.infer<typeof loginSchema>>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });
//
//   const onSubmit = async (values: z.infer<typeof loginSchema>) => {
//     try {
//       setIsLoading(true);
//       const result = await signIn("credentials", {
//         email: values.email,
//         password: values.password,
//         redirect: false,
//       });
//
//       if (result?.error) {
//         toast({
//           variant: "destructive",
//           title: "Error",
//           description: "Invalid email or password.",
//         });
//       } else {
//         router.push(callbackUrl);
//       }
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
//           <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
//           <CardDescription>Sign in to your account to continue</CardDescription>
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
//                         <Input placeholder="john.doe@example.com" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//
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
//                   Sign In
//                 </Button>
//               </form>
//             </Form>
//
//             <div className="text-center text-sm">
//               <Link
//                 href="/signup"
//                 className="text-primary hover:text-primary/90 hover:underline"
//               >
//                 Don&apos;t have an account? Sign up
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
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { AuthFormData } from "@/types/auth-form";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const onSubmit = async (values: AuthFormData) => {
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid email or password.",
        });
      } else {
        router.push(callbackUrl);
      }
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

  return <AuthForm mode="login" onSubmit={onSubmit} isLoading={isLoading} />;
}
