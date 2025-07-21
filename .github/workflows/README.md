# GitHub Actions Workflows

This directory contains the CI/CD workflows for the Cockpit application. The workflows are organized into reusable components and main workflow files.

## 📁 Workflow Structure

### Main Workflows

**🚀 [`deploy.yml`](./deploy.yml)**

- **Trigger**: Push to `master` branch
- **Purpose**: Full production deployment pipeline
- **Jobs**: Type validation → Build → Deploy to production

**🔍 [`pull-request.yml`](./pull-request.yml)**

- **Trigger**: Pull requests to `master` branch
- **Purpose**: Comprehensive validation of changes
- **Jobs**: Type validation → Build all apps → Quality checks → PR summary

**⏰ [`scheduled-type-check.yml`](./scheduled-type-check.yml)**

- **Trigger**: Daily at 6 AM UTC (or manual)
- **Purpose**: Proactive API drift detection
- **Jobs**: Drift check → Auto-PR creation → Issue notification

### Reusable Workflows

**🔧 [`validate-types.yml`](./validate-types.yml)**

- **Purpose**: Complete API type validation and drift detection
- **Features**: Drift check, type generation, coverage verification
- **Outputs**: Drift status, validation results

**🏗️ [`build-and-test.yml`](./build-and-test.yml)**

- **Purpose**: Build and test applications
- **Inputs**: App name, configuration, test options
- **Outputs**: Build artifacts, test results

**📦 [`deploy-reusable.yml`](./deploy-reusable.yml)**

- **Purpose**: Production deployment to Raspberry Pi
- **Features**: SSH setup, Docker deployment, health checks
- **Security**: Uses encrypted secrets for credentials

## 🎯 Workflow Usage

### For Developers

**Creating a Pull Request:**

1. Push changes to feature branch
2. Create PR to `master`
3. `pull-request.yml` runs automatically
4. Review validation results in PR comments
5. Fix any issues and push updates
6. Merge when all checks pass

**Deploying to Production:**

1. Merge PR to `master`
2. `deploy.yml` runs automatically
3. Types validated → App built → Deployed to production
4. Monitor deployment in Actions tab

### For Maintainers

**Managing Type Drift:**

- Daily automated checks via `scheduled-type-check.yml`
- Auto-creation of PRs when drift detected
- GitHub issues created for high-priority drift
- Manual runs via workflow dispatch

**Monitoring Workflows:**

- All workflows provide detailed logging
- Failed jobs include diagnostic information
- PR comments show validation summaries
- Deployment status visible in Actions

## 🔄 Workflow Dependencies

```
deploy.yml
├── validate-types.yml
├── build-and-test.yml
└── deploy-reusable.yml

pull-request.yml
├── validate-types.yml
├── build-and-test.yml (ai-budget)
├── build-and-test.yml (todo)
└── quality-checks (inline)

scheduled-type-check.yml
├── validate-types.yml
└── cleanup-jobs (inline)
```

## 🛡️ Security Features

### Secrets Management

- SSH keys encrypted in GitHub secrets
- Environment-specific configurations
- Secure Cloudflare tunnel authentication

### Access Control

- Production deployments require `master` branch
- PR validations don't have deployment access
- Scheduled workflows use limited permissions

### Vulnerability Protection

- Dependency security audits
- SSH strict host key checking
- Encrypted communication channels

## ⚡ Performance Optimizations

### Parallel Execution

- Multiple jobs run concurrently when possible
- Independent validations don't block each other
- Build jobs parallelized across applications

### Caching Strategy

- Node.js dependencies cached across runs
- Build artifacts cached for deployment
- Docker layers optimized for quick rebuilds

### Concurrency Control

- PR workflows cancel previous runs on new pushes
- Resource-intensive jobs managed with concurrency groups
- Background cleanup prevents resource bloat

## 📊 Monitoring & Alerting

### Success Indicators

- ✅ All validation jobs pass
- ✅ Applications build successfully
- ✅ Deployment completes without errors
- ✅ Health checks confirm service availability

### Failure Handling

- ❌ Failed jobs provide detailed error logs
- 🔄 Automatic retry for transient failures
- 📧 GitHub notifications for critical failures
- 🚨 Issue creation for drift detection

### Metrics Tracked

- Type drift detection frequency
- Build success/failure rates
- Deployment duration and success
- Test coverage and quality metrics

## 🔧 Configuration

### Environment Variables

- `API_URL`: Backend API endpoint
- `NODE_VERSION`: Node.js version (default: 20)
- `ENVIRONMENT`: Deployment target (production/staging)

### Secrets Required

- `RASPBERRY_PI_SSH_KEY`: SSH private key for deployment
- `SSH_KNOWN_HOSTS`: Known hosts for SSH verification
- `CLOUDFLARE_TUNNEL_DOMAIN`: Cloudflare tunnel endpoint
- `RASPBERRY_PI_USERNAME`: SSH username for deployment
- `GITHUB_TOKEN`: Automatically provided by GitHub

### Customization

- Modify triggers in workflow files
- Adjust Node.js versions in reusable workflows
- Configure additional quality checks as needed
- Extend deployment targets by copying patterns

## 🚀 Getting Started

1. **Fork/Clone Repository**: Workflows activate automatically
2. **Configure Secrets**: Add required secrets in repository settings
3. **Create First PR**: Test validation workflows
4. **Merge to Master**: Trigger deployment workflow
5. **Monitor Actions**: Check results in GitHub Actions tab

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax Reference](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Reusable Workflows Guide](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
- [Security Best Practices](https://docs.github.com/en/actions/security-guides)

---

_This workflow system provides comprehensive CI/CD automation while maintaining security, performance, and maintainability standards._

## Legacy Documentation

The following section contains the original workflow documentation for reference:

## Workflow Triggers

This workflow runs on:

- Push events to the `master` branch
- Pull requests targeting the `master` branch

## Jobs

### 1. Build and Test

This job runs on Ubuntu and performs the following steps:

- Checks out the repository code using actions/checkout@v3
- Sets up Node.js v20 with npm caching
- Installs dependencies using `npm ci`
- Creates Angular environment files with API URL configuration
- Builds the Angular application with production configuration
- Note: Testing is currently disabled in the workflow

### 2. Deploy

This job runs after successful build and test and handles deployment:

- Checks out the repository code using actions/checkout@v2
- Sets up Cloudflared for secure tunnel access by:
  - Adding Cloudflare package repository
  - Installing cloudflared package
- Configures SSH with the following components:
  - Private SSH key for Raspberry Pi access
  - Known hosts configuration
  - SSH config for Cloudflare tunnel connection
- Deploys to the Raspberry Pi server by:
  - Connecting through Cloudflare tunnel
  - Pulling the latest code on the server
  - Creating environment configuration files
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

- Check the GitHub Actions logs for detailed deployment information
- Ensure all secrets are properly configured before running the workflow
- The StrictHostKeyChecking option is set to "no" for the deployment SSH connection
