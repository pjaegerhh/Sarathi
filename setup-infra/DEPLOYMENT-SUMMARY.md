# 🎉 Azure Infrastructure Setup Complete!

## ✅ Successfully Created Resources

### Production Environment (`sarathi-rg`)
- **Resource Group**: `sarathi-rg` (Central India)
- **Storage Account**: `sarathidocs` (Central India)
  - Container: `documents`
  - Key: `[REDACTED - See token files]`
- **Static Web App**: `sarathi` (East Asia) - **Standard Plan**
  - URL: https://jolly-bush-0d2030500.3.azurestaticapps.net
  - Deployment Token: `789b0eaf6f8ff6d7cb2c39d24793222116ab2c656a0f9f583b4b35c93dbd143603-34befd57-cc0b-4995-8773-65d36ecbc92500021300d2030500`

### Testing Environment (`sarathi-test-rg`)
- **Resource Group**: `sarathi-test-rg` (Central India)
- **Storage Account**: `sarathitest` (Central India)
  - Container: `documents`
  - Key: `[REDACTED - See token files]`
- **Static Web App**: `sarathi-test` (East Asia) - **Standard Plan**
  - URL: https://zealous-beach-09b974100.3.azurestaticapps.net
  - Deployment Token: `69aa171ce358cbf59a5e901739e4dfab651d9fa090791686ee4adefa3a01fe3403-14f4fe20-2bfc-403f-b06f-977eb617ad93000310209b974100`

## 📋 GitHub Secrets to Configure

Add these secrets to your GitHub repository at: `https://github.com/<your-repo>/settings/secrets/actions`

### Required Secrets:
1. **AZURE_STATIC_WEB_APPS_API_TOKEN_TEST**
   - Value: `69aa171ce358cbf59a5e901739e4dfab651d9fa090791686ee4adefa3a01fe3403-14f4fe20-2bfc-403f-b06f-977eb617ad93000310209b974100`

2. **AZURE_STATIC_WEB_APPS_API_TOKEN_PROD**
   - Value: `789b0eaf6f8ff6d7cb2c39d24793222116ab2c656a0f9f583b4b35c93dbd143603-34befd57-cc0b-4995-8773-65d36ecbc92500021300d2030500`

### Optional Secrets (for storage access if needed):
3. **AZURE_STORAGE_ACCOUNT_KEY_TEST**
   - Value: `[See sarathi-test-deployment-token.txt file]`

4. **AZURE_STORAGE_ACCOUNT_KEY_PROD**
   - Value: `[See sarathi-prod-deployment-token.txt file]`

## 🚀 How to Deploy

### Automatic Deployment (GitHub Actions)

Your GitHub Actions workflows are already configured in:
- `.github/workflows/deploy-testing.yml` - Deploys on push to `testing` branch
- `.github/workflows/deploy-production.yml` - Deploys on push to `main` branch

**To trigger deployment:**
```bash
# For testing environment
git push origin testing

# For production environment
git push origin main
```

### Manual Deployment (if needed)

You can also deploy manually using the Azure CLI:

```bash
# Deploy to testing
az staticwebapp deploy --name sarathi-test --resource-group sarathi-test-rg --source ./dist

# Deploy to production
az staticwebapp deploy --name sarathi --resource-group sarathi-rg --source ./dist
```

## 🔗 Access URLs

### Testing Environment
- **Static Web App**: https://zealous-beach-09b974100.3.azurestaticapps.net
- **Storage Account**: https://sarathitest.blob.core.windows.net
- **Azure Portal**: https://portal.azure.com/#@compusys.cc/resource/subscriptions/80ffc621-4e29-4985-8e80-0320eee41179/resourceGroups/sarathi-test-rg

### Production Environment
- **Static Web App**: https://jolly-bush-0d2030500.3.azurestaticapps.net
- **Storage Account**: https://sarathidocs.blob.core.windows.net
- **Azure Portal**: https://portal.azure.com/#@compusys.cc/resource/subscriptions/80ffc621-4e29-4985-8e80-0320eee41179/resourceGroups/sarathi-rg

## 📝 Important Notes

### Region Selection
- **Storage Accounts**: Created in `Central India` (as requested)
- **Static Web Apps**: Created in `East Asia` (Static Web Apps not available in Central India)

### Security
- ⚠️ **DELETE** the token files after adding secrets to GitHub:
  - `setup-infra/sarathi-test-deployment-token.txt`
  - `setup-infra/sarathi-prod-deployment-token.txt`
- All storage accounts are configured with:
  - HTTPS only
  - TLS 1.2 minimum
  - Private blob containers (no public access)

### Cost
- Static Web Apps: **Free tier** (no cost)
- Storage Accounts: **Standard LRS** (minimal cost, pay-as-you-go)

## 🔧 Next Steps

1. ✅ **Add GitHub Secrets** (see above)
2. ✅ **Test Deployment**
   - Push to `testing` branch
   - Verify at: https://zealous-beach-09b974100.3.azurestaticapps.net
3. ✅ **Configure Custom Domains** (optional)
   - Add custom domain in Azure Portal
   - Configure DNS records
4. ✅ **Set up Monitoring** (optional)
   - Enable Application Insights
   - Configure alerts

## 🛠️ Troubleshooting

### GitHub Actions Fails
- Verify secrets are correctly added
- Check that branch names match (`testing` and `main`)
- Review logs in GitHub Actions tab

### Static Web App Not Loading
- Wait a few minutes for first deployment
- Check GitHub Actions deployment status
- Verify build completed successfully

### Storage Access Issues
- Ensure storage keys are correct
- Check CORS settings if accessing from browser
- Verify container permissions

## 📞 Support

- **Azure Portal**: https://portal.azure.com
- **Azure Documentation**: https://docs.microsoft.com/azure/static-web-apps/
- **GitHub Actions Logs**: https://github.com/<your-repo>/actions

---

**Created**: October 26, 2025
**Subscription**: MSFT 2400 (80ffc621-4e29-4985-8e80-0320eee41179)
**Managed By**: PowerShell / Azure CLI
