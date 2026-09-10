import "./general-terms.css";

export const metadata = {
    title: "Conditions Générales d'Utilisation"
}

export default function Home() {
    return (
        <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden bg-zinc-50 font-sans bg-main-2">
            <main className="my-4 flex w-full min-w-0 flex-1 flex-col items-start justify-start bg-white px-4 text-base leading-relaxed text-black bg-main-2 sm:my-8 sm:px-8 sm:text-xl">
                <h1 className="max-w-4xl text-2xl font-semibold leading-tight sm:text-3xl">
                    Conditions générales d'utilisation
                </h1>

                <div className="w-full max-w-4xl py-6 sm:p-8">
                    <p className="mb-6 text-base font-normal sm:text-lg">
                        Version provisoire — soumise à validation préalable du service juridique
                    </p>
                    <p className="mb-8 text-base font-normal sm:text-lg">
                        Dernière mise à jour : 04/09/2026
                    </p>

                    <h2 className="mb-4 text-xl font-semibold sm:text-2xl">Sommaire</h2>
                    <ol className="mb-8 list-decimal pl-6 font-normal">
                        <li>Objet</li>
                        <li>Définitions</li>
                        <li>Accès au Service</li>
                        <li>Profil du Demandeur d’emploi</li>
                        <li>Recherche et consultation des offres</li>
                        <li>Candidatures</li>
                        <li>Utilisation de la localisation</li>
                        <li>Publication d’offres par les employeurs</li>
                        <li>Gestion des candidatures par les employeurs</li>
                        <li>Responsabilité relative aux offres</li>
                        <li>Utilisation loyale du service</li>
                        <li>Suspension ou suppression d’un Compte</li>
                        <li>Protection des données personnelles</li>
                        <li>Propriété intellectuelle</li>
                        <li>Disponibilité du Service</li>
                        <li>Évolution du Service</li>
                        <li>Entrée en vigueur et modification des CGU</li>
                        <li>Droit applicable</li>
                        <li>Contact</li>
                    </ol>

                    <section className="space-y-8 font-normal">
                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">1. Objet</h2>
                            <p>
                                Les présentes Conditions Générales d’Utilisation (ci-après les « CGU »)
                                définissent les conditions d’accès et d’utilisation du service numérique
                                GéoEmploi (ci-après le « Service »).
                            </p>
                            <p className="mt-3">
                                GéoEmploi est un service numérique destiné à faciliter la mise en relation
                                entre les demandeurs d’emploi et les employeurs sur le territoire national.
                            </p>
                            <p className="mt-3">
                                Le Service permet, selon les fonctionnalités effectivement disponibles au
                                moment de son utilisation, de consulter des offres d’emploi, de rechercher
                                des offres selon leur localisation, de transmettre une candidature et d’en
                                suivre l’état.
                            </p>
                            <p className="mt-3">
                                GéoEmploi complète les dispositifs existants du service public de l’emploi
                                et ne se substitue pas à ceux-ci.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">2. Définitions</h2>
                            <p>Au sens des présentes CGU :</p>
                            <ul className="mt-3 list-disc space-y-2 pl-6">
                                <li>« Utilisateur » désigne toute personne accédant au Service ;</li>
                                <li>« Demandeur d’emploi » désigne un Utilisateur utilisant le Service afin de rechercher des opportunités professionnelles et, le cas échéant, de déposer des candidatures ;</li>
                                <li>« Employeur » désigne une personne physique ou morale utilisant le Service afin de publier et gérer des offres d’emploi et de recevoir des candidatures ;</li>
                                <li>« Offre » désigne une annonce d’emploi publiée sur le Service ;</li>
                                <li>« Compte » désigne l’espace personnel permettant à un Utilisateur enregistré d’accéder aux fonctionnalités qui lui sont réservées.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">3. Accès au Service</h2>
                            <p>La consultation des offres disponibles peut être effectuée sans création de compte.</p>
                            <p className="mt-3">La création d’un Compte est nécessaire pour accéder aux fonctionnalités réservées aux utilisateurs enregistrés.</p>
                            <p className="mt-3">L’Utilisateur s’engage à fournir des informations exactes, à jour et nécessaires à l’utilisation du Service.</p>
                            <p className="mt-3">L’Utilisateur est responsable de la confidentialité de ses identifiants et de toute utilisation effectuée depuis son Compte.</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">4. Profil du demandeur d’emploi</h2>
                            <p>Le Demandeur d’emploi peut créer et gérer un profil professionnel comprenant notamment, lorsqu’il choisit de les renseigner :</p>
                            <ul className="mt-3 list-disc space-y-2 pl-6">
                                <li>ses compétences ;</li>
                                <li>ses expériences professionnelles ;</li>
                                <li>sa disponibilité ;</li>
                                <li>sa biographie ;</li>
                            </ul>
                            <p className="mt-3">Les informations renseignées dans le profil peuvent être utilisées dans le cadre du processus de candidature.</p>
                            <p className="mt-3">Le Demandeur d’emploi est responsable de l’exactitude des informations qu’il renseigne.</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">5. Recherche et consultation des offres</h2>
                            <p>Le Service permet au Demandeur d’emploi de rechercher et de consulter des offres d’emploi.</p>
                            <p className="mt-3">Les offres peuvent être présentées sur une carte interactive et classées ou affichées selon leur localisation.</p>
                            <p className="mt-3">La localisation affichée correspond à la précision effectivement utilisée par le Service.</p>
                            <p className="mt-3">Lorsque le Service utilise la position géographique de l’Utilisateur, celui-ci est informé de ce traitement et peut refuser ou retirer son consentement conformément aux modalités prévues par le Service.</p>
                            <p className="mt-3">Le refus de la géolocalisation ne fait pas obstacle à l’utilisation des fonctionnalités du Service qui ne nécessitent pas cette donnée.</p>
                            <p className="mt-3">L’Utilisateur peut notamment renseigner manuellement une commune afin de rechercher des offres à partir de cette localisation, lorsque cette fonctionnalité est disponible.</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">6. Candidatures</h2>
                            <p>Le Demandeur d’emploi peut, lorsque l’Offre concernée le permet, transmettre une candidature directement depuis le Service.</p>
                            <p className="mt-3">La candidature peut entraîner la transmission à l’Employeur des informations du profil nécessaires au traitement de celle-ci.</p>
                            <p className="mt-3">Avant l’envoi d’une candidature, l’Utilisateur est informé des informations transmises.</p>
                            <p className="mt-3">Le Demandeur d’emploi peut consulter le statut de ses candidatures depuis son espace personnel, lorsque cette fonctionnalité est disponible.</p>
                            <p className="mt-3">Le dépôt d’une candidature ne garantit ni la réception d’une réponse ni l’obtention d’un emploi.</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">7. Utilisation de la localisation</h2>
                            <p>Certaines fonctionnalités du Service peuvent utiliser la localisation de l’Utilisateur afin de permettre la recherche d’offres à proximité.</p>
                            <p className="mt-3">L’utilisation de la localisation est soumise aux modalités de consentement et d’information applicables.</p>
                            <p className="mt-3">L’Utilisateur peut retirer son consentement à tout moment.</p>
                            <p className="mt-3">Le retrait du consentement à la géolocalisation ne peut entraîner la suppression de son Compte, de son profil ou de ses candidatures en cours.</p>
                            <p className="mt-3">Lorsque la localisation n’est pas disponible ou n’est pas autorisée, le Service utilise, lorsqu’elle est disponible, la localisation saisie manuellement par l’Utilisateur.</p>
                            <p className="mt-3">Les modalités précises de collecte, d’utilisation, de conservation et de suppression des données de localisation sont détaillées dans la politique de protection des données applicable au Service.</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">8. Publication d’offres par les employeurs</h2>
                            <p>L’Employeur peut publier des offres d’emploi sur le Service, sous réserve de disposer d’un Compte employeur et, lorsque cela est applicable, d’avoir satisfait aux procédures de vérification prévues par le Service.</p>
                            <p className="mt-3">Une Offre doit contenir des informations exactes, loyales et suffisamment précises concernant notamment le poste proposé et sa localisation.</p>
                            <p className="mt-3">L’Employeur demeure seul responsable du contenu des Offres qu’il publie.</p>
                            <p className="mt-3">Il lui appartient notamment de s’assurer que ses annonces respectent les dispositions légales et réglementaires applicables.</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">9. Gestion des candidatures par les employeurs</h2>
                            <p>L’Employeur peut recevoir et gérer les candidatures transmises à ses Offres.</p>
                            <p className="mt-3">Lorsque ces fonctionnalités sont disponibles, il peut notamment consulter les candidatures reçues, modifier leur statut et prendre contact avec les candidats.</p>
                            <p className="mt-3">Les données relatives aux candidats doivent être utilisées exclusivement dans le cadre du recrutement concerné et conformément aux obligations applicables en matière de protection des données personnelles.</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">10. Responsabilité relative aux offres</h2>
                            <p>Les Offres sont publiées sous la responsabilité des Employeurs qui en sont à l’origine.</p>
                            <p className="mt-3">GéoEmploi n’est pas responsable de l’exactitude, de la licéité, de la disponibilité ou de la qualité des informations contenues dans les Offres publiées par les Employeurs.</p>
                            <p className="mt-3">Tout Utilisateur peut signaler une Offre qu’il estime frauduleuse, trompeuse, illégale ou contraire aux règles d’utilisation du Service, au moyen du dispositif de signalement prévu à cet effet.</p>
                            <p className="mt-3">GéoEmploi peut prendre les mesures appropriées à la suite d’un signalement, notamment procéder au retrait d’une Offre ou à la suspension d’un Compte lorsque les conditions applicables sont réunies.</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">11. Utilisation loyale du Service</h2>
                            <p>L’Utilisateur s’engage à utiliser le Service conformément aux présentes CGU et aux lois et règlements applicables.</p>
                            <p className="mt-3">Il lui est notamment interdit :</p>
                            <ul className="mt-3 list-disc space-y-2 pl-6">
                                <li>de fournir volontairement des informations fausses ou trompeuses ;</li>
                                <li>d’utiliser le Service à des fins frauduleuses ;</li>
                                <li>de publier des contenus illicites, discriminatoires, diffamatoires ou trompeurs ;</li>
                                <li>de porter atteinte au fonctionnement ou à la sécurité du Service ;</li>
                                <li>d’utiliser le Service pour collecter ou exploiter les données d’autres Utilisateurs à des fins étrangères à son fonctionnement.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">12. Suspension ou suppression d’un Compte</h2>
                            <p>En cas de manquement aux présentes CGU ou aux dispositions légales applicables, le Compte d’un Utilisateur peut être suspendu ou supprimé dans les conditions prévues par les règles applicables au Service.</p>
                            <p className="mt-3">Lorsque cela est nécessaire, une Offre peut également être retirée.</p>
                            <p className="mt-3">Les mesures prises doivent être proportionnées à la nature et à la gravité du manquement concerné.</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">13. Protection des données personnelles</h2>
                            <p>Les données personnelles traitées dans le cadre du Service font l’objet d’une information spécifique conformément à la réglementation applicable en matière de protection des données personnelles.</p>
                            <p className="mt-3">Cette information précise notamment les finalités des traitements, leurs bases légales, les durées de conservation, les destinataires des données ainsi que les droits des personnes concernées.</p>
                            <p className="mt-3">La politique de confidentialité est accessible à l’adresse suivante : chomage-go.job-et-bonheur.fr/privacy</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">14. Propriété intellectuelle</h2>
                            <p>Les éléments composant le Service, notamment son interface, sa structure, ses logiciels, ses contenus et ses éléments graphiques, sont protégés par les dispositions applicables en matière de propriété intellectuelle.</p>
                            <p className="mt-3">Sauf disposition contraire, l’utilisation du Service n’emporte aucun transfert de droit de propriété intellectuelle au bénéfice de l’Utilisateur.</p>
                            <p className="mt-3">Les contenus publiés par les Utilisateurs restent soumis aux droits dont ils disposent sur ceux-ci, sous réserve des droits nécessaires à leur hébergement et à leur affichage dans le cadre du fonctionnement du Service.</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">15. Disponibilité du Service</h2>
                            <p>Le Service est accessible sous réserve de sa disponibilité technique.</p>
                            <p className="mt-3">Des interruptions peuvent notamment intervenir pour des raisons de maintenance, de mise à jour, de sécurité ou en cas d’événement indépendant de la volonté de l’éditeur.</p>
                            <p className="mt-3">Les éventuelles indisponibilités ne donnent pas automatiquement droit à une indemnisation.</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">16. Évolution du Service</h2>
                            <p>Le Service peut évoluer afin d'améliorer son fonctionnement, son accessibilité ou ses fonctionnalités.</p>
                            <p className="mt-3">Les présentes CGU sont mises à jour lorsque les fonctionnalités ou les conditions d’utilisation du Service évoluent.</p>
                            <p className="mt-3">Aucune fonctionnalité non effectivement disponible dans le Service ne doit être considérée comme garantie par les présentes CGU.</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">17. Entrée en vigueur et modification des CGU</h2>
                            <p>Les présentes CGU entrent en vigueur à compter de leur publication.</p>
                            <p className="mt-3">Toute modification substantielle des CGU fait l’objet d’une information appropriée des Utilisateurs.</p>
                            <p className="mt-3">La version applicable est celle en vigueur au moment de l’utilisation du Service.</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">18. Droit applicable</h2>
                            <p>Les présentes CGU sont soumises au droit français.</p>
                            <p className="mt-3">Tout litige relatif à leur interprétation ou à leur exécution est traité conformément aux règles de compétence applicables.</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold sm:text-2xl">19. Contact</h2>
                            <p>Pour toute question concernant le fonctionnement du Service ou les présentes CGU, l’Utilisateur peut contacter :</p>
                            <ul className="mt-3 list-disc pl-6">
                                <li>[Nom du service]</li>
                                <li>[Adresse électronique]</li>
                                <li>[Adresse postale, le cas échéant]</li>
                            </ul>
                        </section>
                    </section>
                </div>
            </main>
        </div>
    );
}
