'use client'

export default function Error({ statusCode, message }) {
    return (
        <div className="flex flex-col flex-1 bg-zinc-50 font-sans bg-main-2">
            <main className="flex flex-1 w-full flex-col items-center justify-start my-32 bg-main-2">
                <div className="w-[40%] text-center text-black">
                    <h1 className="text-[50px]">
                        Erreur {statusCode ? statusCode : 500}
                    </h1>
                    <h2 className="text-[30px]">
                        Erreur serveur
                    </h2>
                    <p className="text-[16px] text-gray-600">
                        Le serveur a rencontré une erreur interne ou une mauvaise configuration et n'a pas pu traiter votre demande.
                    </p>
                    <p className="text-[16px] text-gray-600">
                        {message ? message: ""}
                    </p>
                </div>
            </main>
        </div>
    );
}
