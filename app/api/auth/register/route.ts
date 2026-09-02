import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/lib/validations/auth.schema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = RegisterSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }

  const { email, password, firstname, lastname, role } = result.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: { email, password: hashedPassword, firstname, lastname, role },
    });

    if (role === "SEEKER") {
      await tx.seekerProfile.create({ data: { userId: newUser.id } });
    }

    return newUser;
  });

  return NextResponse.json({ id: user.id, email: user.email, role: user.role }, { status: 201 });
}