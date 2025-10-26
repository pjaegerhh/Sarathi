# Create Azure Resources for Sarathi Project (Simple Approach)
# This script creates resources without GitHub integration initially

param(
    [Parameter(Mandatory=$false)]
    [string]$SubscriptionId = "80ffc621-4e29-4985-8e80-0320eee41179",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "Central India"
)

# Set the subscription context
Write-Host "Setting subscription context to: $SubscriptionId" -ForegroundColor Green
az account set --subscription $SubscriptionId

# Create Production Resource Group
Write-Host "Creating production resource group: sarathi-rg" -ForegroundColor Yellow
az group create `
    --name "sarathi-rg" `
    --location "$Location" `
    --tags "Environment=Production" "Project=Sarathi" "ManagedBy=PowerShell"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Production resource group 'sarathi-rg' created successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to create production resource group" -ForegroundColor Red
    exit 1
}

# Create Testing Resource Group
Write-Host "Creating testing resource group: sarathi-test-rg" -ForegroundColor Yellow
az group create `
    --name "sarathi-test-rg" `
    --location "$Location" `
    --tags "Environment=Testing" "Project=Sarathi" "ManagedBy=PowerShell"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Testing resource group 'sarathi-test-rg' created successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to create testing resource group" -ForegroundColor Red
    exit 1
}

# Create Production Storage Account
Write-Host "Creating production storage account: sarathidocs" -ForegroundColor Yellow
az storage account create `
    --name "sarathidocs" `
    --resource-group "sarathi-rg" `
    --location "$Location" `
    --sku "Standard_LRS" `
    --kind "StorageV2" `
    --access-tier "Hot" `
    --https-only true `
    --min-tls-version "TLS1_2" `
    --allow-blob-public-access false `
    --tags "Environment=Production" "Project=Sarathi" "ManagedBy=PowerShell"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Production storage account 'sarathidocs' created successfully" -ForegroundColor Green
    
    # Create a container for documents
    Write-Host "Creating 'documents' container in production storage account" -ForegroundColor Yellow
    az storage container create `
        --name "documents" `
        --account-name "sarathidocs" `
        --public-access "off"
    
    # Get storage account key
    $storageKey = az storage account keys list --account-name "sarathidocs" --resource-group "sarathi-rg" --query "[0].value" -o tsv
    Write-Host "🔑 Production storage key: $storageKey" -ForegroundColor Cyan
    Write-Host "⚠️  Save this key as AZURE_STORAGE_ACCOUNT_KEY_PROD in GitHub Secrets" -ForegroundColor Yellow
} else {
    Write-Host "❌ Failed to create production storage account" -ForegroundColor Red
    exit 1
}

# Create Testing Storage Account
Write-Host "Creating testing storage account: sarathitest" -ForegroundColor Yellow
az storage account create `
    --name "sarathitest" `
    --resource-group "sarathi-test-rg" `
    --location "$Location" `
    --sku "Standard_LRS" `
    --kind "StorageV2" `
    --access-tier "Hot" `
    --https-only true `
    --min-tls-version "TLS1_2" `
    --allow-blob-public-access false `
    --tags "Environment=Testing" "Project=Sarathi" "ManagedBy=PowerShell"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Testing storage account 'sarathitest' created successfully" -ForegroundColor Green
    
    # Create a container for documents
    Write-Host "Creating 'documents' container in testing storage account" -ForegroundColor Yellow
    az storage container create `
        --name "documents" `
        --account-name "sarathitest" `
        --public-access "off"
    
    # Get storage account key
    $storageKey = az storage account keys list --account-name "sarathitest" --resource-group "sarathi-test-rg" --query "[0].value" -o tsv
    Write-Host "🔑 Testing storage key: $storageKey" -ForegroundColor Cyan
    Write-Host "⚠️  Save this key as AZURE_STORAGE_ACCOUNT_KEY_TEST in GitHub Secrets" -ForegroundColor Yellow
} else {
    Write-Host "❌ Failed to create testing storage account" -ForegroundColor Red
    exit 1
}

Write-Host "`n🎉 All resources created successfully!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green
Write-Host ""
Write-Host "📋 What was created:" -ForegroundColor Yellow
Write-Host "✅ Resource Groups:" -ForegroundColor Green
Write-Host "   - sarathi-rg (Production)" -ForegroundColor Cyan
Write-Host "   - sarathi-test-rg (Testing)" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Storage Accounts:" -ForegroundColor Green
Write-Host "   - sarathidocs (Production)" -ForegroundColor Cyan
Write-Host "   - sarathitest (Testing)" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Create Static Web Apps manually in Azure Portal or use GitHub integration" -ForegroundColor White
Write-Host "2. Add storage account keys to GitHub Secrets" -ForegroundColor White
Write-Host "3. Configure GitHub Actions workflows" -ForegroundColor White
Write-Host "4. Test the deployment" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Azure Portal: https://portal.azure.com" -ForegroundColor Cyan
