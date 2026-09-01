import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api-helpers";
import { prisma } from "@/lib/prisma";
import { CreateSkillSchema } from "@/lib/validations/seeker.schema";

export const GET = withAuth(["SEEKER"], async (_request, _context, session) => {
  const profile = await prisma.seekerProfile.findUniqueOrThrow({
    where: { userId: session.user.id },
  });

  const skills = await prisma.skill.findMany({
    where: { profileId: profile.id },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(skills);
});

export const POST = withAuth(["SEEKER"], async (request, _context, session) => {
  const body = await request.json();
  const result = CreateSkillSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }

  const profile = await prisma.seekerProfile.findUniqueOrThrow({
    where: { userId: session.user.id },
  });

  const existing = await prisma.skill.findUnique({
    where: { profileId_name: { profileId: profile.id, name: result.data.name } },
  });
  if (existing) {
    return NextResponse.json({ error: "Cette compétence existe déjà" }, { status: 409 });
  }

  const skill = await prisma.skill.create({
    data: { ...result.data, profileId: profile.id },
  });

  return NextResponse.json(skill, { status: 201 });
});