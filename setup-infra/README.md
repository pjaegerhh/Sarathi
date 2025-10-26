# Sarathi Azure Infrastructure Setup

This directory contains all the necessary files to set up and deploy the Sarathi project infrastructure on Azure.

## ✅ Quick Status

**All infrastructure has been created and is ready to use!**

See [DEPLOYMENT-SUMMARY.md](./DEPLOYMENT-SUMMARY.md) for complete details including:
- Resource URLs
- Deployment tokens
- GitHub secrets to configure

## Overview

The infrastructure includes:
- **Production Environment** (`sarathi-rg`): Production static web app and storage
- **Testing Environment** (`sarathi-test-rg`): Testing static web app and storage
- **Automated Deployment**: GitHub Actions for CI/CD

## Resources Created

### Production (sarathi-rg)
- Static Web App: `sarathi` (East Asia)
- Storage Account: `sarathidocs` (Central India)
- URL: https://jolly-bush-0d2030500.3.azurestaticapps.net

### Testing (sarathi-test-rg)
- Static Web App: `sarathi-test` (East Asia)
- Storage Account: `sarathitest` (Central India)
- URL: https://zealous-beach-09b974100.3.azurestaticapps.net

## Quick Start

### Step 1: Add GitHub Secrets

Go to your GitHub repository settings and add these secrets:

```
AZURE_STATIC_WEB_APPS_API_TOKEN_TEST = <see DEPLOYMENT-SUMMARY.md>
AZURE_STATIC_WEB_APPS_API_TOKEN_PROD = <see DEPLOYMENT-SUMMARY.md>
```

### Step 2: Deploy

```bash
# Deploy to testing
git push origin testing

# Deploy to production
git push origin main
```

## File Structure

```
setup-infra/
├── README.md                              # This file
├── DEPLOYMENT-SUMMARY.md                  # Complete deployment details ⭐
├── create-resources-simple.ps1            # ✅ Used - Created resource groups and storage
├── create-static-web-apps-standalone.ps1  # ✅ Used - Created static web apps
├── create-static-web-apps-with-github.ps1 # Alternative with GitHub integration
├── sarathi-infrastructure.bicep           # Infrastructure as Code template
├── deploy-infrastructure.ps1              # Bicep deployment script
├── create-resource-groups.ps1             # Individual resource group creation
├── create-static-web-apps.ps1             # Individual static web app creation (old)
├── create-storage-accounts.ps1            # Individual storage account creation (old)
└── setup-all.ps1                          # Complete setup automation (old)
```

## Scripts Used

The following scripts were successfully executed:

1. **create-resources-simple.ps1** - Created all resource groups and storage accounts
2. **create-static-web-apps-standalone.ps1** - Created both static web apps with deployment tokens

## Important Notes

### Region Selection
- **Storage Accounts**: `Central India` (as requested)
- **Static Web Apps**: `East Asia` (Static Web Apps not available in Central India)

### Security
- ⚠️ Delete token files after adding to GitHub:
  - `sarathi-test-deployment-token.txt`
  - `sarathi-prod-deployment-token.txt`

### GitHub Actions

The project includes automated deployment workflows:
- **Testing**: `.github/workflows/deploy-testing.yml` (deploys on push to `testing`)
- **Production**: `.github/workflows/deploy-production.yml` (deploys on push to `main`)

## Deployment Process

1. **Code Push**: Developer pushes to `testing` or `main` branch
2. **GitHub Actions**: Automatically triggered
3. **Build**: Application is built with Vite
4. **Deploy**: Deployed to Azure Static Web Apps
5. **Live**: Available at the respective URL

## Environment Variables

The workflows automatically set:
- `VITE_APP_ENVIRONMENT`: "testing" or "production"
- `VITE_AZURE_STORAGE_ACCOUNT_NAME`: "sarathitest" or "sarathidocs"
- `VITE_AZURE_STORAGE_CONTAINER`: "documents"

## Monitoring

- **Azure Portal**: Monitor resources in respective resource groups
- **GitHub Actions**: View deployment logs and status
- **Static Web Apps**: Access deployment history in Azure Portal

## Troubleshooting

### Deployment Fails
1. Check GitHub secrets are correctly configured
2. Verify branch names (`testing` and `main`)
3. Review GitHub Actions logs

### App Not Loading
1. Wait a few minutes for initial deployment
2. Check GitHub Actions status
3. Review build logs for errors

## Support Resources

- **Deployment Summary**: [DEPLOYMENT-SUMMARY.md](./DEPLOYMENT-SUMMARY.md)
- **Azure Portal**: https://portal.azure.com
- **Static Web Apps Docs**: https://docs.microsoft.com/azure/static-web-apps/
- **GitHub Actions**: https://github.com/features/actions

## Cost Management

- Static Web Apps: Free tier (no cost)
- Storage Accounts: Standard LRS (minimal pay-as-you-go cost)
- Set up cost alerts in Azure Portal if needed

---

**Status**: ✅ Infrastructure Complete
**Created**: October 26, 2025
**Subscription**: MSFT 2400
