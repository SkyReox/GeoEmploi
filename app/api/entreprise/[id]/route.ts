import { NextResponse } from "next/server";

const SIRENE_ENDPOINT =
  "https://recherche-entreprises.api.gouv.fr/search";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const siret = id.replace(/\s/g, "");

    // Un SIRET contient exactement 14 chiffres
    if (!/^\d{14}$/.test(siret)) {
      return NextResponse.json(
        {
          error: "SIRET invalide",
          message: "Le SIRET doit contenir exactement 14 chiffres.",
        },
        { status: 400 }
      );
    }

    const url = new URL(SIRENE_ENDPOINT);
    url.searchParams.set("q", siret);

    console.log("Requête :", url.toString());

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        "Erreur API Recherche Entreprises :",
        response.status,
        errorText
      );

      return NextResponse.json(
        {
          error: "Erreur API Recherche Entreprises",
          status: response.status,
        },
        { status: 502 }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur serveur :", error);

    return NextResponse.json(
      {
        error: "Erreur interne du serveur",
      },
      { status: 500 }
    );
  }
}