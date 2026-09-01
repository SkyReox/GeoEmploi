import { z } from "zod";

export const CreateApplicationSchema = z.object({
  message: z.string().max(2000).optional(),
});

export const UpdateApplicationSchema = z.object({
  status: z.enum(["ACCEPTED", "REJECTED"]),
});