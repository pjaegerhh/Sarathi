we now have to setup azure and deployment to azure. 
i want you to create an ressourcegroup called sarathi-rg in regio centralindia in subscription MSFT2400.
in this rg we create the following:
- static web app called sarathi in region centralindia
- storage account sarathidocs in region centralindia

we create a second ressource group in region centralindia called sarathi-test-rg.
in this rg we create the following:
- static web app called sarathi-test in region centralindia
- storage account sarathidocs-test in region centralindia

we need to save this for future deployment in a bizep file and we want to create all azure instances from powershell. the files should be stored in a new directory .\setup-infra

we also need to create a github action to deploy to sarathi-test-rg which is our test environment. this automated deployment should take place when a new version is pushed to branch testing.

we also need to create a github action to deploy to sarathi-rg which is our production environment. this automated deployment should take place when a new version is pushed to branch main.

as an example here is a well working github action which can be used as an example for our new actions. although we dont have function apps or container app yet take it as good working example and adapt it: 

name: Deploy to Testing Environment

on:
  push:
    branches:
      - testing
  workflow_dispatch:

env:
  AZURE_FUNCTIONAPP_NAME: 'hrbuddys-storage-func-test'
  AZURE_CONTAINERAPP_NAME: 'hrbuddys-docx2pdf-test'
  AZURE_RESOURCE_GROUP: 'hrbuddys-test-rg'
  AZURE_CONTAINER_REGISTRY: 'hrbuddysacr'
  NODE_VERSION: '22'

