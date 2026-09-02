import "./general-terms.css";

export const metadata = {
    title: "Conditions Générales d'Utilisation"
}

export default function Home() {
    return (
        <div className="flex flex-col flex-1 bg-zinc-50 font-sans bg-main-2">
            <main className="flex flex-1 w-full flex-col items-center justify-start my-8 px-8 bg-white bg-main-2 text-black text-[20px] sm:items-start">
                <h1 className="text-[30px] font-semibold">
                    Conditions générales d'utilisation
                </h1>
                <div className="w-full p-8">
                    <ol role="list" className="list-decimal font-semibold">
                        <li role="listitem">
                            <div>
                                <p>
                                    Catégorie 1
                                </p>
                                <ol role="list" className="list-disc px-4">
                                    <li role="listitem">
                                        Règle 1
                                    </li>
                                    <li role="listitem">
                                        Règle 2
                                    </li>
                                    <li role="listitem">
                                        Règle 3
                                    </li>
                                </ol>
                            </div>
                        </li>
                        <br/>
                        <li role="listitem">
                            <div className="font-normal">
                                <p>
                                    Catégorie 2
                                </p>
                                <ol role="list" className="list-disc px-4">
                                    <li role="listitem">
                                        Règle 1
                                    </li>
                                    <li role="listitem">
                                        Règle 2
                                    </li>
                                    <li role="listitem">
                                        Règle 3
                                    </li>
                                </ol>
                            </div>
                        </li>
                        <br/>
                        <li role="listitem">
                            <div className="font-normal">
                                <p>
                                    Catégorie 3
                                </p>
                                <ol role="list" className="list-disc px-4">
                                    <li role="listitem">
                                        Règle 1
                                    </li>
                                    <li role="listitem">
                                        Règle 2
                                    </li>
                                    <li role="listitem">
                                        Règle 3
                                    </li>
                                </ol>
                            </div>
                        </li>
                    </ol>
                </div>
            </main>
        </div>
    );
}
