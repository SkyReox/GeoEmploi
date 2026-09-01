import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api-helpers";
import { prisma } from "@/lib/prisma";
import { UpdateProfileSchema } from "@/lib/validations/seeker.schema";

export const GET = withAuth(["SEEKER"], async (_request, _context, session) => {
  const profile = await prisma.seekerProfile.findUnique({
    where: { userId: session.user.id },
    include: { skills: true, experiences: { orderBy: { startDate: "desc" } } },
  });

  if (!profile) {
    return NextResponse.json({ error: "Profil introuvable" }, { status: 404 });
  }

  return NextResponse.json(profile);
});

export const PUT = withAuth(["SEEKER"], async (request, _context, session) => {
  const body = await request.json();
  const result = UpdateProfileSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }

  const profile = await prisma.seekerProfile.update({
    where: { userId: session.user.id },
    data: result.data,
  });

  return NextResponse.json(profile);
});