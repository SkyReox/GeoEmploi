import "./general-terms.css";

export const metadata = {
    title: "Conditions Générales d'Utilisation"
}

export default function Home() {
    return (
        <div className="flex flex-col flex-1 bg-zinc-50 font-sans bg-main-2">
            <main className="flex flex-1 w-full flex-col items-center justify-start py-16 px-16 bg-white bg-main-2 text-black text-[20px] sm:items-start">
                <h1 className="text-[50px] font-semibold">
                    Conditions Générales d'Utilisation
                </h1>
                <div className="py-8">
                    <p>
                        Bienvenue sur notre application ! En utilisant notre application, vous acceptez de respecter les présentes conditions générales d'utilisation. Veuillez lire attentivement ces conditions avant d'utiliser notre application. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre application.
                    </p>
                </div>
                <div className="py-8">
                    <h2 className="text-[30px] font-semibold">
                        Utilisation de l'application
                    </h2>
                    <p>
                        Vous vous engagez à utiliser notre application conformément à toutes les lois et réglementations applicables. Vous ne devez pas utiliser notre application à des fins illégales, nuisibles ou interdites par ces conditions générales d'utilisation.
                    </p>
                </div>
                <div className="py-8">
                    <h2 className="text-[30px] font-semibold">
                        Propriété intellectuelle
                    </h2>
                    <p>
                        Tous les droits de propriété intellectuelle liés à notre application, y compris les droits d'auteur, les marques commerciales et les brevets, sont la propriété de notre entreprise ou de nos concédants de licence. Vous ne devez pas copier, reproduire, distribuer ou créer des œuvres dérivées à partir de notre application sans notre autorisation écrite préalable.
                    </p>
                </div>
                <div className="py-8">
                    <h2 className="text-[30px] font-semibold">
                        Limitation de responsabilité
                    </h2>
                    <p>
                        Nous ne serons pas responsables des dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de l'utilisation ou de l'incapacité d'utiliser notre application. Vous utilisez notre application à vos propres risques.
                    </p>
                </div>
                <div className="py-8">
                    <h2 className="text-[30px] font-semibold">
                        Modifications des conditions générales d'utilisation
                    </h2>
                    <p>
                        Nous nous réservons le droit de modifier ces conditions générales d'utilisation à tout moment. Toute modification sera publiée sur cette page avec une date de révision mise à jour. Nous vous encourageons à consulter régulièrement ces conditions pour rester informé de vos droits et obligations lors de l'utilisation de notre application.
                    </p>
                </div>
                <div className="py-8">
                    <h2 className="text-[30px] font-semibold">
                        Contact
                    </h2>
                    <p>
                        Si vous avez des questions ou des préoccupations concernant nos conditions générales d'utilisation, veuillez nous contacter à l'adresse e-mail suivante : <a href="mailto:jeaueudes.berlier@gouv.fr" className="text-blue-500 hover:text-blue-700">jeaneudes.berlier@gouv.fr.</a>
                    </p>
                </div>
            </main>
        </div>
    );
}
