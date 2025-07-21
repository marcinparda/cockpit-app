#!/bin/bash
set -e

# Nx Affected Apps Analysis for Deployment
# This script identifies which applications need to be deployed based on changes

echo "🔍 Analyzing affected applications for deployment..."

# Default to comparing with the last commit if no base is provided
BASE_SHA=${1:-"origin/master"}
HEAD_SHA=${2:-"HEAD"}

echo "📊 Comparing changes from $BASE_SHA to $HEAD_SHA"

# Get all applications in the workspace
ALL_APPS=$(npx nx show projects --type=app --json | jq -r '.[]')
echo "📱 Available applications: $(echo $ALL_APPS | tr '\n' ' ')"

# Get affected projects that are applications with build target
AFFECTED_PROJECTS=$(npx nx show projects --affected --type=app --base=$BASE_SHA --head=$HEAD_SHA 2>/dev/null || echo "")

echo "🎯 Affected projects: $AFFECTED_PROJECTS"

# Filter to only include applications (not libraries or e2e tests)
AFFECTED_APPS=""
if [ -n "$AFFECTED_PROJECTS" ]; then
    for project in $AFFECTED_PROJECTS; do
        # Check if this project is an application
        if echo "$ALL_APPS" | grep -q "^$project$"; then
            AFFECTED_APPS="$AFFECTED_APPS $project"
        fi
    done
fi

# Clean up the affected apps list (remove leading/trailing spaces)
AFFECTED_APPS=$(echo "$AFFECTED_APPS" | xargs)

echo "🚀 Affected applications for deployment: ${AFFECTED_APPS:-"none"}"

# Check if we have any affected applications
HAS_AFFECTED_APPS="false"
if [ -n "$AFFECTED_APPS" ]; then
    HAS_AFFECTED_APPS="true"
    # Convert space-separated list to JSON array for GitHub Actions matrix
    AFFECTED_APPS_JSON=$(echo "$AFFECTED_APPS" | jq -R 'split(" ") | map(select(. != ""))')
    echo "📋 Affected apps JSON: $AFFECTED_APPS_JSON"
else
    AFFECTED_APPS_JSON="[]"
    echo "ℹ️  No applications affected - deployment will be skipped"
fi

# Output for GitHub Actions
if [ -n "$GITHUB_OUTPUT" ]; then
    echo "affected-apps=$AFFECTED_APPS" >> $GITHUB_OUTPUT
    echo "affected-apps-json=$AFFECTED_APPS_JSON" >> $GITHUB_OUTPUT
    echo "has-affected-apps=$HAS_AFFECTED_APPS" >> $GITHUB_OUTPUT
    echo "base-sha=$BASE_SHA" >> $GITHUB_OUTPUT
    echo "head-sha=$HEAD_SHA" >> $GITHUB_OUTPUT
fi

# Summary
echo "✅ Analysis complete:"
echo "   - Affected apps: ${AFFECTED_APPS:-"none"}"
echo "   - Has changes: $HAS_AFFECTED_APPS"
echo "   - Base SHA: $BASE_SHA"
echo "   - Head SHA: $HEAD_SHA"
