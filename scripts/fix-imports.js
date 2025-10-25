#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the import mappings
const importMappings = {
  // Radix UI components
  '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
  '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
  '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
  '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
  '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
  '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
  '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
  '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
  '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
  '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
  '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
  '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
  '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
  '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
  '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
  '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
  '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
  '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
  '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
  '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
  '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
  '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
  '@radix-ui/react-toast@1.2.15': '@radix-ui/react-toast',
  '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
  '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
  '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
  '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
  
  // Other packages
  'sonner@2.0.3': 'sonner',
  'vaul@1.1.2': 'vaul',
  'embla-carousel-react@8.6.0': 'embla-carousel-react',
  'cmdk@1.1.1': 'cmdk',
  'class-variance-authority@0.7.1': 'class-variance-authority',
  'lucide-react@0.487.0': 'lucide-react',
  'react-hook-form@7.55.0': 'react-hook-form',
  'react-day-picker@8.10.1': 'react-day-picker',
  'next-themes@0.4.6': 'next-themes',
  'input-otp@1.4.2': 'input-otp',
  'recharts@2.15.2': 'recharts',
  'react-resizable-panels@2.1.7': 'react-resizable-panels',
};

// Function to recursively find all TypeScript/JavaScript files
function findFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...findFiles(fullPath, extensions));
    } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to fix imports in a file
function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  for (const [oldImport, newImport] of Object.entries(importMappings)) {
    const regex = new RegExp(`from ['"]${oldImport.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g');
    if (content.includes(oldImport)) {
      content = content.replace(regex, `from '${newImport}'`);
      modified = true;
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed imports in: ${filePath}`);
  }
}

// Main execution
const srcDir = path.join(__dirname, '..', 'src');
const files = findFiles(srcDir);

console.log(`Found ${files.length} files to process...`);

for (const file of files) {
  fixImportsInFile(file);
}

console.log('Import fixing complete!');
