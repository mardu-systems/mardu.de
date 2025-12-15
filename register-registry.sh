#!/bin/bash

# Script to register GitHub Container Registry in Mittwald
# Requires: MITTWALD_API_TOKEN and GITHUB_PAT environment variables

PROJECT_ID="p-jdbt4r"
REGISTRY_HOSTNAME="ghcr.io"
GITHUB_USERNAME="sven-frech"

echo "🔐 Registriere GitHub Container Registry in Mittwald"
echo "Projekt: $PROJECT_ID"
echo "Registry: $REGISTRY_HOSTNAME"
echo "Username: $GITHUB_USERNAME"
echo ""

if [ -z "$MITTWALD_API_TOKEN" ]; then
    echo "❌ MITTWALD_API_TOKEN Umgebungsvariable ist nicht gesetzt."
    exit 1
fi

if [ -z "$GITHUB_PAT" ]; then
    echo "❌ GITHUB_PAT Umgebungsvariable ist nicht gesetzt."
    echo "Erstelle einen GitHub Personal Access Token mit 'read:packages' Berechtigung:"
    echo "https://github.com/settings/tokens"
    exit 1
fi

echo "📋 Registriere Registry via Mittwald API..."

# Register private registry
response=$(curl -s -L -w "%{http_code}" -o /tmp/registry_response.json \
  -X POST \
  -H "Authorization: Bearer $MITTWALD_API_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.mittwald.de/v2/projects/$PROJECT_ID/container-registries" \
  -d "{
    \"hostname\": \"$REGISTRY_HOSTNAME\",
    \"username\": \"$GITHUB_USERNAME\",
    \"password\": \"$GITHUB_PAT\"
  }")

http_code="${response: -3}"
response_body=$(cat /tmp/registry_response.json)

if [ "$http_code" = "201" ] || [ "$http_code" = "200" ]; then
    echo "✅ Registry erfolgreich registriert!"
    echo "Response: $response_body"
elif [ "$http_code" = "409" ]; then
    echo "⚠️  Registry bereits registriert (Conflict)"
    echo "Das ist normal, wenn die Registry schon existiert."
else
    echo "❌ Registry-Registrierung fehlgeschlagen"
    echo "HTTP Code: $http_code"
    echo "Response: $response_body"
fi

rm -f /tmp/registry_response.json

echo ""
echo "💡 Teste nun das Deployment erneut:"
echo "git add . && git commit -m 'Test deployment with registry access' && git push origin docker"