import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UpdateUserSchema } from "@/lib/validations/admin.schema";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  if (id === session.user.id) {
    return NextResponse.json({ error: "Impossible de vous bannir vous-même" }, { status: 400 });
  }

  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) {
    return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
  }
  if (target.role === "ADMIN") {
    return NextResponse.json({ error: "Impossible de bannir un admin" }, { status: 400 });
  }

  const body = await request.json();
  const result = UpdateUserSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }

  const updated = await prisma.user.update({
    where: { id },
    data: { banned: result.data.banned },
    select: { id: true, email: true, name: true, role: true, banned: true },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  if (id === session.user.id) {
    return NextResponse.json({ error: "Impossible de vous supprimer vous-même" }, { status: 400 });
  }

  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) {
    return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
  }
  if (target.role === "ADMIN") {
    return NextResponse.json({ error: "Impossible de supprimer un admin" }, { status: 400 });
  }

  await prisma.user.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}