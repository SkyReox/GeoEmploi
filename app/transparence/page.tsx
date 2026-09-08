import Image from "next/image";

export default function Home() {
    return (
        <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden bg-zinc-50 font-sans bg-main-2">
            <main className="my-4 flex w-full min-w-0 flex-1 flex-col items-start justify-start gap-6 bg-main-2 px-3 sm:my-8 sm:gap-8 sm:px-6">
                <h1 className="max-w-4xl text-2xl text-nmalc font-semibold leading-tight sm:text-3xl">
                    Transparence
                </h1>
                <div className="w-full text-black text-lg max-w-4xl py-6 sm:p-8">
                    <p className="mt-3">
                        La publication d'offres d'emploi sur <span className="text-bold">GéoEmploi</span> est entièrement gratuite pour les employeurs.
                    </p>
                    <p className="mt-3">
                        La localisation de chaque utilisateur n'est pas enregistrée en base de données afin que toute information personnelle reste confidentielle, même en cas d'attaque du site.
                    </p>
                    <p className="mt-3">
                        Les données personnelles et offres d'emploi ne sont conservées que jusqu'à <span className="text-bold">30 jours</span>. Au-delà de cette période, les données sont supprimées.
                    </p>
                    <p className="mt-6">
                        En cas de problème, veuillez envoyer un mail au contact suivant: <span className="text-blue-500">gael.simonet@gmail.com</span>
                    </p>
                </div>
            </main>
        </div>
    );
}
