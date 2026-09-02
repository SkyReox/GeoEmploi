import "./general-terms.css";

export const metadata = {
    title: "Conditions Générales d'Utilisation"
}

export default function Home() {
    return (
        <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden bg-zinc-50 font-sans bg-main-2">
            <main className="my-4 flex w-full min-w-0 flex-1 flex-col items-start justify-start bg-white px-4 text-base leading-relaxed text-black bg-main-2 sm:my-8 sm:px-8 sm:text-xl">
                <h1 className="max-w-4xl text-2xl font-semibold leading-tight sm:text-3xl">
                    Conditions générales d'utilisation
                </h1>
                <div className="w-full max-w-4xl py-6 sm:p-8">
                    <ol role="list" className="list-decimal mt-[1.5rem] pl-5 font-semibold sm:pl-6">
                        <li role="listitem">
                            <div>
                                <p>
                                    Catégorie 1
                                </p>
                                <ol role="list" className="list-disc pl-5 sm:pl-6">
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
                        <li role="listitem">
                            <div className="font-normal">
                                <p>
                                    Catégorie 2
                                </p>
                                <ol role="list" className="list-disc pl-5 sm:pl-6">
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
                        <li role="listitem">
                            <div className="font-normal">
                                <p>
                                    Catégorie 3
                                </p>
                                <ol role="list" className="list-disc pl-5 sm:pl-6">
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
