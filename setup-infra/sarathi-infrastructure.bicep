// Sarathi Infrastructure Bicep Template
// This template creates all Azure resources for the Sarathi project

@description('The name of the environment (production or testing)')
param environment string = 'production'

@description('The location for all resources')
param location string = 'Central India'

@description('The GitHub repository URL')
param repositoryUrl string = 'https://github.com/your-username/sarathi'

@description('The branch name for deployment')
param branchName string = environment == 'production' ? 'main' : 'testing'

// Variables
var resourceGroupName = environment == 'production' ? 'sarathi-rg' : 'sarathi-test-rg'
var staticWebAppName = environment == 'production' ? 'sarathi' : 'sarathi-test'
var storageAccountName = environment == 'production' ? 'sarathidocs' : 'sarathidocs-test'
var containerName = 'documents'

// Note: Resource group should be created separately before deploying this template
// This template assumes the resource group already exists

// Static Web App
resource staticWebApp 'Microsoft.Web/staticSites@2022-03-01' = {
  name: staticWebAppName
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    repositoryUrl: repositoryUrl
    branch: branchName
    buildProperties: {
      appLocation: '/'
      outputLocation: 'dist'
    }
  }
  tags: {
    Environment: environment
    Project: 'Sarathi'
    ManagedBy: 'Bicep'
  }
  dependsOn: []
}

// Storage Account
resource storageAccount 'Microsoft.Storage/storageAccounts@2021-09-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
  }
  tags: {
    Environment: environment
    Project: 'Sarathi'
    ManagedBy: 'Bicep'
  }
  dependsOn: []
}

// Blob Service
resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2021-09-01' = {
  parent: storageAccount
  name: 'default'
  properties: {
    cors: {
      corsRules: []
    }
    deleteRetentionPolicy: {
      enabled: false
    }
  }
  dependsOn: []
}

// Storage Container
resource storageContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2021-09-01' = {
  parent: blobService
  name: containerName
  properties: {
    publicAccess: 'None'
  }
  dependsOn: []
}

// Outputs
output resourceGroupName string = resourceGroupName
output staticWebAppName string = staticWebApp.name
output staticWebAppUrl string = staticWebApp.properties.defaultHostname
output storageAccountName string = storageAccount.name
output containerName string = storageContainer.name
