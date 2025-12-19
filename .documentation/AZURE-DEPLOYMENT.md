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

**See `setup-infra/DEPLOYMENT-SUMMARY.md` for the actual token values.**

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
