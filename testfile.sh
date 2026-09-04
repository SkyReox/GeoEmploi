#!/bin/bash
set -e
 
BASE_URL="http://localhost:3000"
 
GIVER_COOKIES="/tmp/geo-emploi-giver-cookies.txt"
SEEKER_COOKIES="/tmp/geo-emploi-seeker-cookies.txt"
ADMIN_COOKIES="/tmp/geo-emploi-admin-cookies.txt"
 
GIVER_EMAIL="giver-test@test.com"
GIVER_PASSWORD="password123"
SEEKER_EMAIL="seeker-test@test.com"
SEEKER_PASSWORD="password123"
ADMIN_EMAIL="admin@geo-emploi.com"
ADMIN_PASSWORD="changeme123"
 
rm -f "$GIVER_COOKIES" "$SEEKER_COOKIES" "$ADMIN_COOKIES"
 
# ------------------------------------------------------------------
# Fonction utilitaire : login complet (csrf + credentials) dans un cookie jar donné
# ------------------------------------------------------------------
login() {
  local email=$1
  local password=$2
  local jar=$3
 
  local csrf
  csrf=$(curl -s -c "$jar" "$BASE_URL/api/auth/csrf" | grep -o '"csrfToken":"[^"]*' | cut -d'"' -f4)
 
  curl -s -b "$jar" -c "$jar" -X POST "$BASE_URL/api/auth/callback/credentials" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    --data-urlencode "email=$email" \
    --data-urlencode "password=$password" \
    --data-urlencode "csrfToken=$csrf" \
    --data-urlencode "callbackUrl=$BASE_URL" \
    --data-urlencode "json=true" > /dev/null
}
 
section() {
  echo ""
  echo "=================================================="
  echo "$1"
  echo "=================================================="
}
 
# ------------------------------------------------------------------
section "1. Inscription GIVER"
curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$GIVER_EMAIL\",\"password\":\"$GIVER_PASSWORD\",\"firstname\":\"Giver\",\"lastname\":\"Test\",\"role\":\"GIVER\"}"
echo ""

section "2. Inscription SEEKER"
curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$SEEKER_EMAIL\",\"password\":\"$SEEKER_PASSWORD\",\"firstname\":\"Seeker\",\"lastname\":\"Test\",\"role\":\"SEEKER\"}"
echo ""
 
# ------------------------------------------------------------------
section "3. Login GIVER / SEEKER / ADMIN"
login "$GIVER_EMAIL" "$GIVER_PASSWORD" "$GIVER_COOKIES"
login "$SEEKER_EMAIL" "$SEEKER_PASSWORD" "$SEEKER_COOKIES"
login "$ADMIN_EMAIL" "$ADMIN_PASSWORD" "$ADMIN_COOKIES"
 
echo "GIVER session:"
curl -s -b "$GIVER_COOKIES" "$BASE_URL/api/auth/session"
echo ""
echo "SEEKER session:"
curl -s -b "$SEEKER_COOKIES" "$BASE_URL/api/auth/session"
echo ""
echo "ADMIN session:"
curl -s -b "$ADMIN_COOKIES" "$BASE_URL/api/auth/session"
echo ""
 
# ------------------------------------------------------------------
section "4. SEEKER : mise à jour du profil"
curl -s -b "$SEEKER_COOKIES" -X PUT "$BASE_URL/api/seeker/profile" \
  -H "Content-Type: application/json" \
  -d '{"bio":"Développeur full stack passionné","availability":"FULL_TIME"}'
echo ""
 
section "5. SEEKER : ajout d'une compétence"
SKILL_RESPONSE=$(curl -s -b "$SEEKER_COOKIES" -X POST "$BASE_URL/api/seeker/skills" \
  -H "Content-Type: application/json" \
  -d '{"name":"React"}')
