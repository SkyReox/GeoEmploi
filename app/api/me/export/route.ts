import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api-helpers";
import { prisma } from "@/lib/prisma";

export const GET = withAuth(
  ["SEEKER", "GIVER", "ADMIN"],
  async (_request, _context, session) => {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        role: true,
        banned: true,
        createdAt: true,
        updatedAt: true,
        seekerProfile: {
          select: {
            bio: true,
            availability: true,
            availableFrom: true,
            updatedAt: true,
            skills: {
              select: { name: true },
              orderBy: { name: "asc" },
            },
            experiences: {
              select: {
                title: true,
                company: true,
                startDate: true,
                endDate: true,
                description: true,
              },
              orderBy: { startDate: "desc" },
            },
          },
        },
        applications: {
          select: {
            status: true,
            createdAt: true,
            updatedAt: true,
            job: {
              select: {
                title: true,
                description: true,
                location: true,
                latitude: true,
                longitude: true,
                salary: true,
                status: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        jobsPosted: {
          select: {
            title: true,
            description: true,
            location: true,
            latitude: true,
            longitude: true,
            salary: true,
            status: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    const consentsAtAccountCreation = [
      {
        type: "TERMS_OF_SERVICE",
        requestedAt: user.createdAt,
        source: "account_creation",
      },
      {
        type: "PRIVACY_POLICY",
        requestedAt: user.createdAt,
        source: "account_creation",
      },
    ];

    return NextResponse.json(
      {
        exportedAt: new Date().toISOString(),
        formatVersion: 1,
        data: { ...user, consentsAtAccountCreation },
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "Content-Disposition": 'attachment; filename="geoemploi-donnees-personnelles.json"',
        },
      },
    );
  },
);
