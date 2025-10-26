# Deploy Sarathi Infrastructure using Bicep
# This script deploys the complete infrastructure for production or testing environment

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet('production', 'testing')]
    [string]$Environment,
    
    [Parameter(Mandatory=$false)]
    [string]$SubscriptionId = "80ffc621-4e29-4985-8e80-0320eee41179",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "Central India",
    
    [Parameter(Mandatory=$false)]
    [string]$RepositoryUrl = "https://github.com/your-username/sarathi"
)

# Set the subscription context
Write-Host "Setting subscription context to: $SubscriptionId" -ForegroundColor Green
az account set --subscription $SubscriptionId

# Determine resource group and deployment name
$resourceGroupName = if ($Environment -eq 'production') { 'sarathi-rg' } else { 'sarathi-test-rg' }
$deploymentName = "sarathi-$Environment-$(Get-Date -Format 'yyyyMMdd-HHmmss')"

Write-Host "Deploying $Environment environment infrastructure..." -ForegroundColor Yellow
Write-Host "Resource Group: $resourceGroupName" -ForegroundColor Cyan
Write-Host "Deployment Name: $deploymentName" -ForegroundColor Cyan

# First, ensure the resource group exists
Write-Host "Ensuring resource group exists: $resourceGroupName" -ForegroundColor Yellow
az group create `
    --name $resourceGroupName `
    --location $Location `
    --tags "Environment=$Environment" "Project=Sarathi" "ManagedBy=PowerShell"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to create resource group" -ForegroundColor Red
    exit 1
}

# Deploy the Bicep template to the resource group
az deployment group create `
    --resource-group $resourceGroupName `
    --template-file ".\sarathi-infrastructure.bicep" `
    --name $deploymentName `
    --parameters `
        environment=$Environment `
        location=$Location `
        repositoryUrl=$RepositoryUrl

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Infrastructure deployed successfully!" -ForegroundColor Green
    
    # Get deployment outputs
    Write-Host "`n📋 Deployment Outputs:" -ForegroundColor Yellow
    $outputs = az deployment group show --resource-group $resourceGroupName --name $deploymentName --query "properties.outputs" -o json | ConvertFrom-Json
    
    Write-Host "Static Web App Name: $($outputs.staticWebAppName.value)" -ForegroundColor Cyan
    Write-Host "Static Web App URL: $($outputs.staticWebAppUrl.value)" -ForegroundColor Cyan
    Write-Host "Storage Account Name: $($outputs.storageAccountName.value)" -ForegroundColor Cyan
    Write-Host "Container Name: $($outputs.containerName.value)" -ForegroundColor Cyan
    
    # Get deployment tokens
    Write-Host "`n🔑 Getting deployment tokens..." -ForegroundColor Yellow
    
    $staticWebAppName = $outputs.staticWebAppName.value
    $deploymentToken = az staticwebapp secrets list --name $staticWebAppName --resource-group $resourceGroupName --query "properties.apiKey" -o tsv
    
    Write-Host "Deployment Token: $deploymentToken" -ForegroundColor Cyan
    Write-Host "⚠️  Save this token as AZURE_STATIC_WEB_APPS_API_TOKEN_$($Environment.ToUpper()) in GitHub Secrets" -ForegroundColor Yellow
    
    # Get storage account key
    $storageAccountName = $outputs.storageAccountName.value
    $storageKey = az storage account keys list --account-name $storageAccountName --resource-group $resourceGroupName --query "[0].value" -o tsv
    
    Write-Host "Storage Account Key: $storageKey" -ForegroundColor Cyan
    Write-Host "⚠️  Save this key as AZURE_STORAGE_ACCOUNT_KEY_$($Environment.ToUpper()) in GitHub Secrets" -ForegroundColor Yellow
    
} else {
    Write-Host "❌ Infrastructure deployment failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`n🎉 $Environment environment setup complete!" -ForegroundColor Green
Write-Host "`n📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Update GitHub repository URL in the script" -ForegroundColor White
Write-Host "2. Add deployment tokens and storage keys to GitHub Secrets" -ForegroundColor White
Write-Host "3. Configure GitHub Actions workflows" -ForegroundColor White
Write-Host "4. Test the deployment" -ForegroundColor White
