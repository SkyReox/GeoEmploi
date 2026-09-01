import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import type { Role } from "@prisma/client";
import type { Session } from "next-auth";

type Handler = (
  request: Request,
  context: { params: Promise<Record<string, string>> },
  session: Session
) => Promise<NextResponse>;

export function withAuth(allowedRoles: Role[], handler: Handler) {
  return async (
    request: Request,
    context: { params: Promise<Record<string, string>> }
  ) => {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    try {
      return await handler(request, context, session);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  };
}