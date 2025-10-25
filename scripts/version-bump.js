#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get current branch
const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();

// Read package.json
const packagePath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Parse current version
const [major, minor, patch] = packageJson.version.split('.').map(Number);

let newVersion;

// Determine version bump based on branch
if (currentBranch === 'testing') {
  // Testing branch: bump patch version
  newVersion = `${major}.${minor}.${patch + 1}`;
} else if (currentBranch === 'main') {
  // Main branch: bump minor version
  newVersion = `${major}.${minor + 1}.0`;
} else {
  console.log(`No automatic version bump for branch: ${currentBranch}`);
  process.exit(0);
}

// Update package.json
packageJson.version = newVersion;
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');

console.log(`Version bumped from ${packageJson.version} to ${newVersion} on branch ${currentBranch}`);

// Update versioninfo.md
const versionInfoPath = path.join(__dirname, '..', 'versioninfo.md');
let versionInfo = fs.readFileSync(versionInfoPath, 'utf8');

// Add new version entry
const newEntry = `## Version ${newVersion}
**Date:** ${new Date().toLocaleDateString()}
**Branch:** ${currentBranch}

### Changes
- [Add description of changes here]

---

`;

// Insert after the initial version section
const insertIndex = versionInfo.indexOf('---', versionInfo.indexOf('---') + 3) + 3;
versionInfo = versionInfo.slice(0, insertIndex) + '\n' + newEntry + versionInfo.slice(insertIndex);

fs.writeFileSync(versionInfoPath, versionInfo);

console.log(`Updated versioninfo.md with version ${newVersion}`);
