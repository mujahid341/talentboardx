// import { z } from 'zod';

// export const ApplicationCreateSchema = z.object({
//   jobId: z.string().min(5, 'Job ID is required'),
// });


import { z } from 'zod';

export const ApplicationCreateSchema = z.object({
  jobId: z.union([
    // Case 1: Non-empty string
    z
      .string({
        required_error: "Job ID is required",
        invalid_type_error: "Job ID must be a string or number",
      })
      .min(1, "Job ID cannot be empty"),

    // Case 2: Number with at least 1 digit
    z
      .number({
        required_error: "Job ID is required",
        invalid_type_error: "Job ID must be a string or number",
      })
      .refine(val => val.toString().length >= 1, {
        message: "Job ID must be at least 1 digit",
      }),
  ]),
});
