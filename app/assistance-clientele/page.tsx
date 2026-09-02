export default function Home() {
    return (
        <div className="flex flex-col flex-1 bg-zinc-50 font-sans bg-main-2">
            <main className="flex flex-1 text-black w-full flex-col items-center justify-start py-32 px-16 bg-white bg-main-2 sm:items-start">
                <h1 className="text-[30px] font-semibold">
                    L'assistance clientèle est actuellement indisponible.
                </h1>
                <p className="text-[16px] text-gray-600 py-5">
                    Veuillez réessayer dans quelques minutes.
                </p>
            </main>
        </div>
    );
}
