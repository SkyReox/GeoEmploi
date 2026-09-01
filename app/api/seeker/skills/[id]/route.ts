import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session || session.user.role !== "SEEKER") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const skill = await prisma.skill.findUnique({
    where: { id },
    include: { profile: true },
  });
  if (!skill) {
    return NextResponse.json({ error: "Compétence introuvable" }, { status: 404 });
  }
  if (skill.profile.userId !== session.user.id) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  await prisma.skill.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}