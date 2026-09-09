import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/lib/validations/auth.schema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = RegisterSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }

  const { email, password, firstname, lastname, role, companyName, siret } = result.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 409 });
  }

  if (role === "GIVER" && siret) {
    const existingSiret = await prisma.user.findUnique({
      where: { siret },
      select: { id: true },
    });

    if (existingSiret) {
      return NextResponse.json(
        { error: "Ce numéro SIRET est déjà utilisé" },
        { status: 409 },
      );
    }
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          firstname,
          lastname,
          role,
          ...(role === "GIVER"
            ? {
                companyName,
                siret,
              }
            : {}),
        },
      });

      if (role === "SEEKER") {
        await tx.seekerProfile.create({ data: { userId: newUser.id } });
      }

      return newUser;
    });

    return NextResponse.json(
      { id: user.id, email: user.email, role: user.role },
      { status: 201 },
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002" &&
      Array.isArray(error.meta?.target) &&
      error.meta.target.includes("siret")
    ) {
      return NextResponse.json(
        { error: "Ce numéro SIRET est déjà utilisé" },
        { status: 409 },
      );
    }

    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { error: "Impossible de créer le compte" },
      { status: 500 },
    );
  }
}