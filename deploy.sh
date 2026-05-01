#!/bin/bash

# Required environment variables:
#   GITHUB_TOKEN, GITHUB_ACTOR
set -e

if [[ -z "$GITHUB_TOKEN" || -z "$GITHUB_ACTOR" ]]; then
  echo "❌ One or more required environment variables are missing."
  echo "   GITHUB_TOKEN, GITHUB_ACTOR must be set."
  exit 1
fi

OWNER="${OWNER:-marcinparda}"
REPO="${REPO:-cockpit-app}"

echo "🔑 Logging in to GitHub Container Registry..."
echo "$GITHUB_TOKEN" | docker login ghcr.io -u "$GITHUB_ACTOR" --password-stdin

# App definitions: name, image, container, port
declare -A apps=(
  [login]="4202"
  [cockpit]="4203"
  [cv]="4204"
  [store]="4205"
)

for app in "${!apps[@]}"; do
  port="${apps[$app]}"
  image="ghcr.io/$OWNER/$REPO-$app:latest"
  container="$app"

  echo "🏷️ Tagging current image as previous for rollback..."
  docker tag "$image" "ghcr.io/$OWNER/$REPO-$app:previous" 2>/dev/null || true

  echo "📥 Pulling latest image for $container..."
  docker pull "$image"

  echo "⏹️ Stopping existing container $container if running..."
  docker stop "$container" 2>/dev/null || true
  docker rm "$container" 2>/dev/null || true

  echo "🚀 Starting new container $container on port $port:80..."
  docker run -d \
    --name "$container" \
    --restart unless-stopped \
    -p "$port:80" \
    "$image"

  echo "🏥 Performing health check for $container..."
  healthy=false
  for i in $(seq 1 30); do
    if curl -sf "http://localhost:$port/" > /dev/null 2>&1; then
      echo "✅ $container is healthy"
      healthy=true
      break
    fi
    sleep 3
  done

  if [ "$healthy" = false ]; then
    echo "❌ $container failed health check, rolling back..."
    docker rm -f "$container" 2>/dev/null || true
    docker run -d \
      --name "$container" \
      --restart unless-stopped \
      -p "$port:80" \
      "ghcr.io/$OWNER/$REPO-$app:previous" || true
    exit 1
  fi
done

echo "🗑️ Cleaning up old images..."
docker image prune -a -f

echo "✅ All deployments completed successfully"
