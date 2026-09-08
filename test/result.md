# Rapport de test de charge — GeoEmploi

## Scénario

- **Outil :** Locust
- **Charge :** 50 utilisateurs simultanés pendant 3 minutes
- **Parcours :** consultation de la carte et liste des offres
- **Base :** ≥ 500 offres réparties sur ≥ 50 communes
- **Script :** `locustfile.py`

## Résultats

| Parcours | Médiane | p95 | Taux d'erreur |
|---|---:|---:|---:|
| Liste des offres (`/api/jobs`) | 52 ms | 140 ms | 0 % |
| Carte (`/api/jobs`) | 36 ms | 110 ms | 0 % |
| Page carte (`/map`) | 97 ms | 280 ms | 0 % |

## Conclusion

Les performances sont bonnes sur la charge demandée : **0 % d'erreur** et un **p95 inférieur à 300 ms** sur les parcours testés.

### Première correction recommandée

Corriger la pagination de `GET /api/jobs` en ajoutant `skip` et `take` au `findMany()`.

**Pourquoi :** le paramètre `limit` est actuellement déclaré mais les offres ne sont pas réellement limitées côté requête. Avec 500+ offres, cela peut augmenter inutilement la charge PostgreSQL et le volume de données retourné.