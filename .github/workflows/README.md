# CI/CD Pipeline Documentation

This document provides details about the CI/CD pipeline defined in `deploy.yml`.

## Overview

The workflow automates building, testing, and deploying the Cockpit application to a Raspberry Pi server using Cloudflare tunneling for secure SSH access.

## Workflow Triggers

This workflow runs on:

- Push events to the `master` branch
- Pull requests targeting the `master` branch

## Jobs

### 1. Build and Test

This job runs on Ubuntu and performs the following steps:

- Checks out the repository code
- Sets up Node.js v20 with npm caching
- Installs dependencies using `npm ci`
- Creates environment configuration files
- Builds the Angular application
- Runs tests in CI mode

### 2. Deploy

This job runs after successful build and test and handles deployment:

- Sets up Cloudflared for secure tunnel access
- Configures SSH with the following components:
  - Private SSH key for Raspberry Pi access
  - Known hosts configuration
  - SSH config for Cloudflare tunnel connection
- Deploys to the Raspberry Pi server by:
  - Pulling the latest code
  - Rebuilding and restarting Docker containers

## Required Secrets

The following secrets must be configured in your GitHub repository:

| Secret Name                | Description                                                      |
| -------------------------- | ---------------------------------------------------------------- |
| `API_URL`                  | Backend API URL (optional, defaults to http://localhost:8000)    |
| `RASPBERRY_PI_SSH_KEY`     | Private SSH key for accessing the Raspberry Pi                   |
| `RASPBERRY_PI_USERNAME`    | Username for the Raspberry Pi                                    |
| `SSH_KNOWN_HOSTS`          | Known hosts configuration for SSH, needed for secure connections |
| `CLOUDFLARE_TUNNEL_DOMAIN` | Cloudflare tunnel hostname                                       |

## Troubleshooting

- The SSH connection uses verbose logging (`-vvv`) to help with debugging connection issues
- Check the GitHub Actions logs for detailed deployment information
- Ensure all secrets are properly configured before running the workflow
