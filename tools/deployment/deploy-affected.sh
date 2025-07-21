#!/bin/bash
set -e

# Selective Docker Deployment Script
# Deploys only specified applications using Docker Compose

echo "🚀 Starting selective deployment..."

AFFECTED_APPS="$1"
COMPOSE_MODE="${2:-selective}" # selective or full

if [ -z "$AFFECTED_APPS" ]; then
    echo "❌ No applications specified for deployment"
    exit 1
fi

echo "📋 Applications to deploy: $AFFECTED_APPS"
echo "🔧 Deployment mode: $COMPOSE_MODE"

# Create temporary directory for generated files
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

AFFECTED_COMPOSE_FILE="$TEMP_DIR/docker-compose.affected.yml"

# Generate dynamic docker-compose file for affected services
echo "📝 Generating selective docker-compose configuration..."

cat > "$AFFECTED_COMPOSE_FILE" << 'EOF'
services:
EOF

# Add each affected app to the compose file
for app in $AFFECTED_APPS; do
    echo "  ➕ Adding service: $app"
    
    # Extract service definition from main docker-compose.yml
    if ! grep -q "^  $app:" docker-compose.yml; then
        echo "⚠️  Warning: Service '$app' not found in docker-compose.yml"
        continue
    fi
    
    # Extract the service definition (from service name to next service or end)
    sed -n "/^  $app:/,/^  [a-zA-Z]/p" docker-compose.yml | sed '$d' >> "$AFFECTED_COMPOSE_FILE"
    echo >> "$AFFECTED_COMPOSE_FILE"
done

echo "📄 Generated compose file:"
cat "$AFFECTED_COMPOSE_FILE"

# Deploy the affected services
echo "🏗️  Building and deploying affected services..."

if [ "$COMPOSE_MODE" = "selective" ]; then
    # Stop existing containers for affected services
    echo "🛑 Stopping existing containers for affected services..."
    for app in $AFFECTED_APPS; do
        docker compose stop "$app" 2>/dev/null || echo "   Service $app was not running"
        docker compose rm -f "$app" 2>/dev/null || echo "   No container to remove for $app"
    done
    
    # Build and start affected services
    echo "🔨 Building and starting affected services..."
    docker compose -f "$AFFECTED_COMPOSE_FILE" up -d --build --remove-orphans
else
    # Full deployment fallback
    echo "🔄 Performing full deployment..."
    docker compose down --remove-orphans
    docker compose up -d --build --remove-orphans
fi

# Health check
echo "⏳ Waiting for services to start..."
sleep 10

echo "🏥 Checking service health..."
docker compose ps

# Verify affected services are running
echo "✅ Verifying affected services:"
for app in $AFFECTED_APPS; do
    if docker compose ps "$app" | grep -q "running"; then
        echo "   ✅ $app: Running"
    else
        echo "   ❌ $app: Not running"
        docker compose logs "$app" --tail=20
        exit 1
    fi
done

echo "🎉 Selective deployment completed successfully!"
echo "📊 Deployed services: $AFFECTED_APPS"
