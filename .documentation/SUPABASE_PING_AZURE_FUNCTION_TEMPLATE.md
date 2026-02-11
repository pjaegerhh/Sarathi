# Supabase ping Azure Function – copy-paste template

Use this in **other projects** to add a standalone Azure Function that pings your Supabase instance every 2 hours (and exposes an HTTP endpoint for manual checks), without redoing the setup we fixed here (lockfile, `func` install, runner image, etc.).

---

## 1. What you need

- Azure subscription, resource group, and a **storage account** (consumption plan needs one).
- GitHub repo with **secrets**: `AZURE_CREDENTIALS`, `VITE_SUPABASE_URL` (or `SUPABASE_URL`), `SUPABASE_SERVICE_ROLE_KEY`.
- Decide: function app name (e.g. `myapp-scheduler`), resource group (e.g. `myapp-rg`), storage account name.

---

## 2. Folder structure to add

Add a `scheduler/` directory at the repo root:

```
scheduler/
├── .funcignore
├── host.json
├── package.json
├── package-lock.json   # generate with: cd scheduler && npm install
├── tsconfig.json
└── src/
    └── functions/
        └── supabase-ping.ts
```

---

## 3. File contents

### `scheduler/.funcignore`

```
*.js.map
*.ts
.git*
.vscode
local.settings.json
test
tsconfig.json
node_modules/@types
```

### `scheduler/host.json`

```json
{"version":"2.0","extensionBundle":{"id":"Microsoft.Azure.Functions.ExtensionBundle","version":"[4.*, 5.0.0)"}}
```

### `scheduler/package.json`

Replace `YOUR-PROJECT-NAME` with a short name (e.g. `myapp-scheduler`).

```json
{
  "name": "YOUR-PROJECT-NAME-scheduler",
  "version": "1.0.0",
  "private": true,
  "type": "commonjs",
  "main": "dist/src/functions/*.js",
  "engines": { "node": ">=22" },
  "scripts": {
    "build": "tsc",
    "watch": "tsc -w",
    "prestart": "npm run build",
    "start": "func start"
  },
  "dependencies": {
    "@azure/functions": "^4.5.0",
    "@supabase/supabase-js": "^2.84.0"
  },
  "devDependencies": {
    "typescript": "~5.9.3"
  }
}
```

Then run **once** in `scheduler/`: `npm install` → commit the generated `package-lock.json`.

### `scheduler/tsconfig.json`

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2022",
    "lib": ["ES2022"],
    "outDir": "dist",
    "rootDir": ".",
    "sourceMap": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

### `scheduler/src/functions/supabase-ping.ts`

**Adapt:** Set `PING_TABLE` to any table that exists in your Supabase project (used for a single-row health query). Optionally use app setting `SUPABASE_PING_TABLE` to override.

```ts
/**
 * Timer: pings Supabase every 2 hours.
 * HTTP GET: manual health check at /api/supabase-ping.
 * Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY; optional SUPABASE_PING_TABLE.
 */

import { app, HttpRequest, HttpResponseInit, InvocationContext, Timer } from '@azure/functions'
import { createClient } from '@supabase/supabase-js'

const PING_TABLE = process.env.SUPABASE_PING_TABLE || 'tenants' // change default if needed

async function runSupabasePing(context: InvocationContext): Promise<{ ok: boolean; message: string; elapsedMs: number }> {
  const start = Date.now()
  context.log('[SupabasePing] Starting...')

  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      const msg = 'SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not configured'
      context.error(`[SupabasePing] ${msg}`)
      return { ok: false, message: msg, elapsedMs: Date.now() - start }
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)
    const { data, error } = await supabase.from(PING_TABLE).select('*').limit(1).maybeSingle()
    const elapsed = Date.now() - start

    if (error) {
      context.error(`[SupabasePing] Failed after ${elapsed}ms: ${error.message}`)
      return { ok: false, message: error.message, elapsedMs: elapsed }
    }

    context.log(`[SupabasePing] OK in ${elapsed}ms`)
    return { ok: true, message: data ? 'row found' : 'no row', elapsedMs: elapsed }
  } catch (err) {
    const elapsed = Date.now() - start
    context.error(`[SupabasePing] Error after ${elapsed}ms: ${(err as Error).message}`)
    return { ok: false, message: (err as Error).message, elapsedMs: elapsed }
  }
}

async function supabasePingTimer(timer: Timer, context: InvocationContext): Promise<void> {
  if (timer.isPastDue) context.log('[SupabasePing] Timer past due, catch-up run')
  await runSupabasePing(context)
}

async function supabasePingHttp(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const result = await runSupabasePing(context)
  return { status: result.ok ? 200 : 503, jsonBody: result }
}

app.timer('supabasePing', { schedule: '0 0 */2 * * *', handler: supabasePingTimer })
app.http('supabasePingHttp', { methods: ['GET'], route: 'supabase-ping', handler: supabasePingHttp })
```

