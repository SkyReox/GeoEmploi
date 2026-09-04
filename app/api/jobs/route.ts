import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CreateJobSchema } from "@/lib/validations/job.schema";

async function geocodeAddress(address: string) {
  try {
    const res = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1`
    );
    const data = await res.json();
    const feature = data.features?.[0];
    if (!feature) return null;
    const [longitude, latitude] = feature.geometry.coordinates;
    return { latitude, longitude };
  } catch (err) {
    console.error("Geocoding failed:", err);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const session = await auth();
  const { searchParams } = new URL(request.url);

  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? 20)));
  const location = searchParams.get("location") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  let where: Record<string, unknown> = {};

  if (!session || session.user.role === "SEEKER") {
    where.status = "APPROVED";
  } else if (session.user.role === "GIVER") {
    where.giverId = session.user.id;
  }

  if (location) {
    where.location = { contains: location, mode: "insensitive" };
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { giver: { select: { id: true, firstname: true, lastname: true } } },
    }),
    prisma.job.count({ where }),
  ]);

  return NextResponse.json({
    jobs,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== "GIVER") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  
  const body = await request.json();
  const result = CreateJobSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }

  const coords = await geocodeAddress(result.data.location);
  const job = await prisma.job.create({
    data: {
      ...result.data,
      latitude: coords?.latitude ?? null,
      longitude: coords?.longitude ?? null,
      giverId: session.user.id,
      status: "APPROVED",
    },
  });

  return NextResponse.json(job, { status: 201 });
}