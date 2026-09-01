import { z } from "zod";

export const CreateJobSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  location: z.string().min(1).max(200),
  salary: z.number().int().positive().optional(),
});

export const UpdateJobSchema = CreateJobSchema.partial();