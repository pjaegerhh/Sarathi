# Complete Sarathi Infrastructure Setup
# This script sets up the entire infrastructure for both production and testing environments

param(
    [Parameter(Mandatory=$false)]
    [string]$SubscriptionId = "80ffc621-4e29-4985-8e80-0320eee41179",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "Central India",
    
    [Parameter(Mandatory=$false)]
    [string]$RepositoryUrl = "https://github.com/your-username/sarathi"
)

Write-Host "🚀 Starting Complete Sarathi Infrastructure Setup" -ForegroundColor Green
Write-Host "Subscription: $SubscriptionId" -ForegroundColor Cyan
Write-Host "Location: $Location" -ForegroundColor Cyan
Write-Host "Repository: $RepositoryUrl" -ForegroundColor Cyan
Write-Host ""

# Check if Azure CLI is installed
Write-Host "Checking Azure CLI installation..." -ForegroundColor Yellow
try {
    $azVersion = az version --output tsv 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Azure CLI not found"
    }
    Write-Host "✅ Azure CLI found: $azVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Azure CLI is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Azure CLI from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli" -ForegroundColor Yellow
    exit 1
}

# Check if logged in to Azure
Write-Host "Checking Azure login status..." -ForegroundColor Yellow
try {
    $account = az account show --output json 2>$null | ConvertFrom-Json
    if ($LASTEXITCODE -ne 0) {
        throw "Not logged in"
    }
    Write-Host "✅ Logged in as: $($account.user.name)" -ForegroundColor Green
    Write-Host "Current subscription: $($account.name)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Not logged in to Azure" -ForegroundColor Red
    Write-Host "Please run: az login" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Deploy Testing Environment
Write-Host "🔧 Deploying Testing Environment..." -ForegroundColor Yellow
Write-Host "===============================================" -ForegroundColor Yellow
& ".\deploy-infrastructure.ps1" -Environment "testing" -SubscriptionId $SubscriptionId -Location $Location -RepositoryUrl $RepositoryUrl

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Testing environment deployment failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Deploy Production Environment
Write-Host "🔧 Deploying Production Environment..." -ForegroundColor Yellow
Write-Host "===============================================" -ForegroundColor Yellow
& ".\deploy-infrastructure.ps1" -Environment "production" -SubscriptionId $SubscriptionId -Location $Location -RepositoryUrl $RepositoryUrl

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Production environment deployment failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Summary
Write-Host "🎉 Complete Infrastructure Setup Finished!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green
Write-Host ""
Write-Host "📋 What was created:" -ForegroundColor Yellow
Write-Host "✅ Resource Groups:" -ForegroundColor Green
Write-Host "   - sarathi-rg (Production)" -ForegroundColor Cyan
Write-Host "   - sarathi-test-rg (Testing)" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Static Web Apps:" -ForegroundColor Green
Write-Host "   - sarathi (Production - main branch)" -ForegroundColor Cyan
Write-Host "   - sarathi-test (Testing - testing branch)" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Storage Accounts:" -ForegroundColor Green
Write-Host "   - sarathidocs (Production)" -ForegroundColor Cyan
Write-Host "   - sarathidocs-test (Testing)" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ GitHub Actions:" -ForegroundColor Green
Write-Host "   - .github/workflows/deploy-testing.yml" -ForegroundColor Cyan
Write-Host "   - .github/workflows/deploy-production.yml" -ForegroundColor Cyan
Write-Host ""

Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Update the repository URL in all scripts if needed" -ForegroundColor White
Write-Host "2. Add the deployment tokens to GitHub Secrets:" -ForegroundColor White
Write-Host "   - AZURE_STATIC_WEB_APPS_API_TOKEN_TEST" -ForegroundColor White
Write-Host "   - AZURE_STATIC_WEB_APPS_API_TOKEN_PROD" -ForegroundColor White
Write-Host "3. Add storage account information to GitHub Secrets:" -ForegroundColor White
Write-Host "   - VITE_AZURE_STORAGE_ACCOUNT_NAME_TEST" -ForegroundColor White
Write-Host "   - VITE_AZURE_STORAGE_CONTAINER_TEST" -ForegroundColor White
Write-Host "   - VITE_AZURE_STORAGE_ACCOUNT_NAME_PROD" -ForegroundColor White
Write-Host "   - VITE_AZURE_STORAGE_CONTAINER_PROD" -ForegroundColor White
Write-Host "4. Push code to 'testing' or 'main' branch to trigger deployment" -ForegroundColor White
Write-Host "5. Monitor deployments in GitHub Actions tab" -ForegroundColor White
Write-Host ""

Write-Host "🔗 Useful Links:" -ForegroundColor Yellow
Write-Host "- Azure Portal: https://portal.azure.com" -ForegroundColor Cyan
Write-Host "- GitHub Actions: https://github.com/your-username/sarathi/actions" -ForegroundColor Cyan
Write-Host "- Static Web Apps: https://portal.azure.com/#view/Microsoft_Azure_Websites/StaticWebAppMenuBlade/~/overview" -ForegroundColor Cyan
Write-Host ""

Write-Host "✨ Setup complete! Happy coding! 🚀" -ForegroundColor Green
