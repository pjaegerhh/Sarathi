# Azure Deployment Information for Sarathi

## 🚀 Quick Reference

### Deployment URLs

**Testing Environment:**
- URL: https://zealous-beach-09b974100.3.azurestaticapps.net
- Branch: `testing`

**Production Environment:**
- URL: https://jolly-bush-0d2030500.3.azurestaticapps.net
- Branch: `main`

### GitHub Secrets Required

Add these to: `https://github.com/<your-repo>/settings/secrets/actions`

1. `AZURE_STATIC_WEB_APPS_API_TOKEN_TEST`
2. `AZURE_STATIC_WEB_APPS_API_TOKEN_PROD`
3. `AZURE_CREDENTIALS` – JSON for Azure Login (scheduler and other Azure deploys). Create once with the script below.

**See `setup-infra/DEPLOYMENT-SUMMARY.md` for the actual token values.**

#### Creating `AZURE_CREDENTIALS`

The production workflow uses `AZURE_CREDENTIALS` to deploy the Supabase ping Azure Function. Create the secret once:

1. Install [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) and run `az login`.
2. Open a terminal in the **repo root** (`c:\development\sarathi`), then run:
   ```powershell
   cd c:\development\sarathi
   .\setup-infra\create-azure-credentials.ps1
   ```
   Or from any folder use the full path:
   ```powershell
   & "c:\development\sarathi\setup-infra\create-azure-credentials.ps1"
   ```
   Defaults: subscription `80ffc621-4e29-4985-8e80-0320eee41179`, resource group `sarathi-rg`. Override with `-SubscriptionId` / `-ResourceGroup` if needed.
3. Copy the single-line JSON printed by the script.
4. In GitHub: **Settings → Secrets and variables → Actions → New repository secret** → Name: `AZURE_CREDENTIALS`, Value: paste the JSON.

The script creates a service principal **Sarathi-GitHub-Actions** with **Contributor** on `sarathi-rg` only. Keep the JSON confidential; the client secret cannot be retrieved again.

### How to Deploy

```bash
# Deploy to testing
git push origin testing

# Deploy to production  
git push origin main
```

### Storage Accounts

- **Production**: `sarathidocs` (documents container)
- **Testing**: `sarathitest` (documents container)

### Important Notes

- Static Web Apps are in **East Asia** region (not available in Central India)
- Storage Accounts are in **Central India** region (as requested)
- GitHub Actions automatically deploy when you push to respective branches
- First deployment may take a few minutes

### Complete Documentation

See `setup-infra/` directory for:
- Complete deployment summary
- All deployment tokens and keys
- Detailed setup instructions
- Troubleshooting guide

---

**Azure Portal**: https://portal.azure.com
**Subscription**: MSFT 2400 (80ffc621-4e29-4985-8e80-0320eee41179)
