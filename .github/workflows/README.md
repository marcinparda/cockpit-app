# Github Actions Workflows

## Deployment Workflow
This workflow handles the deployment of your NX monorepo projects to your Raspberry Pi using Docker.
It is based on this repository [nx-docker-rpi-deployment](https://github.com/marcinparda/nx-docker-rpi-deployment). For more infomation how it works go there and read the documentation.

## Scheduled type check
Besides of the deployment workflow, there is a scheduled workflow that runs every day at 4:00 AM to validate the API types. If there are any changes in the API types, it will create a pull request with the changes.

## Validation Workflow
This workflow validates the API types based on the OpenAPI specification.