# Upgrade Static Web Apps to Standard Plan
# This script upgrades both static web apps from Free to Standard plan

param(
    [Parameter(Mandatory=$false)]
    [string]$SubscriptionId = "80ffc621-4e29-4985-8e80-0320eee41179"
)

# Set the subscription context
Write-Host "Setting subscription context to: $SubscriptionId" -ForegroundColor Green
az account set --subscription $SubscriptionId

Write-Host "`n📋 Upgrading Static Web Apps to Standard Plan" -ForegroundColor Yellow
Write-Host "=============================================" -ForegroundColor Yellow
Write-Host "This will upgrade both static web apps to remove the 250MB size limit" -ForegroundColor Cyan
Write-Host ""

# Upgrade Testing Static Web App
Write-Host "Upgrading testing static web app: sarathi-test" -ForegroundColor Yellow

az staticwebapp update `
    --name "sarathi-test" `
    --resource-group "sarathi-test-rg" `
    --sku "Standard"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Testing static web app 'sarathi-test' upgraded to Standard plan" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to upgrade testing static web app" -ForegroundColor Red
    Write-Host "Error details:" -ForegroundColor Yellow
    Write-Host $LASTEXITCODE -ForegroundColor Red
    exit 1
}

Write-Host ""

# Upgrade Production Static Web App
Write-Host "Upgrading production static web app: sarathi" -ForegroundColor Yellow

az staticwebapp update `
    --name "sarathi" `
    --resource-group "sarathi-rg" `
    --sku "Standard"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Production static web app 'sarathi' upgraded to Standard plan" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to upgrade production static web app" -ForegroundColor Red
    Write-Host "Error details:" -ForegroundColor Yellow
    Write-Host $LASTEXITCODE -ForegroundColor Red
    exit 1
}

Write-Host "`n🎉 All static web apps upgraded successfully!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Summary:" -ForegroundColor Yellow
Write-Host "Testing Static Web App: sarathi-test (Standard plan)" -ForegroundColor Cyan
Write-Host "Production Static Web App: sarathi (Standard plan)" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Benefits of Standard plan:" -ForegroundColor Green
Write-Host "- Higher app size limit (no 250MB restriction)" -ForegroundColor White
Write-Host "- Custom domains support" -ForegroundColor White
Write-Host "- Staging environments" -ForegroundColor White
Write-Host "- Advanced features" -ForegroundColor White
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Re-run the GitHub Actions deployment" -ForegroundColor White
Write-Host "2. The deployment should now succeed with the larger size limit" -ForegroundColor White
Write-Host "3. Monitor the deployment in GitHub Actions" -ForegroundColor White
Write-Host ""
Write-Host "🔗 GitHub Actions: https://github.com/pjaegerhh/Sarathi/actions" -ForegroundColor Cyan
Write-Host "Azure Portal: https://portal.azure.com" -ForegroundColor Cyan