echo "$SKILL_RESPONSE"
SKILL_ID=$(echo "$SKILL_RESPONSE" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
echo "Skill ID: $SKILL_ID"
echo ""
 
section "6. SEEKER : ajout d'une seconde compétence (doublon volontaire pour tester le conflit)"
curl -s -b "$SEEKER_COOKIES" -X POST "$BASE_URL/api/seeker/skills" \
  -H "Content-Type: application/json" \
  -d '{"name":"React"}'
echo "  (doit renvoyer une erreur 409 - compétence déjà existante)"
echo ""
 
section "7. SEEKER : liste des compétences"
curl -s -b "$SEEKER_COOKIES" "$BASE_URL/api/seeker/skills"
echo ""
 
section "8. SEEKER : ajout d'une expérience"
EXP_RESPONSE=$(curl -s -b "$SEEKER_COOKIES" -X POST "$BASE_URL/api/seeker/experiences" \
  -H "Content-Type: application/json" \
  -d '{"title":"Développeur Backend","company":"ACME Corp","startDate":"2022-01-01T00:00:00.000Z","endDate":"2024-01-01T00:00:00.000Z","description":"Développement API REST"}')
echo "$EXP_RESPONSE"
EXP_ID=$(echo "$EXP_RESPONSE" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4) 
echo "Experience ID: $EXP_ID"
echo ""
 
section "9. SEEKER : profil complet (doit inclure skill + experience)"
curl -s -b "$SEEKER_COOKIES" "$BASE_URL/api/seeker/profile"
echo ""
 
# ------------------------------------------------------------------
section "10. GIVER : création d'un job"
JOB_RESPONSE=$(curl -s -b "$GIVER_COOKIES" -X POST "$BASE_URL/api/jobs" \
  -H "Content-Type: application/json" \
  -d '{"title":"Développeur Next.js","description":"Poste full remote","location":"113 Avenue de France, 75013 Paris","salary":45000}')
echo "$JOB_RESPONSE"
JOB_ID=$(echo "$JOB_RESPONSE" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4) 
echo "Job ID: $JOB_ID"
echo ""
 
section "11. Liste publique des jobs SANS connexion (doit être vide, job encore PENDING)"
curl -s "$BASE_URL/api/jobs"
echo ""
 
section "12. ADMIN : liste des jobs PENDING"
curl -s -b "$ADMIN_COOKIES" "$BASE_URL/api/admin/jobs?status=PENDING"
echo ""
 
section "13. ADMIN : approbation du job"
curl -s -b "$ADMIN_COOKIES" -X PUT "$BASE_URL/api/admin/jobs/$JOB_ID/approve" \
  -H "Content-Type: application/json" \
  -d '{"action":"APPROVE"}'
echo ""
 
section "14. Liste publique des jobs (doit maintenant montrer le job APPROVED)"
curl -s "$BASE_URL/api/jobs"
echo ""
 
# ------------------------------------------------------------------
section "15. SEEKER : candidature au job"
APPLICATION_RESPONSE=$(curl -s -b "$SEEKER_COOKIES" -X POST "$BASE_URL/api/jobs/$JOB_ID/apply" \
  -H "Content-Type: application/json" \
  -d '{"message":"Je suis très intéressé par ce poste"}')
echo "$APPLICATION_RESPONSE"
APPLICATION_ID=$(echo "$APPLICATION_RESPONSE" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
echo "Application ID: $APPLICATION_ID"
echo ""
 
section "16. SEEKER : re-candidature (doit échouer, 409 déjà postulé)"
curl -s -b "$SEEKER_COOKIES" -X POST "$BASE_URL/api/jobs/$JOB_ID/apply" \
  -H "Content-Type: application/json" \
  -d '{"message":"Nouvelle tentative"}'
echo ""
 
section "17. SEEKER : liste de mes candidatures"
curl -s -b "$SEEKER_COOKIES" "$BASE_URL/api/applications"
echo ""
 
section "18. GIVER : liste des candidatures reçues (doit inclure le profil du seeker)"
curl -s -b "$GIVER_COOKIES" "$BASE_URL/api/applications"
echo ""
 
section "19. GIVER : acceptation de la candidature"
curl -s -b "$GIVER_COOKIES" -X PUT "$BASE_URL/api/applications/$APPLICATION_ID" \
  -H "Content-Type: application/json" \
  -d '{"status":"ACCEPTED"}'
echo ""
 
section "20. GIVER : tentative de modifier à nouveau (doit échouer, déjà traitée)"
curl -s -b "$GIVER_COOKIES" -X PUT "$BASE_URL/api/applications/$APPLICATION_ID" \
  -H "Content-Type: application/json" \
  -d '{"status":"REJECTED"}'
echo ""
 
# ------------------------------------------------------------------
section "21. GIVER : fermeture du job"
curl -s -b "$GIVER_COOKIES" -X PUT "$BASE_URL/api/jobs/$JOB_ID/close"
echo ""
 
section "22. Liste publique des jobs (le job CLOSED ne doit plus apparaître)"
curl -s "$BASE_URL/api/jobs"
echo ""
 
# ------------------------------------------------------------------
section "23. ADMIN : liste des users"
curl -s -b "$ADMIN_COOKIES" "$BASE_URL/api/admin/users"
echo ""
 
section "24. SEEKER : suppression d'une compétence"
curl -s -b "$SEEKER_COOKIES" -X DELETE "$BASE_URL/api/seeker/skills/$SKILL_ID" -w "\nStatus: %{http_code}\n"
echo ""
 
section "25. SEEKER : suppression d'une expérience"
curl -s -b "$SEEKER_COOKIES" -X DELETE "$BASE_URL/api/seeker/experiences/$EXP_ID" -w "\nStatus: %{http_code}\n"
echo ""
 
section "26. Vérification d'accès refusé : SEEKER tente de créer un job (doit être 403)"
curl -s -b "$SEEKER_COOKIES" -X POST "$BASE_URL/api/jobs" \
  -H "Content-Type: application/json" \
  -d '{"title":"Hack","description":"Test","location":"Paris"}' \
  -w "\nStatus: %{http_code}\n"
echo ""
 
section "27. Vérification d'accès refusé : non connecté sur route seeker (doit être 401 via proxy.ts)"
curl -s "$BASE_URL/api/seeker/profile" -w "\nStatus: %{http_code}\n"
echo ""
 
section "28. Vérification d'accès refusé : GIVER tente d'accéder à /api/admin (doit être 403)"
curl -s -b "$GIVER_COOKIES" "$BASE_URL/api/admin/users" -w "\nStatus: %{http_code}\n"
echo ""
 
echo ""
echo "=================================================="
echo "TESTS TERMINÉS — relis chaque section pour vérifier"
echo "les codes de statut et les erreurs attendues (409, 403, 401, 400)"
echo "=================================================="

==================================================
1. Inscription GIVER
==================================================
{"error":{"formErrors":[],"fieldErrors":{"firstname":["Required"],"lastname":["Required"]}}}

==================================================
2. Inscription SEEKER
==================================================
{"error":{"formErrors":[],"fieldErrors":{"firstname":["Required"],"lastname":["Required"]}}}

==================================================
3. Login GIVER / SEEKER / ADMIN
==================================================
GIVER session:
null
SEEKER session:
null
ADMIN session:
null

==================================================
4. SEEKER : mise à jour du profil
==================================================
{"error":"Non authentifié"}

==================================================
5. SEEKER : ajout d'une compétence
==================================================
{"error":"Non authentifié"}
Skill ID: 


==================================================
6. SEEKER : ajout d'une seconde compétence (doublon volontaire pour tester le conflit)
==================================================
  (doit renvoyer une erreur 409 - compétence déjà existante)


==================================================
7. SEEKER : liste des compétences
==================================================
{"error":"Non authentifié"}

==================================================
8. SEEKER : ajout d'une expérience
==================================================
{"error":"Non authentifié"}
Experience ID: 


==================================================
9. SEEKER : profil complet (doit inclure skill + experience)
==================================================
{"error":"Non authentifié"}

==================================================
10. GIVER : création d'un job
==================================================
{"error":"Accès refusé"}
Job ID: 


==================================================
11. Liste publique des jobs SANS connexion (doit être vide, job encore PENDING)
==================================================
{"jobs":[],"pagination":{"page":1,"limit":20,"total":0,"totalPages":0}}

==================================================
12. ADMIN : liste des jobs PENDING
==================================================
{"error":"Accès refusé"}

==================================================
13. ADMIN : approbation du job
==================================================
/api/admin/jobs/approve

==================================================
14. Liste publique des jobs (doit maintenant montrer le job APPROVED)
==================================================
{"jobs":[],"pagination":{"page":1,"limit":20,"total":0,"totalPages":0}}

==================================================
15. SEEKER : candidature au job
==================================================
/api/jobs/apply
Application ID: 


==================================================
16. SEEKER : re-candidature (doit échouer, 409 déjà postulé)
==================================================
/api/jobs/apply

==================================================
17. SEEKER : liste de mes candidatures
==================================================
{"error":"Non authentifié"}

==================================================
18. GIVER : liste des candidatures reçues (doit inclure le profil du seeker)
==================================================
{"error":"Non authentifié"}

==================================================
19. GIVER : acceptation de la candidature
==================================================
/api/applications

==================================================
20. GIVER : tentative de modifier à nouveau (doit échouer, déjà traitée)
==================================================
/api/applications

==================================================
21. GIVER : fermeture du job
==================================================
/api/jobs/close

==================================================
22. Liste publique des jobs (le job CLOSED ne doit plus apparaître)
==================================================
{"jobs":[],"pagination":{"page":1,"limit":20,"total":0,"totalPages":0}}

==================================================
23. ADMIN : liste des users
==================================================
{"error":"Accès refusé"}

==================================================
24. SEEKER : suppression d'une compétence
==================================================
/api/seeker/skills
Status: 308


==================================================
25. SEEKER : suppression d'une expérience
==================================================
/api/seeker/experiences
Status: 308


==================================================
26. Vérification d'accès refusé : SEEKER tente de créer un job (doit être 403)
==================================================
{"error":"Accès refusé"}
Status: 403


==================================================
27. Vérification d'accès refusé : non connecté sur route seeker (doit être 401 via proxy.ts)
==================================================
{"error":"Non authentifié"}
Status: 401


==================================================
28. Vérification d'accès refusé : GIVER tente d'accéder à /api/admin (doit être 403)
==================================================
{"error":"Accès refusé"}
Status: 403


==================================================
TESTS TERMINÉS — relis chaque section pour vérifier
les codes de statut et les erreurs attendues (409, 403, 401, 400)
