import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "Name is required" })
      .max(50, { message: "Name must be less than 50 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((value) => {
    return (
      value.password === value.confirmPassword,
      {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      }
    );
  });

export type SignUpType = z.infer<typeof signUpSchema>;
