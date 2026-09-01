import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "8 caractères minimum"),
  name: z.string().min(1),
  role: z.enum(["SEEKER", "GIVER"]),
});