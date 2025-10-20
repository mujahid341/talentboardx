// import { z } from 'zod';

// export const JobCreateSchema = z.object({
//   title: z.string().min(3),
//   description: z.string().min(10),
//   location: z.string(),
//   jobType: z.enum(['Full-Time', 'Part-Time', 'Contract']),
//   company: z.string(),
//   postedBy: z.string().min(5), // could be ObjectId or UUID
//   skills: z.array(z.string()).optional(),
// });

// export const JobUpdateSchema = JobCreateSchema.partial(); // partial() makes all fields optional,it will allow to send only the fields that we want to update


import { z } from 'zod';

export const JobCreateSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  location: z.string().min(2, 'Location is required.'),
  
  jobType: z.enum(['Full-Time', 'Part-Time', 'Contract'], {
    required_error: 'Job type is required and must be one of: Full-Time, Part-Time, Contract.',
  }),

  company: z.string().min(2, 'Company name is required.'),

  // ✅ Supports both Mongo (string ObjectId) and Postgres (numeric ID)
  postedBy: z.union([
    z.string().min(5, 'Invalid ID format.'),  // e.g., ObjectId
    z.number().int().positive(),              // e.g., 1
  ]),

  skills: z.array(z.string().min(1)).optional(),

  isActive: z.boolean().optional(), // optional but valid
});

export const JobUpdateSchema = JobCreateSchema.partial();
