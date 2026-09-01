import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 bg-zinc-50 font-sans bg-main-2">
            <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-white bg-main-2 sm:items-start">
                <div className="w-full">
                    <div className="float-left inline-block">
                        <h1 className="text-black text-[50px]">
                            Bienvenue sur <span className="font-semibold">ChomageGo</span>!
                        </h1>
                    </div>
                    <div className="float-right items-center justify-center inline-block w-[60%]">
                        <div className="w-[80%] float-right">
                            <Image
                                className="w-[50%]"
                                src="/thinking_man.svg"
                                alt="Thinking Man"
                                width={100}
                                height={100}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
