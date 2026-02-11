# Create Azure service principal and output AZURE_CREDENTIALS JSON for GitHub Secrets
# Used by: deploy-production.yml (scheduler deploy), azure/login@v2
# Run once, copy the printed JSON into GitHub repo secret AZURE_CREDENTIALS
# Requires: az login (and permissions to create app registrations / service principals)

param(
    [Parameter(Mandatory = $false)]
    [string]$SubscriptionId = "80ffc621-4e29-4985-8e80-0320eee41179",

    [Parameter(Mandatory = $false)]
    [string]$ResourceGroup = "sarathi-rg",

    [Parameter(Mandatory = $false)]
    [string]$SpName = "Sarathi-GitHub-Actions"
)

$ErrorActionPreference = "Stop"

# Ensure logged in and set subscription
Write-Host "Using subscription: $SubscriptionId" -ForegroundColor Cyan
az account set --subscription $SubscriptionId
$account = az account show | ConvertFrom-Json
$tenantId = $account.tenantId
if ($SubscriptionId -ne $account.id) {
    Write-Host "Subscription set to: $($account.id)" -ForegroundColor Yellow
    $SubscriptionId = $account.id
}

# Scope to resource group (least privilege) so the SP can deploy to sarathi-rg only
$scope = "/subscriptions/$SubscriptionId/resourceGroups/$ResourceGroup"
Write-Host "Creating service principal '$SpName' with Contributor on: $ResourceGroup" -ForegroundColor Yellow

# Create service principal; password is only shown once in the output
$sp = az ad sp create-for-rbac --name $SpName --role "Contributor" --scopes $scope | ConvertFrom-Json
$clientId = $sp.appId
$clientSecret = $sp.password

# Build JSON in the exact format azure/login@v2 expects
$output = @{
    clientId       = $clientId
    clientSecret   = $clientSecret
    subscriptionId = $SubscriptionId
    tenantId       = $tenantId
} | ConvertTo-Json -Compress

Write-Host ""
Write-Host "============ COPY BELOW INTO GITHUB SECRET AZURE_CREDENTIALS ============" -ForegroundColor Green
Write-Host $output -ForegroundColor White
Write-Host "============ END ============" -ForegroundColor Green
Write-Host ""
Write-Host "Steps:" -ForegroundColor Cyan
Write-Host "  1. GitHub repo -> Settings -> Secrets and variables -> Actions" -ForegroundColor White
Write-Host "  2. New repository secret: Name = AZURE_CREDENTIALS" -ForegroundColor White
Write-Host "  3. Value = the single-line JSON above (entire line)" -ForegroundColor White
Write-Host ""
Write-Host "Keep this JSON confidential. The client secret cannot be retrieved again." -ForegroundColor Yellow
