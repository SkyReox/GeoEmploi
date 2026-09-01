import { z } from "zod";

export const ApproveJobSchema = z.object({
  action: z.enum(["APPROVE", "REJECT"]),
});

export const UpdateUserSchema = z.object({
  banned: z.boolean(),
});