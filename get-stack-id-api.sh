#!/bin/bash

# Script to get the default stack ID via Mittwald API
# Requires: MITTWALD_API_TOKEN environment variable

PROJECT_ID="p-jdbt4r"

echo "🔍 Ermittle Standard-Stack ID für Projekt: $PROJECT_ID"
echo ""

if [ -z "$MITTWALD_API_TOKEN" ]; then
    echo "❌ MITTWALD_API_TOKEN Umgebungsvariable ist nicht gesetzt."
    echo ""
    echo "Setze den Token:"
    echo "export MITTWALD_API_TOKEN='dein-api-token'"
    echo ""
    echo "API Token erstellen:"
    echo "1. Gehe zu https://studio.mittwald.de"
    echo "2. Benutzereinstellungen → API-Token"
    echo "3. Neuen Token erstellen"
    exit 1
fi

echo "📋 Ermittle Stacks via Mittwald API..."
echo ""

# Get stacks for the project via API
response=$(curl -s -L -H "Authorization: Bearer $MITTWALD_API_TOKEN" \
  "https://api.mittwald.de/v2/projects/$PROJECT_ID/stacks")

# Check if curl was successful
if [ $? -ne 0 ]; then
    echo "❌ API-Aufruf fehlgeschlagen"
    exit 1
fi

# Extract default stack ID using jq (if available) or grep/sed
if command -v jq &> /dev/null; then
    stack_id=$(echo "$response" | jq -r '.[] | select(.description == "default") | .id' 2>/dev/null)
else
    # Fallback without jq - basic parsing
    stack_id=$(echo "$response" | grep -o '"id":"[^"]*"' | grep -A5 -B5 '"description":"default"' | grep '"id"' | cut -d'"' -f4 | head -1)
fi

if [ -n "$stack_id" ] && [ "$stack_id" != "null" ]; then
    echo "✅ Standard Stack gefunden:"
    echo "Stack ID: $stack_id"
    echo ""
    echo "💡 Verwende diese Stack-ID in GitHub Variables als STACK_ID:"
    echo "   Repository Settings → Secrets and variables → Actions → Variables"
    echo "   Name: STACK_ID"
    echo "   Value: $stack_id"
else
    echo "❌ Standard-Stack nicht gefunden oder API-Fehler"
    echo "Response: $response"
    echo ""
    echo "Prüfe:"
    echo "1. API Token ist gültig"
    echo "2. Projekt p-vcxzdk existiert und ist zugänglich"
    echo "3. Standard-Stack ist vorhanden"
fi