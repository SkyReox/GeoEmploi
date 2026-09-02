import { auth } from "@/lib/auth";
import Image from "next/image";

async function getDashboardHref() {
    const session = await auth();
    if (!session || !session.user) {
        return "/dashboards/admin";
    }

    const role = session.user.role;
    switch (role) {
        case "SEEKER":
            return "/dashboards/seeker";
        case "GIVER":
            return "/dashboards/giver";
        case "ADMIN":
            return "/dashboards/admin";
        default:
            return "/";
    }
}

export default async function HeaderComponent() {
    const dashboardHref = await getDashboardHref();

    return (
        <header className="flex flex-col p-2 w-full bg-main-1">
            <nav className="flex justify-center">
                <div className="pe-lg flex gap-xs items-center justify-start">
                    <a href="/">
                        <Image
                            className="w-8"
                            src="/icon.png"
                            alt="GeoEmploi Icon"
                            width={100}
                            height={100}
                            priority
                        />
                    </a>
                </div>

                {/* 3. Affichage conditionnel : le bouton s'affiche uniquement si l'URL n'est pas la racine */}
                {dashboardHref !== "/" && (
                    <div className="flex-1 pr-2 items-center flex justify-end">
                        <a className="bg-white text-black p-1 rounded-[.5rem] hover:bg-gray-300 shadow-md" href={dashboardHref}>
                            dashboard
                        </a>
                    </div>
                )}

                <div className="flex-1 pr-2 items-center flex justify-end">
                    <a className="bg-white text-black p-1 rounded-[.5rem] hover:bg-gray-300 shadow-md" href="/map">Carte Interactive</a>
                </div>
                <div className="pr-2 ps-lg gap-xs items-center flex justify-end">
                    <a className="bg-white text-black p-1 rounded-[.5rem] hover:bg-gray-300 shadow-md" href="/test">Se connecter</a>
                </div>
                <div className="ps-lg gap-xs items-center flex justify-end">
                    <a className="bg-white text-black p-1 rounded-[.5rem] hover:bg-gray-300 shadow-md" href="/test">S'inscrire</a>
                </div>
            </nav>
        </header>
    );
}
