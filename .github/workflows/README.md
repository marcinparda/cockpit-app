# GitHub Actions Workflows

This repository uses several GitHub Actions workflows to automate validation, type generation, deployment, and code quality checks for the Nx monorepo. It uses NX affected feature to speed the ci time as much as possible.

## Contents

1. [Deployment Overview](#deployment-overview)
2. [Adding Deployment Support for a New App](#adding-deployment-support-for-a-new-app)

## Deployment Overview

### 1. Deployment Workflow (`deploy.yml` & `deploy-to-production.yml`)

- **File:** `.github/workflows/deploy.yml`
- **Purpose:** Handles CI/CD for all apps in the monorepo. On every push to `master`, it:

  - Validates API types (calls `validate-types.yml`)
  - Runs affected checks and builds (lint, build, test) only for changed projects
  - Builds and pushes Docker images for affected apps (ai-budget, todo, login, cockpit) to GHCR, only if their build output exists
  - Triggers deployment to Raspberry Pi via `deploy-to-production.yml`

- **File:** `.github/workflows/deploy-to-production.yml`
- **Purpose:** Deploys all built Docker images to the Raspberry Pi using SSH and Cloudflare Tunnel. Runs `deploy.sh` on the Pi to update containers. Provides a deployment summary and troubleshooting tips.

### 2. Deployment Script (`deploy.sh`)

- **File:** `deploy.sh` (root of repository)
- **Purpose:** Handles the actual deployment of all apps on the Raspberry Pi. This script is copied and executed remotely by the `deploy-to-production.yml` workflow.
- **How it works:**
  - Requires `GITHUB_TOKEN` and `GITHUB_ACTOR` environment variables for authentication with GitHub Container Registry (GHCR).
  - Logs in to GHCR using the provided credentials.
  - Defines all apps to deploy (ai-budget, todo, login, cockpit) with their respective ports.
  - For each app:
    - Stops and removes any existing container for the app
    - Prunes old Docker images
    - Pulls the latest image from GHCR
    - Runs the container on the correct port with restart policy
    - Performs a health check to ensure the container is running
  - If any container fails to start, logs are shown and the script exits with an error.
  - If all succeed, prints a success message.

### 3. Checks Workflow (`checks.yml`)

- **File:** `.github/workflows/checks.yml`
- **Purpose:** Runs on every pull request to `master` and on workflow calls. It:
  - Installs dependencies
  - Finds the last successful deploy SHA
  - Runs `nx affected` for lint, build, and test on only changed projects
  - Ensures only relevant code is checked, speeding up PR validation

### 4. API Type Validation Workflow (`validate-types.yml`)

- **File:** `.github/workflows/validate-types.yml`
- **Purpose:** Validates and updates API types based on the OpenAPI spec. Used by other workflows and can be called directly. It:
  - Checks for type drift
  - Optionally forces type update
  - Optionally creates a PR if drift is detected
  - Runs type generation tests and compilation
  - Outputs validation status and drift detection

### 5. Scheduled Type Drift Check (`scheduled-type-check.yml`)

- **File:** `.github/workflows/scheduled-type-check.yml`
- **Purpose:** Runs daily at 6 AM UTC to check for API type drift:
  - Calls `validate-types.yml` to check for OpenAPI/type drift
  - If drift is detected, creates a PR with updated types
  - Notifies via GitHub Issue if drift is found
  - Cleans up old automated branches

**Note:** The script is designed for a single-node deployment (Raspberry Pi) and expects Docker to be installed and running. It is robust against missing containers/images and will always attempt to deploy the latest version of each app.

---

- All workflows use Node.js 20 and npm for dependency management.
- Docker images are built for `linux/arm64` and pushed to GitHub Container Registry (GHCR).
- Deployment is designed for a Raspberry Pi using Docker Compose and Cloudflare Tunnel for secure SSH access.
- For more details on the deployment approach, see [nx-docker-rpi-deployment](https://github.com/marcinparda/nx-docker-rpi-deployment).

## Adding Deployment Support for a New App

To prepare deployment for a new app in this monorepo, follow these steps:

1. **Create a Dockerfile for the app**

   - Place it in `apps/<app-name>/Dockerfile`.
   - Use the pattern:
     ```dockerfile
     FROM nginx:alpine
     COPY dist/apps/<app-name> /usr/share/nginx/html
     COPY apps/<app-name>/nginx/<app-name>.conf /etc/nginx/conf.d/default.conf
     EXPOSE 80
     CMD ["nginx", "-g", "daemon off;"]
     ```
   - Adjust as needed for your app's requirements.

2. **Add a custom nginx config**

   - Place it in `apps/<app-name>/nginx/<app-name>.conf`.
   - Configure routing, static file serving, etc., as needed for your app.

3. **Update GitHub Actions workflows**

   - In `.github/workflows/deploy.yml`:
     - Add a check for the app's build output (see other apps for the pattern).
     - Add a Docker build-and-push step for the app, conditional on the build output existing.

4. **Update `deploy.sh`**

   - Add your app to the `apps` associative array with its desired port.
   - The script will automatically handle stopping, removing, pulling, and running the new app's container.

5. **(Optional) Environment Variables**

   - Update in `deploy.yml` step `Replace dev environments with production URLs` if your app introduces new environment variables for shared lib.

6. **(Optional) Update documentation**
   - Document any app-specific environment variables or deployment notes.
