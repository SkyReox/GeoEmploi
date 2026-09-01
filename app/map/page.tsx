import Map from "../components/Map"

export default function Home() {
    return (
        <div className="flex flex-col flex-1 bg-zinc-50 font-sans bg-main-2">
            <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-white bg-main-2 sm:items-start">
                <Map />
            </main>
        </div>
    );
}   