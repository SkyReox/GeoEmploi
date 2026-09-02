import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 bg-zinc-50 font-sans bg-main-2">
            <main className="flex flex-1 w-full flex-col items-center justify-start bg-main-2 my-8 sm:items-start">
                <div className="w-full flex items-center justify-between gap-[1rem]">
                    <div className="flex flex-1 justify-center items-center w-[50%] min-w-[320px]">
                        <h1 className="text-black text-[36px] text-center">
                            Bienvenue sur <span className="font-semibold">GéoEmploi</span>!
                        </h1>
                    </div>
                    <div className="w-[50%] flex justify-center">
                        <Image
                            className="w-[60%] bg-white text-black text-[18px] flex justify-center items-center"
                            src="/thinking_man.svg"
                            alt="Image d'un homme qui pense devant un ordinateur"
                            aria-hidden="true"
                            width={100}
                            height={100}
                            priority
                        />
                    </div>
                </div>
                <div className="w-full bg-[#f3f2f0] pbs-8 pbe-8 my-8 flex items-center justify-between gap-[1rem]">
                    <div className="flex w-[50%] min-w-[320px] items-center justify-center">
                        <div className="w-[75%]">
                            <h2 className="text-[#a01e02] text-[30px] font-semibold">
                                Attrapez des offres d'emploi idéales!
                            </h2>
                            <p className="text-black text-[22px] text-justify">Avec la fonctionnalité de <span className="italic">Carte Interactive</span>, vous pouvez retrouver facilement des offres d'emploi autour de vous ou dans une commune précise!</p>
                        </div>
                    </div>
                    <div className="flex w-[50%] justify-center">
                        <Image
                            className="w-[50%] bg-[#f3f2f0] text-black flex items-center justify-center text-[18px]"
                            src="/fuentes.png"
                            alt="Image d'un profil utilisateur"
                            aria-hidden="true"
                            width={463}
                            height={463}
                            priority
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
