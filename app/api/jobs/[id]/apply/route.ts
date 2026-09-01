import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api-helpers";
import { prisma } from "@/lib/prisma";

export const POST = withAuth(["SEEKER"], async (request, context, session) => {
  const { id: jobId } = await context.params;

  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job || job.status !== "APPROVED") {
    return NextResponse.json({ error: "Job introuvable ou non disponible" }, { status: 404 });
  }

  const existing = await prisma.application.findUnique({
    where: { jobId_seekerId: { jobId, seekerId: session.user.id } },
  });
  if (existing) {
    return NextResponse.json({ error: "Vous avez déjà postulé à ce job" }, { status: 409 });
  }

  const application = await prisma.application.create({
    data: { jobId, seekerId: session.user.id },
  });

  return NextResponse.json(application, { status: 201 });
});