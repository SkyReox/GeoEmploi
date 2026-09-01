import Sidebar from "@/components/Sidebar";
import Map from "./components/Map/";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans bg-main-2">
      <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-white bg-main-2 sm:items-start">
        <h1 className="text-black text-[50px]">
          Bienvenue sur <span className="font-semibold">GéoEmploi</span>!
          <Map />
        </h1>
      </main>
    </div>
  );
}
