import packageJson from "@/package.json";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const noStoreHeaders = {
  "Cache-Control": "no-store, max-age=0",
};

export async function GET() {
  const startTime = performance.now();

  try {
    await prisma.$queryRaw`SELECT 1`;

    return Response.json(
      {
        status: "ok",
        version: packageJson.version,
        database: {
          status: "ok",
          responseTimeMs: Math.round(performance.now() - startTime),
        },
      },
      { headers: noStoreHeaders },
    );
  } catch (error) {
    console.error("Health check database failure", error);

    return Response.json(
      {
        status: "degraded",
        version: packageJson.version,
        database: {
          status: "unavailable",
          responseTimeMs: Math.round(performance.now() - startTime),
        },
      },
      { status: 503, headers: noStoreHeaders },
    );
  }
}
