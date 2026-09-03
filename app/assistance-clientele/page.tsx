export const metadata = {
    title: "Assistance Clientèle"
}

export default function Home() {
    return (
        <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden bg-zinc-50 font-sans bg-main-2">
            <main className="flex w-full min-w-0 flex-1 flex-col items-start justify-start bg-white px-4 py-12 text-black bg-main-2 sm:px-8 sm:py-24 lg:px-16 lg:py-32">
                <h1 className="max-w-3xl text-2xl font-semibold leading-tight sm:text-3xl">
                    L'assistance clientèle est actuellement indisponible.
                </h1>
                <p className="max-w-3xl py-5 text-base leading-relaxed text-gray-600">
                    Veuillez réessayer dans quelques minutes.
                </p>
            </main>
        </div>
    );
}
