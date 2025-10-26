# Create Azure Static Web Apps for Sarathi Project with GitHub Integration
# This script creates the production and testing static web apps

param(
    [Parameter(Mandatory=$false)]
    [string]$SubscriptionId = "80ffc621-4e29-4985-8e80-0320eee41179",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "East Asia",  # Static Web Apps not available in Central India
    
    [Parameter(Mandatory=$true)]
    [string]$GitHubRepo,
    
    [Parameter(Mandatory=$false)]
    [string]$GitHubToken
)

# Set the subscription context
Write-Host "Setting subscription context to: $SubscriptionId" -ForegroundColor Green
az account set --subscription $SubscriptionId

Write-Host "`n📋 Creating Static Web Apps for Sarathi Project" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Yellow
Write-Host "Repository: $GitHubRepo" -ForegroundColor Cyan
Write-Host "`n⚠️  Note: This will require GitHub authentication" -ForegroundColor Yellow
Write-Host ""

# Create Testing Static Web App
Write-Host "Creating testing static web app: sarathi-test" -ForegroundColor Yellow

if ($GitHubToken) {
    # Use provided GitHub token
    $env:GITHUB_TOKEN = $GitHubToken
    az staticwebapp create `
        --name "sarathi-test" `
        --resource-group "sarathi-test-rg" `
        --location "$Location" `
        --source $GitHubRepo `
        --branch "testing" `
        --app-location "/" `
        --output-location "dist" `
        --token $GitHubToken `
        --tags "Environment=Testing" "Project=Sarathi" "ManagedBy=PowerShell"
} else {
    # Use GitHub login
    az staticwebapp create `
        --name "sarathi-test" `
        --resource-group "sarathi-test-rg" `
        --location "$Location" `
        --source $GitHubRepo `
        --branch "testing" `
        --app-location "/" `
        --output-location "dist" `
        --login-with-github `
        --tags "Environment=Testing" "Project=Sarathi" "ManagedBy=PowerShell"
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Testing static web app 'sarathi-test' created successfully" -ForegroundColor Green
    
    # Get the deployment token for GitHub Actions
    Write-Host "Getting deployment token for testing environment..." -ForegroundColor Yellow
    $testToken = az staticwebapp secrets list --name "sarathi-test" --resource-group "sarathi-test-rg" --query "properties.apiKey" -o tsv
    
    if ($testToken) {
        Write-Host "`n🔑 Testing Environment Deployment Token:" -ForegroundColor Cyan
        Write-Host $testToken -ForegroundColor White
        Write-Host "`n⚠️  Save this token as AZURE_STATIC_WEB_APPS_API_TOKEN_TEST in GitHub Secrets" -ForegroundColor Yellow
        
        # Save to file
        $testToken | Out-File -FilePath ".\sarathi-test-deployment-token.txt" -NoNewline
        Write-Host "📝 Token saved to: .\sarathi-test-deployment-token.txt" -ForegroundColor Cyan
    }
    
    # Get the default hostname
    $testHostname = az staticwebapp show --name "sarathi-test" --resource-group "sarathi-test-rg" --query "defaultHostname" -o tsv
    Write-Host "🌐 Testing URL: https://$testHostname" -ForegroundColor Cyan
} else {
    Write-Host "❌ Failed to create testing static web app" -ForegroundColor Red
    Write-Host "If GitHub authentication failed, try running with --login-with-github flag or provide a GitHub token" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Create Production Static Web App
Write-Host "Creating production static web app: sarathi" -ForegroundColor Yellow

if ($GitHubToken) {
    # Use provided GitHub token
    az staticwebapp create `
        --name "sarathi" `
        --resource-group "sarathi-rg" `
        --location "$Location" `
        --source $GitHubRepo `
        --branch "main" `
        --app-location "/" `
        --output-location "dist" `
        --token $GitHubToken `
        --tags "Environment=Production" "Project=Sarathi" "ManagedBy=PowerShell"
} else {
    # Use GitHub login
    az staticwebapp create `
        --name "sarathi" `
        --resource-group "sarathi-rg" `
        --location "$Location" `
        --source $GitHubRepo `
        --branch "main" `
        --app-location "/" `
        --output-location "dist" `
        --login-with-github `
        --tags "Environment=Production" "Project=Sarathi" "ManagedBy=PowerShell"
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Production static web app 'sarathi' created successfully" -ForegroundColor Green
    
    # Get the deployment token for GitHub Actions
    Write-Host "Getting deployment token for production environment..." -ForegroundColor Yellow
    $prodToken = az staticwebapp secrets list --name "sarathi" --resource-group "sarathi-rg" --query "properties.apiKey" -o tsv
    
    if ($prodToken) {
        Write-Host "`n🔑 Production Environment Deployment Token:" -ForegroundColor Cyan
        Write-Host $prodToken -ForegroundColor White
        Write-Host "`n⚠️  Save this token as AZURE_STATIC_WEB_APPS_API_TOKEN_PROD in GitHub Secrets" -ForegroundColor Yellow
        
        # Save to file
        $prodToken | Out-File -FilePath ".\sarathi-prod-deployment-token.txt" -NoNewline
        Write-Host "📝 Token saved to: .\sarathi-prod-deployment-token.txt" -ForegroundColor Cyan
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
Write-Host "Testing Static Web App: sarathi-test (testing branch)" -ForegroundColor Cyan
Write-Host "Production Static Web App: sarathi (main branch)" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Add deployment tokens to GitHub Secrets:" -ForegroundColor White
Write-Host "   - AZURE_STATIC_WEB_APPS_API_TOKEN_TEST" -ForegroundColor White
Write-Host "   - AZURE_STATIC_WEB_APPS_API_TOKEN_PROD" -ForegroundColor White
Write-Host "2. Tokens are saved in the current directory" -ForegroundColor White
Write-Host "3. Push to 'testing' or 'main' branch to trigger deployment" -ForegroundColor White
Write-Host "4. ⚠️  DELETE the token files after adding them to GitHub Secrets!" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔗 GitHub Repository Settings:" -ForegroundColor Yellow
Write-Host "https://github.com/<your-username>/sarathi/settings/secrets/actions" -ForegroundColor Cyan
