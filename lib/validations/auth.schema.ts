import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "8 caractères minimum"),
  firstname: z.string().min(1).max(100),
  lastname: z.string().min(1).max(100),
  role: z.enum(["SEEKER", "GIVER"]),
});