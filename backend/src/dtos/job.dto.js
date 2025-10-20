

import { z } from 'zod';

// ✅ For creating a new Job (frontend → backend)
export const JobCreateSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  location: z.string().min(2, 'Location is required.'),

  jobType: z.enum(['Full-Time', 'Part-Time', 'Contract'], {
    required_error: 'Job type must be one of: Full-Time, Part-Time, or Contract.',
  }),

  company: z.string().min(2, 'Company name is required.'),

  // ❌ REMOVED from create schema — backend sets this automatically
  // postedBy will be injected via req.user.id in controller

  skills: z.array(z.string().min(1)).optional(),
  isActive: z.boolean().optional(),
});

// ✅ For updating an existing Job (all fields optional)
export const JobUpdateSchema = JobCreateSchema.partial();

// ✅ Optional: Define JobResponseSchema (for clean API responses)
export const JobResponseSchema = JobCreateSchema.extend({
  id: z.union([z.string(), z.number()]),
  postedBy: z.union([
    z.string().min(1),
    z.number().int().positive(),
  ]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
