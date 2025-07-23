#!/bin/bash
# Required environment variables:
#   GITHUB_TOKEN, IMAGE_NAME, CONTAINER_NAME, GITHUB_ACTOR
set -e

if [[ -z "$GITHUB_TOKEN" || -z "$IMAGE_NAME" || -z "$CONTAINER_NAME" || -z "$GITHUB_ACTOR" ]]; then
  echo "❌ One or more required environment variables are missing."
  echo "   GITHUB_TOKEN, IMAGE_NAME, CONTAINER_NAME, GITHUB_ACTOR must be set."
  exit 1
fi

echo "🔑 Logging in to GitHub Container Registry..."
echo "$GITHUB_TOKEN" | docker login ghcr.io -u "$GITHUB_ACTOR" --password-stdin

echo "� Stopping existing container if running..."
docker stop "$CONTAINER_NAME" 2>/dev/null || true
docker rm "$CONTAINER_NAME" 2>/dev/null || true

echo "🗑️ Cleaning up old images..."
docker image prune -a -f

echo "📥 Pulling latest image..."
docker pull "$IMAGE_NAME"

echo "� Starting new container..."
docker run -d \
  --name "$CONTAINER_NAME" \
  --restart unless-stopped \
  -p 4200:80 \
  -p 4201:81 \
  "$IMAGE_NAME"

echo "✅ Deployment completed successfully"

# Health check
echo "🏥 Performing health check..."
sleep 5 # Wait for the container to start
if docker ps --filter "name=$CONTAINER_NAME" --filter "status=running" | grep -q "$CONTAINER_NAME"; then
  echo "✅ Container is running successfully"
else
  echo "❌ Container failed to start"
  docker logs "$CONTAINER_NAME"
  exit 1
fi
