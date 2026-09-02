import "./privacy.css";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 bg-zinc-50 font-sans bg-main-2">
            <main className="flex flex-1 w-full flex-col items-center justify-start py-16 px-16 bg-white bg-main-2 text-black text-[20px] sm:items-start">
                <h1 className="text-[50px] font-semibold">
                    Politique de confidentialité
                </h1>
                <div className="py-8">
                    <p>
                        Nous nous engageons à protéger votre vie privée et à garantir la sécurité de vos informations personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données lorsque vous utilisez notre application.
                    </p>
                </div>
                <div className="py-8">
                    <h2 className="text-[30px] font-semibold">
                        Collecte des informations
                    </h2>
                    <p>
                        Nous collectons uniquement les informations nécessaires pour fournir nos services. Cela peut inclure votre nom, votre adresse e-mail et d'autres informations que vous choisissez de nous fournir volontairement.
                    </p>
                </div>
                <div className="py-8">
                    <h2 className="text-[30px] font-semibold">
                        Utilisation des informations
                    </h2>
                    <p>
                        Les informations que nous collectons sont utilisées pour améliorer nos services, personnaliser votre expérience et vous fournir des mises à jour importantes. Nous ne vendons ni ne partageons vos informations personnelles avec des tiers à des fins commerciales.
                    </p>
                </div>
                <div className="py-8">
                    <h2 className="text-[30px] font-semibold">
                        Sécurité des données
                    </h2>
                    <p>
                        Nous mettons en place des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès non autorisé, toute divulgation ou toute altération. Cependant, veuillez noter qu'aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée.
                    </p>
                </div>
                <div className="py-8">
                    <h2 className="text-[30px] font-semibold">
                        Cookies et technologies similaires
                    </h2>
                    <p>
                        Nous utilisons des cookies et d'autres technologies similaires pour améliorer votre expérience sur notre application. Vous pouvez gérer vos préférences en matière de cookies dans les paramètres de votre navigateur.
                    </p>
                </div>
                <div className="py-8">
                    <h2 className="text-[30px] font-semibold">
                        Modifications de la politique de confidentialité
                    </h2>
                    <p>
                        Nous nous réservons le droit de mettre à jour cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une date de révision mise à jour. Nous vous encourageons à consulter régulièrement cette politique pour rester informé de la manière dont nous protégeons vos informations.
                    </p>
                </div>
                <div className="py-8">
                    <h2 className="text-[30px] font-semibold">
                        Contact
                    </h2>
                    <p>
                        Si vous avez des questions ou des préoccupations concernant notre politique de confidentialité, veuillez nous contacter à l'adresse e-mail suivante : <a href="mailto:jeadeudes.berlier@gouv.fr" className="text-blue-500 hover:text-blue-700">jeaneudes.berlier@gouv.fr</a>.
                    </p>
                </div>
            </main>
        </div>
    );
}
