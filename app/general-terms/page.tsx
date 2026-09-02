import "./general-terms.css";

export const metadata = {
    title: "Conditions Générales d'Utilisation"
}

export default function Home() {
    return (
        <div className="flex flex-col flex-1 bg-zinc-50 font-sans bg-main-2">
            <main className="flex flex-1 w-full flex-col items-center justify-start py-16 px-16 bg-white bg-main-2 text-black text-[20px] sm:items-start">
                <h1 className="text-[50px] font-semibold">
                    Conditions générales d'utilisation
                </h1>
                <div className="py-8">
                    <ol className="list-decimal font-semibold">
                        <li>
                            <div>
                                <p>
                                    Catégorie 1
                                </p>
                                <ol className="list-disc px-4">
                                    <li>
                                        Règle 1
                                    </li>
                                    <li>
                                        Règle 2
                                    </li>
                                    <li>
                                        Règle 3
                                    </li>
                                </ol>
                            </div>
                        </li>
                        <br/>
                        <li>
                            <div className="font-normal">
                                <p>
                                    Catégorie 2
                                </p>
                                <ol className="list-disc px-4">
                                    <li>
                                        Règle 1
                                    </li>
                                    <li>
                                        Règle 2
                                    </li>
                                    <li>
                                        Règle 3
                                    </li>
                                </ol>
                            </div>
                        </li>
                        <br/>
                        <li>
                            <div className="font-normal">
                                <p>
                                    Catégorie 3
                                </p>
                                <ol className="list-disc px-4">
                                    <li>
                                        Règle 1
                                    </li>
                                    <li>
                                        Règle 2
                                    </li>
                                    <li>
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
