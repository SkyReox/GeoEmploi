import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export default async function Home() {
  const session = await auth();

  return (
    <div className="mx-auto space-y-6 px-4 py-8 bg-white text-black w-full flex flex-col flex-1">
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
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">
            Modifier mon profil
          </Button>
        </CardFooter>
      </Card>

      {/* Offres en ligne */}
      <Card>
        <CardHeader>
          <CardTitle>Mes offres en ligne</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border">
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">
            Ajouter une nouvelle offre
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}