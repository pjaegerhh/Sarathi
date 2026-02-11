# One-time creation of Azure Function App for Sarathi Supabase Ping (Production)
# Run this once to create the function app; GitHub Actions will deploy and set app settings.
# Requires: AZURE_CREDENTIALS or az login, resource group sarathi-rg, storage account sarathidocs.

param(
    [Parameter(Mandatory = $false)]
    [string]$SubscriptionId = "80ffc621-4e29-4985-8e80-0320eee41179",

    [Parameter(Mandatory = $false)]
    [string]$Location = "centralindia",

    [Parameter(Mandatory = $false)]
    [string]$ResourceGroup = "sarathi-rg",

    [Parameter(Mandatory = $false)]
    [string]$StorageAccount = "sarathidocs",

    [Parameter(Mandatory = $false)]
    [string]$FunctionAppName = "sarathi-scheduler"
)

Write-Host "Setting subscription context to: $SubscriptionId" -ForegroundColor Green
az account set --subscription $SubscriptionId

Write-Host "Creating Function App: $FunctionAppName (production Supabase ping)" -ForegroundColor Yellow
az functionapp create `
    --name $FunctionAppName `
    --resource-group $ResourceGroup `
    --storage-account $StorageAccount `
    --consumption-plan-location $Location `
    --runtime node `
    --runtime-version 22 `
    --functions-version 4 `
    --os-type Linux

if ($LASTEXITCODE -eq 0) {
    Write-Host "Function App '$FunctionAppName' created. Configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in GitHub Secrets; the deploy workflow will set app settings on each deploy." -ForegroundColor Green
    Write-Host "Manual health check: https://$FunctionAppName.azurewebsites.net/api/supabase-ping" -ForegroundColor Cyan
} else {
    Write-Host "Failed to create Function App" -ForegroundColor Red
    exit 1
}
