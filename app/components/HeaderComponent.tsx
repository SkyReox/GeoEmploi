import { auth } from "@/lib/auth";
import Image from "next/image";

async function getDashboardHref() {
    const session = await auth();
    if (!session || !session.user) {
        return "/";
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
    const session = await auth();
    const dashboardHref = await getDashboardHref();
    return (<header className="sticky top-0 z-10000 flex w-full min-w-0 flex-col bg-main-1 p-2 max-[480]:static max-[480]:p-1">
        <nav className="flex min-w-0 flex-col items-center gap-2 max-[480]:flex-row max-[480]:items-start max-[480]:gap-1 sm:flex-row sm:justify-between">
            <div className="flex items-center justify-start">
                <a href="/">
                    <Image
                        className="h-16 w-16 bg-white text-black max-[480]:h-10 max-[480]:w-10"
                        src="/jeb.png"
                        alt="Bloc-marque JEB"
                        aria-hidden="true"
                        width={100}
                        height={100}
                        priority
                    />
                </a>
            </div>
            <div className="flex min-w-0 flex-wrap justify-center gap-2 max-[480]:flex-1 max-[480]:justify-end max-[480]:gap-1 sm:justify-end">
                <div className="flex items-center justify-end">
                    <a aria-label="Carte Interactive" className="rounded-[.5rem] bg-white p-1 text-center text-black shadow-md outline-0 outline-gray-300 outline-offset-1 hover:bg-gray-300 hover:outline-2 focus:outline-2 focus:outline-blue-500 max-[480]:rounded-md max-[480]:px-1.5 max-[480]:py-1 max-[480]:text-xs" href="/map"><span className="max-[480]:hidden">Carte Interactive</span><span className="hidden max-[480]:inline">Carte</span></a>
                </div>
                {!session && (
                    <div className="flex items-center justify-end">
                        <a aria-label="Se connecter" className="rounded-[.5rem] bg-white p-1 text-center text-black shadow-md outline-0 outline-gray-300 outline-offset-1 hover:bg-gray-300 hover:outline-2 focus:outline-2 focus:outline-blue-500 max-[480]:rounded-md max-[480]:px-1.5 max-[480]:py-1 max-[480]:text-xs" href="/login"><span className="max-[480]:hidden">Se connecter</span><span className="hidden max-[480]:inline">Connexion</span></a>
                    </div>)}
                {!session && (
                    <div className="flex items-center justify-end">
                        <a aria-label="S'inscrire" className="rounded-[.5rem] bg-white p-1 text-center text-black shadow-md outline-0 outline-gray-300 outline-offset-1 hover:bg-gray-300 hover:outline-2 focus:outline-2 focus:outline-blue-500 max-[480]:rounded-md max-[480]:px-1.5 max-[480]:py-1 max-[480]:text-xs" href="/signup"><span className="max-[480]:hidden">S'inscrire</span><span className="hidden max-[480]:inline">Inscription</span></a>
                    </div>
                )}
                {dashboardHref !== "/" && (
                    <div className="flex items-center justify-end">
                        <a className="rounded-[.5rem] bg-white p-1 text-center text-black shadow-md outline-0 outline-gray-300 outline-offset-1 hover:bg-gray-300 hover:outline-2 focus:outline-2 focus:outline-blue-500 max-[480]:rounded-md max-[480]:px-1.5 max-[480]:py-1 max-[480]:text-xs" href={dashboardHref}>
                            <span className="max-[480]:hidden">Dashboard</span><span className="hidden max-[480]:inline">Tableau</span>
                        </a>
                    </div>
                )}
                {session && session.user && (
                    <div className="flex items-center justify-end">
                        <a className="rounded-[.5rem] bg-white p-1 text-center text-black shadow-md outline-0 outline-gray-300 outline-offset-1 hover:bg-gray-300 hover:outline-2 focus:outline-2 focus:outline-blue-500 max-[480]:rounded-md max-[480]:px-1.5 max-[480]:py-1 max-[480]:text-xs" href="/api/auth/signout">Déconnexion</a>
                    </div>
                )}
            </div>
        </nav>
    </header>);
}
