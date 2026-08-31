import Image from "next/image";

export default function HeaderComponent() {
    return (<header className="flex flex-col p-2 w-full bg-main-1">
        <nav className="flex justify-center">
            <div className="pe-lg flex gap-xs items-center justify-start">
                <Image
                    className="w-8"
                    src="/icon.jpg"
                    alt="GeoEmploi Icon"
                    width={100}
                    height={100}
                    objectFit="contain"
                    priority
                />
            </div>
            <div className="flex-1 pr-2 items-center flex justify-end">
                <a className="bg-white text-black p-1 rounded-[.5rem] hover:bg-gray-300 shadow-md" href="test">Sign up</a>
            </div>
            <div className="ps-lg gap-xs items-center flex justify-end">
                <a className="bg-white text-black p-1 rounded-[.5rem] hover:bg-gray-300 shadow-md" href="test">Sign in</a>
            </div>
        </nav>
    </header>);
}
