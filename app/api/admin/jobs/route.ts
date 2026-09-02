import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api-helpers";
import { prisma } from "@/lib/prisma";

export const GET = withAuth(["ADMIN"], async (request) => {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? 20)));
  const status = searchParams.get("status") ?? undefined;

  const where = status
    ? { status: status as "PENDING" | "APPROVED" | "REJECTED" | "CLOSED" }
    : {};

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        giver: { select: { id: true, firstname: true, lastname: true, email: true } },
        _count: { select: { applications: true } },
      },
    }),
    prisma.job.count({ where }),
  ]);

  return NextResponse.json({
    jobs,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
});