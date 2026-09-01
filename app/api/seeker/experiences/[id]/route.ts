import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UpdateExperienceSchema } from "@/lib/validations/seeker.schema";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session || session.user.role !== "SEEKER") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const experience = await prisma.experience.findUnique({
    where: { id },
    include: { profile: true },
  });
  if (!experience) {
    return NextResponse.json({ error: "Expérience introuvable" }, { status: 404 });
  }
  if (experience.profile.userId !== session.user.id) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const body = await request.json();
  const result = UpdateExperienceSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }

  const updated = await prisma.experience.update({
    where: { id },
    data: result.data,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session || session.user.role !== "SEEKER") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const experience = await prisma.experience.findUnique({
    where: { id },
    include: { profile: true },
  });
  if (!experience) {
    return NextResponse.json({ error: "Expérience introuvable" }, { status: 404 });
  }
  if (experience.profile.userId !== session.user.id) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  await prisma.experience.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}