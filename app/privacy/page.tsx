import "./privacy.css";

export const metadata = {
    title: "Politique de confidentialité | GéoEmploi",
    description: "Découvrez comment GéoEmploi collecte, utilise et protège vos données personnelles.",
};

export default function PrivacyPage() {
    return (
        <div className="flex flex-col flex-1 bg-zinc-50 font-sans bg-main-2">
            <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col bg-white px-6 py-12 text-black sm:px-10 lg:px-16">
                <article className="max-w-4xl text-base leading-7 sm:text-lg">
                    <header className="mb-10 border-b border-zinc-200 pb-8">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--main-color-1)]">GéoEmploi</p>
                        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Politique de confidentialité</h1>
                        <p className="mt-4 text-zinc-600">Dernière mise à jour : <time dateTime="2026-09-03">3 septembre 2026</time></p>
                    </header>
                    <p className="mb-8">
                        GéoEmploi protège vos données personnelles et les utilise uniquement pour faire fonctionner son service de mise en relation entre candidats et recruteurs. Cette politique explique quelles données sont traitées, pourquoi, avec qui elles peuvent être partagées et quels sont vos droits.
                    </p>
                    <section className="space-y-4 py-5">
                        <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">1. Responsable du traitement</h2>
                        <p>Le responsable du traitement est l&apos;éditeur de GéoEmploi. Pour toute question relative à vos données ou pour exercer vos droits, vous pouvez écrire à <a href="mailto:jeaneudes.berlier@gouv.fr" className="font-medium text-blue-700 underline hover:text-blue-900">jeaneudes.berlier@gouv.fr</a>.</p>
                    </section>
                    <section className="space-y-4 py-5">
                        <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">2. Données collectées</h2>
                        <p>Selon votre utilisation du service, GéoEmploi peut traiter :</p>
                        <ul className="list-disc space-y-2 pl-6">
                            <li>vos informations de compte : adresse e-mail, prénom, nom, rôle et date de création du compte ;</li>
                            <li>pour un candidat, les informations de profil, de disponibilité, de présentation, de compétences et d&apos;expériences professionnelles ;</li>
                            <li>pour un recruteur, les informations des offres publiées : intitulé, description, lieu et salaire éventuel ;</li>
                            <li>les informations liées aux candidatures et à leur statut ;</li>
                            <li>les données techniques strictement nécessaires au fonctionnement et à la sécurisation du site, notamment les informations de session.</li>
                        </ul>
                    </section>
                    <section className="space-y-4 py-5">
                        <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">3. Finalités et bases légales</h2>
                        <p>Ces données sont utilisées pour :</p>
                        <ul className="list-disc space-y-2 pl-6">
                            <li>créer et administrer votre compte et vous authentifier ;</li>
                            <li>publier, rechercher et gérer des offres d&apos;emploi ;</li>
                            <li>permettre le dépôt et le suivi des candidatures ;</li>
                            <li>sécuriser le service, prévenir les abus et administrer les comptes ;</li>
                            <li>répondre à vos demandes et respecter nos obligations légales.</li>
                        </ul>
                        <p>Le traitement repose principalement sur l&apos;exécution du service demandé, votre consentement lorsque celui-ci est requis et les obligations légales ou intérêts légitimes de l&apos;éditeur.</p>
                    </section>
                    <section className="space-y-4 py-5">
                        <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">4. Qui peut accéder aux données ?</h2>
                        <p>Vos données sont accessibles aux personnes autorisées qui administrent GéoEmploi et à ses prestataires techniques nécessaires à l&apos;hébergement ou au fonctionnement du service. Les informations d&apos;une candidature sont communiquées au recruteur concerné. Les offres publiées sont visibles conformément aux règles d&apos;accès de l&apos;application. GéoEmploi ne vend pas vos données et ne les utilise pas à des fins publicitaires.</p>
                    </section>
                    <section className="space-y-4 py-5">
                        <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">5. Sécurité et conservation</h2>
                        <p>Les mots de passe sont protégés par chiffrement irréversible et les accès sont contrôlés selon le rôle de chaque utilisateur. Nous prenons des mesures techniques et organisationnelles raisonnables pour empêcher l&apos;accès, la modification ou la divulgation non autorisés des données.</p>
                        <p>Les données sont conservées pendant la durée nécessaire aux finalités décrites ci-dessus, puis supprimées ou anonymisées, sous réserve des obligations légales et de la nécessité de conserver une preuve. Les durées précises peuvent dépendre du type de compte et de la relation concernée.</p>
                    </section>
                    <section className="space-y-4 py-5">
                        <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">6. Cookies</h2>
                        <p>GéoEmploi utilise les éléments techniques nécessaires à l&apos;authentification et au maintien de votre session. Aucun cookie publicitaire ou de suivi à des fins commerciales n&apos;est prévu par l&apos;application. Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines fonctionnalités pourraient alors ne plus fonctionner correctement.</p>
                    </section>
                    <section className="space-y-4 py-5">
                        <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">7. Vos droits</h2>
                        <p>Dans les conditions prévues par la réglementation, vous pouvez demander l&apos;accès à vos données, leur rectification, leur effacement, la limitation du traitement ou la portabilité de celles que vous avez fournies. Vous pouvez également vous opposer à certains traitements ou retirer votre consentement lorsqu&apos;il constitue leur fondement.</p>
                        <p>Pour exercer vos droits, envoyez votre demande à l&apos;adresse indiquée à la section 1 en précisant l&apos;adresse e-mail associée à votre compte. Vous pouvez également saisir la Commission nationale de l&apos;informatique et des libertés (CNIL) si vous estimez que vos droits ne sont pas respectés.</p>
                    </section>
                    <section className="space-y-4 py-5">
                        <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">8. Évolution de la politique</h2>
                        <p>Cette politique peut être mise à jour pour tenir compte des évolutions du service, de la réglementation ou de nos pratiques. La date de dernière mise à jour figure en tête de page. Nous vous invitons à la consulter régulièrement.</p>
                    </section>
                </article>
            </main>
        </div>
    );
}
