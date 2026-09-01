import Image from "next/image";

export default function FooterComponent() {
    return (<footer className="flex flex-col p-2 w-full bg-main-1">
        <nav className="flex justify-center">
            <div className="flex pl-[15%]">
                <Image
                    className="h-full object-contain"
                    src="/icon.png"
                    alt="GeoEmploi Icon"
                    width={100}
                    height={100}
                    priority
                />
            </div>
            <div className="w-full flex justify-start pl-[5%] babybear:flex-col babybear:flex-wrap babybear:mt-3 babybear:pl-0">
                <div className="w-full max-w-[240px] mr-3">
                    <h3 className="font-sans text-md font-bold text-color-text leading-regular mb-1 babybear:max-w-full babybear:my-1">Général</h3>
                    <ul>
                        <li>
                            <a href="/test">S'inscrire</a>
                        </li>
                        <li>
                            <a href="/je-suis-admin">Assistance clientèle</a>
                        </li>
                    </ul>
                </div>
                <div className="w-full max-w-[240px] mr-3">
                    <h3 className="font-sans text-md font-bold text-color-text leading-regular mb-1 babybear:max-w-full babybear:my-1">Parcourir ChomageGo</h3>
                    <ul>
                        <li>
                            <a href="/map">Carte interactive</a>
                        </li>
                    </ul>
                </div>
                <div className="w-full max-w-[240px] mr-3">
                    <h3 className="font-sans text-md font-bold text-color-text leading-regular mb-1 babybear:max-w-full babybear:my-1">Législatif</h3>
                    <ul>
                        <li>
                            <a href="/general-terms">Conditions générales d'utilisation</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </footer>);
}
