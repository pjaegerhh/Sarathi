# PowerShell version of version bump script

# Get current branch
$currentBranch = git branch --show-current

# Read package.json
$packagePath = "package.json"
$packageJson = Get-Content $packagePath | ConvertFrom-Json

# Parse current version
$versionParts = $packageJson.version -split '\.'
$major = [int]$versionParts[0]
$minor = [int]$versionParts[1]
$patch = [int]$versionParts[2]

$newVersion = ""

# Determine version bump based on branch
if ($currentBranch -eq "testing") {
    # Testing branch: bump patch version
    $newVersion = "$major.$minor.$($patch + 1)"
} elseif ($currentBranch -eq "main") {
    # Main branch: bump minor version
    $newVersion = "$major.$($minor + 1).0"
} else {
    Write-Host "No automatic version bump for branch: $currentBranch"
    exit 0
}

# Update package.json
$packageJson.version = $newVersion
$packageJson | ConvertTo-Json -Depth 10 | Set-Content $packagePath

Write-Host "Version bumped from $($packageJson.version) to $newVersion on branch $currentBranch"

# Update versioninfo.md
$versionInfoPath = "versioninfo.md"
$versionInfo = Get-Content $versionInfoPath -Raw

# Add new version entry
$newEntry = @"
## Version $newVersion
**Date:** $(Get-Date -Format "MM/dd/yyyy")
**Branch:** $currentBranch

### Changes
- [Add description of changes here]

---

"@

# Insert after the initial version section
$insertIndex = $versionInfo.IndexOf('---', $versionInfo.IndexOf('---') + 3) + 3
$versionInfo = $versionInfo.Substring(0, $insertIndex) + "`n" + $newEntry + $versionInfo.Substring($insertIndex)

Set-Content $versionInfoPath $versionInfo

Write-Host "Updated versioninfo.md with version $newVersion"
