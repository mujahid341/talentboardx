// src/dtos/user.dto.js

import { z } from 'zod';

// Registration DTO
export const UserRegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['candidate', 'employer', 'admin']).default('candidate'),
});

// Login DTO
export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// User Update DTO (all optional)
export const UserUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  password: z.string().min(6).optional(),
  role: z.enum(['candidate', 'employer', 'admin']).optional(),
});
