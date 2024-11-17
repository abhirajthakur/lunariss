"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SiGithub, SiGoogle } from "react-icons/si";

export const SocialLogin = () => {
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({
    google: false,
    github: false,
  });

  const searchParams = useSearchParams();
  const { toast } = useToast();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    try {
      setIsLoading({ ...isLoading, [provider]: true });
      await signIn(provider, { callbackUrl });
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
          <SiGoogle className="mr-2 h-4 w-4" />
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
          <SiGithub className="mr-2 h-4 w-4" />
        )}
        GitHub
      </Button>
    </div>
  );
};
