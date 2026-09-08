import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api-helpers";
import { prisma } from "@/lib/prisma";

export const PUT = withAuth(["ADMIN", "SEEKER", "GIVER"], async (request, context) => {
  const { id } = await context.params;

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) {
    return NextResponse.json({ error: "Job introuvable" }, { status: 404 });
  }

  const signaled = job.reportedNb + 1;

  const updated = await prisma.job.update({
    where: { id },
    data: { reportedNb: signaled },
  });

  return NextResponse.json(updated);
});