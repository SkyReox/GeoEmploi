import { z } from "zod";
import { Availability } from "@prisma/client";

export const UpdateProfileSchema = z.object({
  bio: z.string().max(1000).optional(),
  availability: z.nativeEnum(Availability),
  availableFrom: z.string().optional(),
});

export const CreateSkillSchema = z.object({
  name: z.string().min(1).max(50),
});

export const CreateExperienceSchema = z
  .object({
    title: z.string().min(1).max(200),
    company: z.string().min(1).max(200),
    startDate: z.string(),
    endDate: z.string().optional(),
    description: z.string().max(2000).optional(),
  })

export const UpdateExperienceSchema = z
  .object({
    title: z.string().min(1).max(200).optional(),
    company: z.string().min(1).max(200).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    description: z.string().max(2000).optional(),
  })
  .refine(
    (data) =>
      !data.startDate || !data.endDate || new Date(data.endDate) >= new Date(data.startDate),
    { message: "endDate doit être après startDate", path: ["endDate"] }
  );