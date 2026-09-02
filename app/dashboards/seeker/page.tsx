import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export default async function Home() {
  const session = await auth();
//   if (!session) return null; // déjà géré par le layout / proxy.ts en pratique

//   const [profile, applications] = await Promise.all([
//     prisma.seekerProfile.findUnique({
//       where: { userId: session.user.id },
//       include: { skills: true, experiences: true },
//     }),
//     prisma.application.findMany({
//       where: { seekerId: session.user.id },
//       include: { job: { select: { title: true, location: true, status: true } } },
//       orderBy: { createdAt: "desc" },
//       take: 5,
//     }),
//   ]);

  return (
    <div className="mx-auto mt-[1.5rem] px-4 py-8 bg-white text-black w-full flex flex-col flex-1">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Bonjour {/*session.user.name*/}</h1>
        <p className="text-sm text-neutral">Voici un aperçu de votre activité</p>
      </div>

      {/* Résumé profil */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Mon profil</CardTitle>
          {/* <Badge variant="neutral">{profile?.availability.replace("_", " ")}</Badge> */}
        </CardHeader>
        <CardContent>
          {/* <p className="text-sm text-ink">{profile?.bio || "Aucune bio renseignée."}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile?.skills.map((skill) => (
              <span
                key={skill.id}
                className="rounded-md bg-neutral-bg px-2 py-1 text-xs text-ink"
              >
                {skill.name}
              </span>
            ))}
          </div> */}
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">
            Modifier mon profil
          </Button>
        </CardFooter>
      </Card>

      {/* Candidatures récentes */}
      <Card>
        <CardHeader>
          <CardTitle>Mes candidatures récentes</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          {/* {applications.length === 0 && (
            <p className="py-4 text-sm text-neutral">
              Vous n'avez postulé à aucune offre pour le moment.
            </p>
          )}
          {applications.map((app) => (
            <div key={app.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-ink">{app.job.title}</p>
                <p className="text-xs text-neutral">{app.job.location}</p>
              </div>
              <Badge variant={app.status.toLowerCase() as "pending" | "accepted" | "rejected"} />
            </div>
          ))} */}
        </CardContent>
      </Card>
    </div>
  );
}