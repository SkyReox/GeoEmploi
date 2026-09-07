import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  console.log('Exécution de la tâche cron en local...');

  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - 30);

  const result = await prisma.job.updateMany({
    where: {
      createdAt: {
        lte: dateLimit,
      },
      archived: false,
    },
    data: {
      archived: true,
    },
  });

  console.log(`${result.count} jobs archivés.`);

  return NextResponse.json({
    success: true,
    archivedJobs: result.count,
    date: new Date().toISOString(),
  });
}