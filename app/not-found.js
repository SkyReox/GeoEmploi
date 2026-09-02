export default function Custom404() {
    return (
        <div className="flex flex-col flex-1 bg-zinc-50 font-sans bg-main-2">
            <main className="flex flex-1 w-full flex-col items-center justify-start my-32 bg-main-2">
                <div className="w-[40%] text-center text-black">
                    <h1 className="text-[50px]">
                        Erreur 404
                    </h1>
                    <h2 className="text-[30px]">
                        Impossible de trouver cette page
                    </h2>
                    <p className="text-[16px] text-gray-600">
                        Nous ne trouvons pas la page que vous recherchez. Essayez de retourner à la page précédente ou consultez notre <a className="text-blue-500 font-semibold" href="/assistance-clientele">assistance clientèle</a> pour plus d'informations.
                    </p>
                </div>
            </main>
        </div>
    );
}
