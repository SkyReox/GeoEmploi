import { NextRequest, NextResponse } from "next/server";

const GEOPF_GEOCODING_URL = "https://data.geopf.fr/geocodage";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q")?.trim();
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lon");

  let endpoint: URL;
  if (query) {
    endpoint = new URL(`${GEOPF_GEOCODING_URL}/search`);
    endpoint.searchParams.set("q", query);
    endpoint.searchParams.set("limit", "5");
  } else if (latitude && longitude) {
    endpoint = new URL(`${GEOPF_GEOCODING_URL}/reverse`);
    endpoint.searchParams.set("lat", latitude);
    endpoint.searchParams.set("lon", longitude);
  } else {
    return NextResponse.json(
      { error: "Indiquez une adresse ou des coordonnées" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(endpoint, { next: { revalidate: 3600 } });
    if (!response.ok) {
      return NextResponse.json(
        { error: "Le service GeoPF est indisponible" },
        { status: 502 }
      );
    }

    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json(
      { error: "Impossible de contacter le service GeoPF" },
      { status: 502 }
    );
  }
}