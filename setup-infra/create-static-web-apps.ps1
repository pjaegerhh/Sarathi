# Create Azure Static Web Apps for Sarathi Project
# This script creates the production and testing static web apps

param(
    [Parameter(Mandatory=$false)]
    [string]$SubscriptionId = "80ffc621-4e29-4985-8e80-0320eee41179",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "Central India"
)

# Set the subscription context
Write-Host "Setting subscription context to: $SubscriptionId" -ForegroundColor Green
az account set --subscription $SubscriptionId

# Create Production Static Web App
Write-Host "Creating production static web app: sarathi" -ForegroundColor Yellow
az staticwebapp create `
    --name "sarathi" `
    --resource-group "sarathi-rg" `
    --location "$Location" `
    --source "https://github.com/your-username/sarathi" `
    --branch "main" `
    --app-location "/" `
    --output-location "dist" `
    --tags "Environment=Production" "Project=Sarathi" "ManagedBy=PowerShell"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Production static web app 'sarathi' created successfully" -ForegroundColor Green
    
    # Get the deployment token for GitHub Actions
    $deploymentToken = az staticwebapp secrets list --name "sarathi" --resource-group "sarathi-rg" --query "properties.apiKey" -o tsv
    Write-Host "🔑 Production deployment token: $deploymentToken" -ForegroundColor Cyan
    Write-Host "⚠️  Save this token as AZURE_STATIC_WEB_APPS_API_TOKEN_PROD in GitHub Secrets" -ForegroundColor Yellow
} else {
    Write-Host "❌ Failed to create production static web app" -ForegroundColor Red
    exit 1
}

# Create Testing Static Web App
Write-Host "Creating testing static web app: sarathi-test" -ForegroundColor Yellow
az staticwebapp create `
    --name "sarathi-test" `
    --resource-group "sarathi-test-rg" `
    --location "$Location" `
    --source "https://github.com/your-username/sarathi" `
    --branch "testing" `
    --app-location "/" `
    --output-location "dist" `
    --tags "Environment=Testing" "Project=Sarathi" "ManagedBy=PowerShell"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Testing static web app 'sarathi-test' created successfully" -ForegroundColor Green
    
    # Get the deployment token for GitHub Actions
    $deploymentToken = az staticwebapp secrets list --name "sarathi-test" --resource-group "sarathi-test-rg" --query "properties.apiKey" -o tsv
    Write-Host "🔑 Testing deployment token: $deploymentToken" -ForegroundColor Cyan
    Write-Host "⚠️  Save this token as AZURE_STATIC_WEB_APPS_API_TOKEN_TEST in GitHub Secrets" -ForegroundColor Yellow
} else {
    Write-Host "❌ Failed to create testing static web app" -ForegroundColor Red
    exit 1
}

Write-Host "`n🎉 All static web apps created successfully!" -ForegroundColor Green
Write-Host "Production: sarathi (main branch)" -ForegroundColor Cyan
Write-Host "Testing: sarathi-test (testing branch)" -ForegroundColor Cyan
Write-Host "`n📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Update GitHub repository URL in the script" -ForegroundColor White
Write-Host "2. Add deployment tokens to GitHub Secrets" -ForegroundColor White
Write-Host "3. Configure GitHub Actions workflows" -ForegroundColor White