---

## 4. GitHub Actions – add to your deploy workflow

**Do not use** `Azure/setup-azure-functions-core-tools` (repo does not exist). Use the **apt install** below.

In your workflow YAML (e.g. `.github/workflows/deploy-testing.yml`):

**4.1** In the job that detects changes, add an output and a filter for the scheduler:

```yaml
outputs:
  scheduler: ${{ steps.filter.outputs.scheduler }}
# and in the path filter:
scheduler:
  - 'scheduler/**'
```

**4.2** Add this **full job** (replace placeholders):

- `YOUR_FUNC_APP_NAME` → e.g. `myapp-scheduler-test` or `myapp-scheduler`
- `YOUR_RESOURCE_GROUP` → e.g. `myapp-test-rg` or `myapp-rg`
- `NODE_VERSION` → use the same as elsewhere, e.g. `'22'`

```yaml
  deploy_scheduler:
    name: Deploy Scheduler
    runs-on: ubuntu-22.04
    needs: detect_changes
    if: needs.detect_changes.outputs.scheduler == 'true' || github.event_name == 'workflow_dispatch'

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Build Scheduler
        run: |
          cd scheduler
          npm ci
          npm run build
          npm prune --production

      - name: Azure Login
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Install Azure Functions Core Tools v4
        run: |
          curl -sL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
          sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
          sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/microsoft-ubuntu-$(lsb_release -cs)-prod $(lsb_release -cs) main" > /etc/apt/sources.list.d/dotnetdev.list'
          sudo apt-get update
          sudo apt-get install -y azure-functions-core-tools-4

      - name: Deploy Scheduler Function App
        run: |
          cd scheduler
          func azure functionapp publish YOUR_FUNC_APP_NAME --node

      - name: Configure Scheduler app settings
        env:
          SUPABASE_URL_VAL: ${{ secrets.VITE_SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY_VAL: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
        run: |
          az functionapp config appsettings set \
            --name YOUR_FUNC_APP_NAME \
            --resource-group YOUR_RESOURCE_GROUP \
            --settings \
              SUPABASE_URL="$SUPABASE_URL_VAL" \
              SUPABASE_SERVICE_ROLE_KEY="$SUPABASE_SERVICE_ROLE_KEY_VAL"
```

Use **ubuntu-22.04** (not `ubuntu-latest`) so the Microsoft apt repo for `azure-functions-core-tools-4` works.

---

## 5. Azure – one-time creation of the Function App

PowerShell (replace subscription, resource group, function app name, storage account, location):

```powershell
az account set --subscription "YOUR_SUBSCRIPTION_ID"
az functionapp create `
  --name YOUR_FUNC_APP_NAME `
  --resource-group YOUR_RESOURCE_GROUP `
  --storage-account YOUR_STORAGE_ACCOUNT `
  --consumption-plan-location germanywestcentral `
  --runtime node `
  --runtime-version 22 `
  --functions-version 4 `
  --os-type Linux
```

Or copy and adapt `setup-infra/deploy-scheduler.ps1` from this repo (env-specific names and resource groups).

---

## 6. Checklist for a new project

| Item | Action |
|------|--------|
| Package name | Replace `YOUR-PROJECT-NAME-scheduler` in `scheduler/package.json` |
| Ping table | Change `PING_TABLE` default in `supabase-ping.ts` or set app setting `SUPABASE_PING_TABLE` |
| Lockfile | Run `npm install` in `scheduler/` and commit `package-lock.json` |
| Workflow | Add path filter `scheduler/**` and the full `deploy_scheduler` job |
| Placeholders in job | Replace `YOUR_FUNC_APP_NAME`, `YOUR_RESOURCE_GROUP` |
| Secrets | Ensure `AZURE_CREDENTIALS`, Supabase URL and service role key exist |
| Function app in Azure | Create once (script or portal); then Actions will deploy and set app settings |

---

## 7. Verify

- **Timer:** In Azure Portal → Function App → Monitor → see runs every 2 hours.
- **HTTP:** `GET https://YOUR_FUNC_APP_NAME.azurewebsites.net/api/supabase-ping` → 200 and `{ "ok": true, ... }` if Supabase is reachable.

This template uses the same setup that works in this repo (apt install, ubuntu-22.04, lockfile, no third-party setup action).
