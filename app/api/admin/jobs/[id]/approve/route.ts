import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api-helpers";
import { prisma } from "@/lib/prisma";
import { ApproveJobSchema } from "@/lib/validations/admin.schema";

export const PUT = withAuth(["ADMIN"], async (request, context) => {
  const { id } = await context.params;

  const body = await request.json();
  const result = ApproveJobSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) {
    return NextResponse.json({ error: "Job introuvable" }, { status: 404 });
  }

  const newStatus = result.data.action === "APPROVE" ? "APPROVED" : "REJECTED";

  const updated = await prisma.job.update({
    where: { id },
    data: { status: newStatus },
  });

  return NextResponse.json(updated);
});