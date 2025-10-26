# Create Azure Static Web Apps without GitHub Integration
# This creates "empty" static web apps that GitHub Actions can deploy to

param(
    [Parameter(Mandatory=$false)]
    [string]$SubscriptionId = "80ffc621-4e29-4985-8e80-0320eee41179",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "East Asia"  # Static Web Apps not available in Central India
)

# Set the subscription context
Write-Host "Setting subscription context to: $SubscriptionId" -ForegroundColor Green
az account set --subscription $SubscriptionId

Write-Host "`n📋 Creating Static Web Apps (without GitHub integration)" -ForegroundColor Yellow
Write-Host "=========================================================" -ForegroundColor Yellow
Write-Host "These apps will be created without repository links." -ForegroundColor Cyan
Write-Host "GitHub Actions will deploy to them using deployment tokens." -ForegroundColor Cyan
Write-Host ""

# Create Testing Static Web App
Write-Host "Creating testing static web app: sarathi-test" -ForegroundColor Yellow

az staticwebapp create `
    --name "sarathi-test" `
    --resource-group "sarathi-test-rg" `
    --location "$Location" `
    --sku "Free" `
    --tags "Environment=Testing" "Project=Sarathi" "ManagedBy=PowerShell"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Testing static web app 'sarathi-test' created successfully" -ForegroundColor Green
    
    # Get the deployment token for GitHub Actions
    Write-Host "Getting deployment token for testing environment..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5  # Wait for resource to be fully provisioned
    
    $testToken = az staticwebapp secrets list --name "sarathi-test" --resource-group "sarathi-test-rg" --query "properties.apiKey" -o tsv
    
    if ($testToken) {
        Write-Host "`n🔑 Testing Environment Deployment Token:" -ForegroundColor Cyan
        Write-Host $testToken -ForegroundColor White
        Write-Host "`n⚠️  Save this token as AZURE_STATIC_WEB_APPS_API_TOKEN_TEST in GitHub Secrets" -ForegroundColor Yellow
        
        # Save to file
        $testToken | Out-File -FilePath ".\sarathi-test-deployment-token.txt" -NoNewline
        Write-Host "📝 Token saved to: .\sarathi-test-deployment-token.txt" -ForegroundColor Cyan
    } else {
        Write-Host "⚠️  Could not retrieve deployment token. Try running:" -ForegroundColor Yellow
        Write-Host "az staticwebapp secrets list --name 'sarathi-test' --resource-group 'sarathi-test-rg'" -ForegroundColor White
    }
    
    # Get the default hostname
    $testHostname = az staticwebapp show --name "sarathi-test" --resource-group "sarathi-test-rg" --query "defaultHostname" -o tsv
    Write-Host "🌐 Testing URL: https://$testHostname" -ForegroundColor Cyan
} else {
    Write-Host "❌ Failed to create testing static web app" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Create Production Static Web App
Write-Host "Creating production static web app: sarathi" -ForegroundColor Yellow

az staticwebapp create `
    --name "sarathi" `
    --resource-group "sarathi-rg" `
    --location "$Location" `
    --sku "Free" `
    --tags "Environment=Production" "Project=Sarathi" "ManagedBy=PowerShell"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Production static web app 'sarathi' created successfully" -ForegroundColor Green
    
    # Get the deployment token for GitHub Actions
    Write-Host "Getting deployment token for production environment..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5  # Wait for resource to be fully provisioned
    
    $prodToken = az staticwebapp secrets list --name "sarathi" --resource-group "sarathi-rg" --query "properties.apiKey" -o tsv
    
    if ($prodToken) {
        Write-Host "`n🔑 Production Environment Deployment Token:" -ForegroundColor Cyan
        Write-Host $prodToken -ForegroundColor White
        Write-Host "`n⚠️  Save this token as AZURE_STATIC_WEB_APPS_API_TOKEN_PROD in GitHub Secrets" -ForegroundColor Yellow
        
        # Save to file
        $prodToken | Out-File -FilePath ".\sarathi-prod-deployment-token.txt" -NoNewline
        Write-Host "📝 Token saved to: .\sarathi-prod-deployment-token.txt" -ForegroundColor Cyan
    } else {
        Write-Host "⚠️  Could not retrieve deployment token. Try running:" -ForegroundColor Yellow
        Write-Host "az staticwebapp secrets list --name 'sarathi' --resource-group 'sarathi-rg'" -ForegroundColor White
    }
    
    # Get the default hostname
    $prodHostname = az staticwebapp show --name "sarathi" --resource-group "sarathi-rg" --query "defaultHostname" -o tsv
    Write-Host "🌐 Production URL: https://$prodHostname" -ForegroundColor Cyan
} else {
    Write-Host "❌ Failed to create production static web app" -ForegroundColor Red
    exit 1
}

Write-Host "`n🎉 All static web apps created successfully!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Summary:" -ForegroundColor Yellow
Write-Host "Testing Static Web App: sarathi-test" -ForegroundColor Cyan
Write-Host "Production Static Web App: sarathi" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Add deployment tokens to GitHub Secrets:" -ForegroundColor White
Write-Host "   - Go to: https://github.com/<your-repo>/settings/secrets/actions" -ForegroundColor White
Write-Host "   - Add: AZURE_STATIC_WEB_APPS_API_TOKEN_TEST (from sarathi-test-deployment-token.txt)" -ForegroundColor White
Write-Host "   - Add: AZURE_STATIC_WEB_APPS_API_TOKEN_PROD (from sarathi-prod-deployment-token.txt)" -ForegroundColor White
Write-Host ""
Write-Host "2. Push code to trigger deployments:" -ForegroundColor White
Write-Host "   - Push to 'testing' branch → deploys to sarathi-test" -ForegroundColor White
Write-Host "   - Push to 'main' branch → deploys to sarathi" -ForegroundColor White
Write-Host ""
Write-Host "3. ⚠️  IMPORTANT: Delete the token files after adding them to GitHub Secrets!" -ForegroundColor Yellow
Write-Host "   - Delete: sarathi-test-deployment-token.txt" -ForegroundColor White
Write-Host "   - Delete: sarathi-prod-deployment-token.txt" -ForegroundColor White
Write-Host ""
Write-Host "🔗 View your apps:" -ForegroundColor Yellow
Write-Host "Azure Portal: https://portal.azure.com" -ForegroundColor Cyan
