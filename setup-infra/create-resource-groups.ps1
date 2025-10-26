# Create Azure Resource Groups for Sarathi Project
# This script creates the production and testing resource groups

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

Write-Host "`n🎉 All resource groups created successfully!" -ForegroundColor Green
Write-Host "Production: sarathi-rg" -ForegroundColor Cyan
Write-Host "Testing: sarathi-test-rg" -ForegroundColor Cyan
