import { z } from 'zod';

export const ApplicationCreateSchema = z.object({
  jobId: z.string().min(5),
});
