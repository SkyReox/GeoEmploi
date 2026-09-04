# Fiche de registre RGPD - GeoEmploi

**Version :** 0.1
**Date de rédaction :** 04/09/2026  
**Périmètre :** application web GeoEmploi et son API  
**Statut :** En cours de développement


## 1. Identification du traitement

| Élément | Description |
| --- | --- |
| Nom du traitement | Mise en relation entre candidats et recruteurs autour d'offres d'emploi |
| Responsable du traitement | **À compléter** : organisme, adresse et contact |
| Finalité principale | Publier, rechercher et administrer des offres d'emploi ; permettre aux candidats de créer un profil et de déposer des candidatures |
| Personnes concernées | Candidats, recruteurs ou déposants d'offres, administrateurs |
| Base légale | **À valider** : exécution de mesures précontractuelles ou du service demandé pour les comptes, offres et candidatures ; obligation légale ou intérêt légitime pour l'administration et la sécurité selon le contexte |
| Type de traitement | Collecte, enregistrement, consultation, modification, mise en relation, modération, suppression et géocodage d'adresses |
| Date de mise à jour | 04/09/2026 |

## 2. Données traitées

### Données d'identification et de compte

- adresse e-mail ;
- prénom et nom ;
- identifiant technique du compte ;
- rôle du compte : candidat, recruteur ou administrateur ;
- état du compte : actif ou banni ;
- dates de création et de mise à jour ;
- mot de passe sous forme hachée. Le mot de passe en clair n'est pas destiné à être conservé.

### Données de profil candidat

- biographie ;
- disponibilité et date de disponibilité ;
- compétences ;
- expériences : intitulé, entreprise, dates et description.

### Données relatives aux offres

- titre et description de l'offre ;
- lieu ;
- coordonnées latitude/longitude issues du géocodage du lieu ;
- salaire, lorsqu'il est renseigné ;
- statut de l'offre et dates de création/mise à jour ;
- identifiant du recruteur déposant.

### Données relatives aux candidatures

- identifiants de l'offre et du candidat ;
- statut de la candidature ;
- dates de création et de mise à jour.

### Données techniques et de sécurité

- données nécessaires à l'authentification et à la session ;
- journaux techniques et erreurs, selon la configuration de l'hébergement : **à documenter** ;
- adresse IP, user-agent et cookies éventuels : **à confirmer dans la configuration de production**.

## 3. Sources et caractère obligatoire

| Source | Données fournies | Caractère |
| --- | --- | --- |
| Personne concernée | Compte, profil, offre ou candidature | Les champs obligatoires sont à préciser dans les formulaires et validations |
| Administrateur | Modération des comptes et des offres | Nécessaire à l'administration du service |
| Service Adresse de la Base Adresse Nationale | Coordonnées correspondant au lieu transmis pour une offre | Appel externe déclenché lors de la création d'une offre |

Le défaut de fourniture des données nécessaires empêche la création du compte, la publication de l'offre ou le dépôt de la candidature concernée.

## 4. Destinataires et sous-traitants

| Destinataire | Accès ou rôle | Localisation / garanties |
| --- | --- | --- |
| Équipe habilitée GeoEmploi | Administration, modération et support | **À compléter** |
| Autres utilisateurs de la plateforme | Données rendues visibles par les écrans publics, notamment les offres approuvées | Accès applicatif selon le rôle |
| Hébergeur de l'application | Hébergement de l'application et de la base PostgreSQL | **À compléter** : prestataire, pays, contrat et garanties |
| API Adresse (`api-adresse.data.gouv.fr`) | Géocodage du lieu saisi lors de la création d'une offre | Service public français ; vérifier les conditions applicables et les données transmises |

Les candidatures et les profils candidats ne doivent être accessibles qu'aux personnes et rôles prévus par les règles métier. La liste exacte des accès doit être validée avant production.

## 5. Durées de conservation

Les durées ci-dessous sont des durées cibles à valider et à implémenter dans une politique de purge documentée.

