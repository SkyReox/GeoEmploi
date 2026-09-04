import Image from "next/image";

export default function FooterComponent() {
    return (<footer className="flex w-full min-w-0 justify-center bg-main-1 p-3">
        <nav className="flex w-full max-w-5xl flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-center">
            <div className="flex shrink-0">
                <Image
                    className="h-full object-contain text-[16px] flex items-center justify-center text-center"
                    src="/goat.png"
                    alt="Logo de l'entreprise JEB"
                    width={100}
                    height={100}
                    priority
                />
            </div>
            <div className="flex w-full flex-col items-center sm:items-start gap-4 text-center sm:w-auto sm:flex-row sm:pl-[5%] sm:text-left">
                <div className="flex flex-col w-full max-w-[240px] sm:mr-5">
                    <h3 className="font-sans text-md font-bold mb-1 text-white">Général</h3>
                    <ul role="list">
                        <li role="listitem">
                            <a href="/signup" className="text-white">S'inscrire</a>

                        </li>
                        <li role="listitem">
                            <a href="/assistance-clientele" className="text-white">Assistance clientèle</a>
                        </li>
                    </ul>
                </div>
                <div className="w-full max-w-[240px] sm:mr-5">
                    <h3 className="font-sans text-md font-bold mb-1 text-white">Parcourir GéoEmploi</h3>
                    <ul role="list">
                        <li role="listitem">
                            <a href="/map" className="text-white">Carte interactive</a>
                        </li>
                    </ul>
                </div>
                <div className="w-full max-w-[240px] sm:mr-5">
                    <h3 className="font-sans text-md font-bold mb-1 text-white">Législatif</h3>
                    <ul role="list">
                        <li role="listitem">
                            <a href="/general-terms" className="text-white">Conditions générales d'utilisation</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </footer>);
}
