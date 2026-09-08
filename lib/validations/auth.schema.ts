import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "8 caractères minimum"),
    firstname: z.string().min(1).max(100),
    lastname: z.string().min(1).max(100),
    role: z.enum(["SEEKER", "GIVER"]),
    companyName: z.string().trim().max(200).optional(),
    siret: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "GIVER") {
      if (!data.companyName || data.companyName.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyName"],
          message: "Le nom de l'entreprise est obligatoire pour un recruteur.",
        });
      }

      if (!data.siret || !/^\d{14}$/.test(data.siret.trim())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["siret"],
          message: "Le numéro SIRET doit contenir 14 chiffres.",
        });
      }
    }
  });