import Image from "next/image";

export default function FooterComponent() {
    return (<footer className="flex w-full justify-center p-2 bg-main-1">
        <nav className="flex w-[80%] justify-center">
            <div className="flex">
                <Image
                    className="h-full object-contain text-white text-[16px] flex items-center justify-center text-center"
                    src="/goat.png"
                    alt="Logo de l'entreprise JEB"
                    width={100}
                    height={100}
                    priority
                />
            </div>
            <div className="flex justify-start pl-[5%]">
                <div className="w-full max-w-[240px] mr-5">
                    <h3 className="font-sans text-md font-bold mb-1">Général</h3>
                    <ul role="list">
                        <li role="listitem">
                            <a href="/signup">S'inscrire</a>

                        </li>
                        <li role="listitem">
                            <a href="/assistance-clientele">Assistance clientèle</a>
                        </li>
                    </ul>
                </div>
                <div className="w-full max-w-[240px] mr-5">
                    <h3 className="font-sans text-md font-bold mb-1">Parcourir GéoEmploi</h3>
                    <ul role="list">
                        <li role="listitem">
                            <a href="/map">Carte interactive</a>
                        </li>
                    </ul>
                </div>
                <div className="w-full max-w-[240px] mr-5">
                    <h3 className="font-sans text-md font-bold mb-1">Législatif</h3>
                    <ul role="list">
                        <li role="listitem">
                            <a href="/general-terms">Conditions générales d'utilisation</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </footer>);
}
