import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UpdateApplicationSchema } from "@/lib/validations/application.schema";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session || session.user.role !== "GIVER") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const application = await prisma.application.findUnique({
    where: { id },
    include: { job: true },
  });
  if (!application) {
    return NextResponse.json({ error: "Candidature introuvable" }, { status: 404 });
  }
  if (application.job.giverId !== session.user.id) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  if (application.status !== "PENDING") {
    return NextResponse.json(
      { error: "Cette candidature a déjà été traitée" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const result = UpdateApplicationSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }

  const updated = await prisma.application.update({
    where: { id },
    data: { status: result.data.status },
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

  const application = await prisma.application.findUnique({ where: { id } });
  if (!application) {
    return NextResponse.json({ error: "Candidature introuvable" }, { status: 404 });
  }
  if (application.seekerId !== session.user.id) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  await prisma.application.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}