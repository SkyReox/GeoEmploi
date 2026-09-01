import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 bg-zinc-50 font-sans bg-main-2">
            <main className="flex flex-1 w-full flex-col items-center justify-start my-8 bg-main-2 sm:items-start">
                <div className="w-full flex items-center justify-between gap-[1rem]">
                    <div>
                        <h1 className="text-black text-[50px] p-20">
                            Bienvenue sur <span className="font-semibold">GéoEmploi</span>!
                        </h1>
                    </div>
                    <div className="items-center justify-center">
                        <div className="w-[80%] float-right">
                            <Image
                                className="w-[70%]"
                                src="/thinking_man.svg"
                                alt="Thinking Man"
                                width={100}
                                height={100}
                                priority
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full bg-[#f3f2f0] my-8 pbs-16 pbe-16 flex items-center justify-between gap-[1rem] p-20">
                    <div className="w-[50%]">
                        <h2 className="text-[#a01e02] text-[30px] font-semibold">
                            Attrapez des offres d'emploi idéales!
                        </h2>
                        <p className="text-black text-[22px] text-justify">Avec la fonctionnalité de <span className="italic">Carte Interactive</span>, vous pouvez retrouver facilement des offres d'emploi autour de vous ou dans une commune précise!</p>
                    </div>
                    <div className="flex justify-center">
                        <Image
                            className="w-[40%]"
                            src="/fuentes.png"
                            alt="Fuentes"
                            width={926}
                            height={926}
                            priority
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