| Données | Durée proposée | Point de départ | Sort final |
| --- | --- | --- | --- |
| Compte et profil actif | Durée d'utilisation du service | Dernière activité ou clôture | Suppression ou anonymisation |
| Compte clôturé | **À valider**, par exemple 3 ans maximum en l'absence d'obligation contraire | Demande de clôture | Suppression, sauf preuve nécessaire à conserver |
| Offre publiée et candidature | Durée nécessaire à la mise en relation, puis durée d'archivage à définir | Clôture de l'offre ou fin du processus | Suppression ou anonymisation |
| Données nécessaires à la preuve d'un droit | Durée de prescription applicable | Fin de la relation | Accès restreint puis suppression |
| Sessions et journaux de sécurité | **À définir selon l'hébergeur et la politique de sécurité** | Émission du journal | Suppression automatique |
| Mot de passe | Tant que le compte existe | Mise à jour du mot de passe | Suppression avec le compte |

Le projet dispose de suppressions applicatives de comptes, offres, expériences, compétences et candidatures. Il reste à vérifier qu'une suppression de compte entraîne la purge ou l'anonymisation de toutes les données associées et des sauvegardes.

## 6. Mesures de sécurité

Mesures observées dans le projet :

- contrôle d'accès par authentification et rôles (`SEEKER`, `GIVER`, `ADMIN`) ;
- vérification des droits sur les routes d'API ;
- mots de passe hachés avec `bcrypt` ;
- sessions Auth.js en JWT ;
- validation des entrées avec Zod sur les principaux formulaires API ;
- identifiants techniques non séquentiels (`cuid`) ;
- variables sensibles prévues dans `.env` et exclues du versionnement ;
- base de données PostgreSQL isolée par Docker en développement.

Mesures à vérifier ou compléter avant production :

- chiffrement TLS obligatoire entre le navigateur, l'application et les services ;
- gestion, rotation et stockage sécurisé de `AUTH_SECRET` et `DATABASE_URL` ;
- sauvegardes chiffrées, tests de restauration et limitation de leur durée ;
- limitation des tentatives de connexion et protection contre l'abus des API ;
- journalisation des accès administrateurs et surveillance des erreurs ;
- revue des droits d'accès aux profils et candidatures ;
- procédure de gestion des violations de données ;
- suppression des identifiants et mots de passe de démonstration avant production ;
- tests de suppression, export et rectification des données.

## 7. Droits des personnes

Les personnes doivent pouvoir exercer, selon le contexte, leurs droits d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité.

| Droit | Modalité à prévoir |
| --- | --- |
| Accès | Demande auprès du contact du responsable du traitement |
| Rectification | Modification du profil ou demande au support |
| Effacement | Suppression du compte et de ses données, sous réserve des obligations de conservation |
| Opposition / limitation | Demande auprès du contact du responsable du traitement |
| Réclamation | Coordonnées de l'autorité de contrôle à afficher : **à compléter** |


## 8. Transferts et analyse d'impact

- Le géocodage transmet au service Adresse le lieu saisi pour une offre, via le site officiel du gouvernement "data.gouv".
- Les transferts éventuels liés à l'hébergement, aux sauvegardes, aux e-mails ou à la supervision sont **à inventorier**.
- Une analyse d'impact relative à la protection des données (AIPD) est **à évaluer**, mais les données pour l'instant utilisé sont d'une importance négligeable.

## 9. Documents et actions à conserver

- politique de confidentialité et mentions légales ;
- conditions d'utilisation et règles de modération ;
- contrats ou accords avec les sous-traitants ;
- politique de conservation et procédure de purge ;
- procédure d'exercice des droits ;
- procédure de violation de données ;
- registre des habilitations ;
- résultats des tests de sécurité, de sauvegarde et de restauration ;
- décision documentée concernant l'AIPD.

## 10. Validation

| Rôle | Nom | Date | Signature / validation |
| --- | --- | --- | --- |
| Responsable du traitement | Simonet Gaël | 04/09/2026 | GS |
| Référent protection des données / DPO | Cazayus Mathieu| 04/09/2026 | MC |
| Responsable technique | Glize Yanis | 04/09/2026 | YG |