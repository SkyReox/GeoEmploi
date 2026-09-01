import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api-helpers";
import { prisma } from "@/lib/prisma";
import { CreateExperienceSchema } from "@/lib/validations/seeker.schema";

export const POST = withAuth(["SEEKER"], async (request, _context, session) => {
  const body = await request.json();
  const result = CreateExperienceSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }

  const profile = await prisma.seekerProfile.findUniqueOrThrow({
    where: { userId: session.user.id },
  });

  const experience = await prisma.experience.create({
    data: { ...result.data, profileId: profile.id },
  });

  return NextResponse.json(experience, { status: 201 });
});