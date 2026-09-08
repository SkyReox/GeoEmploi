import Image from "next/image";

export default function Home() {
    return (
        <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden bg-zinc-50 font-sans bg-main-2">
            <main className="my-4 flex w-full min-w-0 flex-1 flex-col items-start justify-start gap-6 bg-main-2 px-3 sm:my-8 sm:gap-8 sm:px-6">
                <h1 className="max-w-4xl text-2xl text-nmalc font-semibold leading-tight sm:text-3xl">
                    Journal des modifications
                </h1>
                <ol role="list" className="w-full text-black text-lg max-w-4xl py-6 sm:p-8">
                    <li role="listitem">
                        <h4 className="text-2xl font-semibold">
                            8 Septembre 2026
                        </h4>
                        <ul role="list" className="list-disc pl-8">
                            <li role="listitem">
                                Ajout du journal des modifications. Sur instruction de <span className="font-semibold">Florine Pontaillac</span>.
                            </li>
                            <li role="listitem">
                                Ajout de la page de <a href="/transparence" className="text-blue-500 hover:text-blue-800 underline">Transparence</a>. Sur instruction de <span className="font-semibold">Florine Pontaillac</span>.
                            </li>
                        </ul>
                    </li>
                </ol>
            </main>
        </div>
    );
}