jobs:
  # Job 0: Detect Changes
  detect_changes:
    name: Detect Changed Components
    runs-on: ubuntu-latest
    outputs:
      frontend: ${{ steps.filter.outputs.frontend }}
      functions: ${{ steps.filter.outputs.functions }}
      container: ${{ steps.filter.outputs.container }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          persist-credentials: false

      - name: Check changed paths
        uses: dorny/paths-filter@v2
        id: filter
        with:
          filters: |
            frontend:
              - 'components/**'
              - 'lib/**'
              - 'hooks/**'
              - 'contexts/**'
              - 'src/**'
              - 'styles/**'
              - 'assets/**'
              - 'index.html'
              - 'package.json'
              - 'package-lock.json'
              - 'vite.config.ts'
              - 'tsconfig.json'
              - 'tailwind.config.js'
              - 'staticwebapp.config.json'
            functions:
              - 'functions/**'
            container:
              - 'services/docx2pdf/**'

  # Job 1: Build and Deploy Static Web App
  deploy_static_web_app:
    name: Deploy Static Web App (Testing)
    runs-on: ubuntu-latest
    needs: detect_changes
    if: needs.detect_changes.outputs.frontend == 'true'
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          submodules: true
          persist-credentials: false

      - name: Deploy to Azure Static Web App (Testing)
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_TEST }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          api_location: ""
          output_location: "dist"
          skip_app_build: false
        env:
          VITE_APP_ENVIRONMENT: testing
          VITE_SUPABASE_URL_TEST: ${{ secrets.VITE_SUPABASE_URL_TEST }}
          VITE_SUPABASE_ANON_KEY_TEST: ${{ secrets.VITE_SUPABASE_ANON_KEY_TEST }}
          VITE_AZURE_STORAGE_ACCOUNT_NAME_TEST: ${{ secrets.VITE_AZURE_STORAGE_ACCOUNT_NAME_TEST }}
          VITE_AZURE_STORAGE_CONTAINER_TEST: ${{ secrets.VITE_AZURE_STORAGE_CONTAINER_TEST }}
          VITE_FUNCTIONS_BASE_URL_TEST: ${{ secrets.VITE_FUNCTIONS_BASE_URL_TEST }}
          VITE_DOCX_CONVERTER_URL_TEST: ${{ secrets.VITE_DOCX_CONVERTER_URL_TEST }}
          

  # Job 2: Build and Deploy Function App
  deploy_function_app:
    name: Deploy Function App (Testing)
    runs-on: ubuntu-latest
    needs: detect_changes
    if: needs.detect_changes.outputs.functions == 'true'
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          persist-credentials: false

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
          cache-dependency-path: 'functions/package-lock.json'

      - name: Install Azure Functions Core Tools
        run: |
          curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
          sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
          sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/microsoft-ubuntu-$(lsb_release -cs)-prod $(lsb_release -cs) main" > /etc/apt/sources.list.d/dotnetdev.list'
          sudo apt-get update
          sudo apt-get install azure-functions-core-tools-4

      - name: Install function app dependencies
        run: |
          cd functions
          npm ci

      - name: Build function app
        run: |
          cd functions
          npm run build

      - name: Login to Azure
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS_TEST }}

      - name: Deploy to Azure Functions
        run: |
          cd functions
          func azure functionapp publish ${{ env.AZURE_FUNCTIONAPP_NAME }} --typescript

      - name: Azure logout
        run: az logout
        if: always()

  # Job 3: Build and Deploy Container App (DOCX Converter)
  deploy_container_app:
    name: Deploy Container App (Testing)
    runs-on: ubuntu-latest
    needs: detect_changes
    if: needs.detect_changes.outputs.container == 'true'
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          persist-credentials: false

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
          cache-dependency-path: 'services/docx2pdf/package-lock.json'

      - name: Install container app dependencies
        run: |
          cd services/docx2pdf
          npm ci

      - name: Build container app
        run: |
          cd services/docx2pdf
          npm run build

      - name: Login to Azure Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.AZURE_CONTAINER_REGISTRY }}.azurecr.io
          username: ${{ secrets.ACR_USERNAME }}
          password: ${{ secrets.ACR_PASSWORD }}

      - name: Build and push Docker image
        run: |
          cd services/docx2pdf
          docker build -t ${{ env.AZURE_CONTAINER_REGISTRY }}.azurecr.io/docx2pdf:test .
          docker tag ${{ env.AZURE_CONTAINER_REGISTRY }}.azurecr.io/docx2pdf:test ${{ env.AZURE_CONTAINER_REGISTRY }}.azurecr.io/docx2pdf:test-${{ github.sha }}
          docker push ${{ env.AZURE_CONTAINER_REGISTRY }}.azurecr.io/docx2pdf:test
          docker push ${{ env.AZURE_CONTAINER_REGISTRY }}.azurecr.io/docx2pdf:test-${{ github.sha }}

      - name: Login to Azure for Container App Update
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS_TEST }}

      - name: Update Container App
        run: |
          az containerapp update \
            --name ${{ env.AZURE_CONTAINERAPP_NAME }} \
            --resource-group ${{ env.AZURE_RESOURCE_GROUP }} \
            --image ${{ env.AZURE_CONTAINER_REGISTRY }}.azurecr.io/docx2pdf:test

      - name: Azure logout
        run: az logout
        if: always()

  # Job 4: Deployment Summary
  deployment_summary:
    name: Deployment Summary
    runs-on: ubuntu-latest
    needs: [detect_changes, deploy_static_web_app, deploy_function_app, deploy_container_app]
    if: always()
    
    steps:
      - name: Summary
        run: |
          echo "## 🚀 Testing Environment Deployment Summary" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "### Change Detection:" >> $GITHUB_STEP_SUMMARY
          echo "- Frontend changes: ${{ needs.detect_changes.outputs.frontend }}" >> $GITHUB_STEP_SUMMARY
          echo "- Functions changes: ${{ needs.detect_changes.outputs.functions }}" >> $GITHUB_STEP_SUMMARY
          echo "- Container changes: ${{ needs.detect_changes.outputs.container }}" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "### Deployed Components:" >> $GITHUB_STEP_SUMMARY
          if [ "${{ needs.detect_changes.outputs.frontend }}" == "true" ]; then
            if [ "${{ needs.deploy_static_web_app.result }}" == "success" ]; then
              echo "- ✅ Static Web App: hrbuddys-v2-test" >> $GITHUB_STEP_SUMMARY
            else
              echo "- ❌ Static Web App: Deployment failed" >> $GITHUB_STEP_SUMMARY
            fi
          else
            echo "- ⏭️ Static Web App: Skipped (no changes)" >> $GITHUB_STEP_SUMMARY
          fi
          
          if [ "${{ needs.detect_changes.outputs.functions }}" == "true" ]; then
            if [ "${{ needs.deploy_function_app.result }}" == "success" ]; then
              echo "- ✅ Function App: ${{ env.AZURE_FUNCTIONAPP_NAME }}" >> $GITHUB_STEP_SUMMARY
            else
              echo "- ❌ Function App: Deployment failed" >> $GITHUB_STEP_SUMMARY
            fi
          else
            echo "- ⏭️ Function App: Skipped (no changes)" >> $GITHUB_STEP_SUMMARY
          fi
          
          if [ "${{ needs.detect_changes.outputs.container }}" == "true" ]; then
            if [ "${{ needs.deploy_container_app.result }}" == "success" ]; then
              echo "- ✅ Container App: ${{ env.AZURE_CONTAINERAPP_NAME }}" >> $GITHUB_STEP_SUMMARY
            else
              echo "- ❌ Container App: Deployment failed" >> $GITHUB_STEP_SUMMARY
            fi
          else
            echo "- ⏭️ Container App: Skipped (no changes)" >> $GITHUB_STEP_SUMMARY
          fi
          
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "### Environment:" >> $GITHUB_STEP_SUMMARY
          echo "- Resource Group: ${{ env.AZURE_RESOURCE_GROUP }}" >> $GITHUB_STEP_SUMMARY
          echo "- Branch: testing" >> $GITHUB_STEP_SUMMARY
          echo "- Commit: ${{ github.sha }}" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "### Access:" >> $GITHUB_STEP_SUMMARY
          echo "- URL: https://testing.hrbuddys.com" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "**Note:** Only components with changes were deployed" >> $GITHUB_STEP_SUMMARY
