import { z } from 'zod';

// Signup ke liye validation
export const SignupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  role: z.enum(['jobseeker', 'employer', 'admin']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Login ke liye validation
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
