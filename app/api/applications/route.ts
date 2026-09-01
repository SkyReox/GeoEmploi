import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api-helpers";
import { prisma } from "@/lib/prisma";

export const GET = withAuth(["SEEKER", "GIVER"], async (request, _context, session) => {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? 20)));

  const where =
    session.user.role === "SEEKER"
      ? { seekerId: session.user.id }
      : { job: { giverId: session.user.id } };

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        job: { select: { id: true, title: true, location: true, status: true } },
        seeker: {
          select: {
            id: true,
            name: true,
            email: true,
            seekerProfile: {
              include: { skills: true, experiences: true },
            },
          },
        },
      },
    }),
    prisma.application.count({ where }),
  ]);

  return NextResponse.json({
    applications,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
});