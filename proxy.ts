import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const role = req.auth?.user?.role;
  const isLoggedIn = !!req.auth;

  const protectedPrefixes = ["/dashboards", "/api/seeker", "/api/applications"];
  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));

  if (isProtected && !isLoggedIn) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/dashboards/admin") || pathname.startsWith("/api/admin")) {
    if (role !== "ADMIN") {
      return pathname.startsWith("/api")
        ? NextResponse.json({ error: "Accès refusé" }, { status: 403 })
        : NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/dashboards/giver") && role !== "GIVER") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/dashboards/seeker") && role !== "SEEKER") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboards/:path*", "/api/seeker/:path*", "/api/admin/:path*", "/api/applications/:path*"],
};