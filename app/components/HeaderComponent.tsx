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
    return (<header className="sticky top-0 z-1000 flex flex-col p-2 w-full bg-main-1">
        <nav className="flex justify-between">
            <div className="pe-lg flex gap-xs items-center justify-start">
                <a href="/">
                    <Image
                        className="w-16 h-16 bg-white flex text-black justify-center items-center"
                        src="/jeb.png"
                        alt="Bloque marque JEB"
                        aria-hidden="true"
                        width={100}
                        height={100}
                        priority
                    />
                </a>
            </div>
            <div className="flex-1 pr-2 items-center flex justify-end">
                <a className="bg-white text-black p-1 rounded-[.5rem] hover:bg-gray-300 shadow-md" href="/map">Carte Interactive</a>
            </div>

            <div className="flex justify-end">
                {!session && (
                    <div className="pr-2 ps-lg gap-xs items-center flex justify-end">
                        <a className="bg-white text-black p-1 rounded-[.5rem] hover:bg-gray-300 shadow-md" href="/login">Se connecter</a> {/* TODO: Change href when Sign up is done */}
                    </div>)}
                {!session && (
                    <div className="ps-lg gap-xs items-center flex justify-end">
                        <a className="bg-white text-black p-1 rounded-[.5rem] hover:bg-gray-300 shadow-md" href="/signup">S'inscrire</a> {/* TODO: Change href when Sign in is done */}

                    </div>

                )}
                {dashboardHref !== "/" && (
                    <div className="flex-1 pr-2 items-center flex justify-end">
                        <a className="bg-white text-black p-1 rounded-[.5rem] hover:bg-gray-300 shadow-md" href={dashboardHref}>
                            Dashboard
                        </a>
                    </div>
                )}
                {session && session.user && (
                    <div className="flex-1 pr-2 items-center flex justify-end">
                        <a className="bg-white text-black p-1 rounded-[.5rem] hover:bg-gray-300 shadow-md" href="/api/auth/">Déconnexion</a>
                    </div>
                )}
            </div>
        </nav>
    </header>);
}
