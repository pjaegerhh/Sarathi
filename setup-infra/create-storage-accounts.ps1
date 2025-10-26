# Create Azure Storage Accounts for Sarathi Project
# This script creates the production and testing storage accounts

param(
    [Parameter(Mandatory=$false)]
    [string]$SubscriptionId = "80ffc621-4e29-4985-8e80-0320eee41179",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "Central India"
)

# Set the subscription context
Write-Host "Setting subscription context to: $SubscriptionId" -ForegroundColor Green
az account set --subscription $SubscriptionId

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
Write-Host "Creating testing storage account: sarathidocs-test" -ForegroundColor Yellow
az storage account create `
    --name "sarathidocs-test" `
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
    Write-Host "✅ Testing storage account 'sarathidocs-test' created successfully" -ForegroundColor Green
    
    # Create a container for documents
    Write-Host "Creating 'documents' container in testing storage account" -ForegroundColor Yellow
    az storage container create `
        --name "documents" `
        --account-name "sarathidocs-test" `
        --public-access "off"
    
    # Get storage account key
    $storageKey = az storage account keys list --account-name "sarathidocs-test" --resource-group "sarathi-test-rg" --query "[0].value" -o tsv
    Write-Host "🔑 Testing storage key: $storageKey" -ForegroundColor Cyan
    Write-Host "⚠️  Save this key as AZURE_STORAGE_ACCOUNT_KEY_TEST in GitHub Secrets" -ForegroundColor Yellow
} else {
    Write-Host "❌ Failed to create testing storage account" -ForegroundColor Red
    exit 1
}

Write-Host "`n🎉 All storage accounts created successfully!" -ForegroundColor Green
Write-Host "Production: sarathidocs" -ForegroundColor Cyan
Write-Host "Testing: sarathidocs-test" -ForegroundColor Cyan
Write-Host "`n📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Add storage account keys to GitHub Secrets" -ForegroundColor White
Write-Host "2. Configure CORS policies if needed" -ForegroundColor White
Write-Host "3. Set up lifecycle management policies" -ForegroundColor White
