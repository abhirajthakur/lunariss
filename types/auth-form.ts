import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export type AuthFormData = z.infer<typeof authSchema>;

export interface AuthFormProps {
  mode: "login" | "signup";
  onSubmit: (values: AuthFormData) => Promise<void>;
  isLoading?: boolean;
}
