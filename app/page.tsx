import Image from "next/image";

export default function Home() {
    return (
        <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden bg-zinc-50 font-sans bg-main-2">
            <main className="my-4 flex w-full min-w-0 flex-1 flex-col items-center justify-start gap-8 bg-main-2 px-3 sm:my-8 sm:gap-12 sm:px-6">
                <section className="flex w-full max-w-6xl flex-col items-center gap-6 md:flex-row md:justify-between">
                    <div className="flex w-full min-w-0 justify-center md:w-1/2">
                        <h1 className="text-center text-2xl leading-tight text-black sm:text-4xl">
                            Bienvenue sur <span className="font-semibold">GéoEmploi</span>!
                        </h1>
                    </div>
                    <div className="flex w-full justify-center md:w-1/2">
                        <Image
                            className="h-auto w-1/2 max-w-48 bg-white text-black"
                            src="/thinking_man.svg"
                            alt="Image d'un homme qui pense devant un ordinateur"
                            aria-hidden="true"
                            width={100}
                            height={100}
                            priority
                        />
                    </div>
                </section>
                <section className="flex w-full flex-col items-center gap-8 bg-[#f3f2f0] px-4 py-8 md:flex-row md:justify-center md:px-8">
                    <div className="flex w-full min-w-0 justify-center md:w-1/2">
                        <div className="w-full max-w-xl">
                            <h2 className="text-2xl font-semibold leading-tight text-[#a01e02] sm:text-3xl">
                                Attrapez des offres d'emploi idéales!
                            </h2>
                            <p className="mt-4 text-base leading-relaxed text-black sm:text-xl sm:text-justify">Avec la fonctionnalité de <span className="italic">Carte Interactive</span>, vous pouvez retrouver facilement des offres d'emploi autour de vous ou dans une commune précise!</p>
                        </div>
                    </div>
                    <div className="flex w-full justify-center md:w-1/2">
                        <Image
                            className="h-auto w-1/2 max-w-56 bg-[#f3f2f0] text-black"
                            src="/fuentes.png"
                            alt="Image d'un profil utilisateur"
                            aria-hidden="true"
                            width={463}
                            height={463}
                            priority
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}
