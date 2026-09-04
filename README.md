# GeoEmploi

Application Next.js de mise en relation autour de l'emploi. Elle utilise PostgreSQL via Prisma et Auth.js pour l'authentification.

## Prérequis

- Node.js 22 (ou une version LTS compatible)
- npm
- Docker et Docker Compose

## Installation et lancement local

Installez les dépendances:

```bash
npm install
```

Créez le fichier `.env` à la racine du projet avec l'URL de la base locale:

```env
DATABASE_URL="postgresql://geo_emploi:geo_emploi_dev@localhost:5432/geo_emploi"
```

Générez ensuite le secret Auth.js:

```bash
npx auth secret
```

Cette commande affiche deux variables. Copiez leurs valeurs dans `.env` en renommant la variable `BETTER_AUTH_SECRET` en `AUTH_SECRET`:

```env
AUTH_SECRET="votre_secret_genere"
```

Ne versionnez jamais ce secret. Le fichier `.env` est déjà ignoré par Git.

Démarrez PostgreSQL puis l'application, dans deux terminaux distincts:

```bash
docker-compose up
```

```bash
npm run dev
```

Au premier lancement (et après une modification de `prisma/schema.prisma`), synchronisez le schéma et créez les données de démonstration:

```bash
npx prisma db push
npx prisma db seed
```

L'application est disponible sur [http://localhost:3000](http://localhost:3000). Le compte administrateur créé par le seed est `admin@geo-emploi.com` avec le mot de passe `changeme123` ; changez-le après la première connexion.

Pour arrêter la base de données, utilisez `docker-compose down`. Ajoutez `-v` uniquement si vous souhaitez aussi supprimer les données PostgreSQL locales.

## Scripts utiles

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Lance Next.js en développement. |
| `npm run build` | Génère le build de production. |
| `npm run start` | Lance le build de production. |
| `npm run lint` | Vérifie le code avec ESLint. |
| `npm run db:migrate` | Crée et applique une migration Prisma en développement. |
| `npm run db:studio` | Ouvre Prisma Studio. |

## Build CI

Le workflow GitHub Actions [`.github/workflows/build.yml`](.github/workflows/build.yml) installe les dépendances, initialise PostgreSQL, construit l'application et publie l'artefact `geoemploi-build`. Cet artefact est autonome: il contient le serveur Next.js et les dépendances de production nécessaires. Pour l'exécuter après téléchargement, définissez `DATABASE_URL` et un vrai `AUTH_SECRET`, puis lancez `node server.js` depuis le dossier de l'artefact.
