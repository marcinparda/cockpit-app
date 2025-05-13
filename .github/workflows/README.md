# GitHub Actions Deployment Workflow

This directory contains GitHub Actions workflow configurations for continuous integration and deployment.

## deploy.yml

The `deploy.yml` workflow runs on every push to the main branch and handles:

1. Building and testing the Angular application on GitHub runners
2. SSH into the Raspberry Pi to pull the latest code and rebuild the containers

## Required Secrets

For the workflow to function correctly, the following secrets need to be configured in your GitHub repository:

### Raspberry Pi Secrets
- `RASPBERRY_PI_HOST`: The hostname or IP address of your Raspberry Pi
- `RASPBERRY_PI_USERNAME`: SSH username for Raspberry Pi access
- `RASPBERRY_PI_SSH_KEY`: SSH private key for authentication
- `RASPBERRY_PI_SSH_PASSPHRASE`: Passphrase for the SSH key (if applicable)

## Setup Instructions for Raspberry Pi

1. Set up Docker and Docker Compose on your Raspberry Pi
2. Clone this repository on your Pi: `git clone https://github.com/your-username/cockpit-app.git ~/cockpit-app`
3. Make sure the repository can be updated with `git pull` (configure Git credentials if needed)
4. Ensure your `docker-compose.yml` is properly configured to build the application

## Modifying the Workflow

If you need to customize the deployment process:

- Adjust the build parameters in the workflow as needed
- Modify the deployment scripts that run on the Raspberry Pi
- Add additional services or dependencies to the workflow
