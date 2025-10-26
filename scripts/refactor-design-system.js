/**
 * Design System Refactoring Script
 * 
 * This script helps automate the refactoring of Figma-exported components
 * to use the design system utilities.
 * 
 * Usage: Run this script with Node.js to refactor component files
 * node refactor-design-system.js <file-path>
 */

import fs from 'fs';
import path from 'path';

// Typography replacements
const typographyReplacements = [
  // Hero text (64px, semibold)
  {
    pattern: /className="([^"]*?)font-\['Roboto:SemiBold',_sans-serif\] font-semibold([^"]*?)text-\[64px\]([^"]*?)"[\s\S]*?style=\{\{\s*fontVariationSettings:[\s\S]*?\}\}/g,
    replacement: 'className="$1text-hero$2$3"'
  },
  
  // H1 headings (40px, semibold)
  {
    pattern: /className="([^"]*?)font-\['Roboto:SemiBold',_sans-serif\] font-semibold([^"]*?)text-\[40px\]([^"]*?)"[\s\S]*?style=\{\{\s*fontVariationSettings:[\s\S]*?\}\}/g,
    replacement: 'className="$1text-h1$2$3"'
  },
  
  // H3 titles (22px, regular)
  {
    pattern: /className="([^"]*?)font-\['Roboto:Regular',_sans-serif\] font-normal([^"]*?)text-\[22px\]([^"]*?)"[\s\S]*?style=\{\{\s*fontVariationSettings:[\s\S]*?\}\}/g,
    replacement: 'className="$1text-h3$2$3"'
  },
  
  // Body large (18px, medium)
  {
    pattern: /className="([^"]*?)font-\['Roboto:Medium',_sans-serif\] font-medium([^"]*?)text-\[18px\]([^"]*?)"[\s\S]*?style=\{\{\s*fontVariationSettings:[\s\S]*?\}\}/g,
    replacement: 'className="$1text-body-lg$2$3"'
  },
  
  // Labels (16px, bold)
  {
    pattern: /className="([^"]*?)font-\['Roboto:Bold',_sans-serif\] font-bold([^"]*?)text-\[16px\]([^"]*?)"[\s\S]*?style=\{\{\s*fontVariationSettings:[\s\S]*?\}\}/g,
    replacement: 'className="$1text-label$2$3"'
  },
  
  // Body text (14px, regular)
  {
    pattern: /className="([^"]*?)font-\['Roboto:Regular',_sans-serif\] font-normal([^"]*?)text-\[14px\]([^"]*?)"[\s\S]*?style=\{\{\s*fontVariationSettings:[\s\S]*?\}\}/g,
    replacement: 'className="$1text-body$2$3"'
  }
];

// Color replacements
const colorReplacements = [
  // Text colors
  { pattern: /text-\[#192126\]/g, replacement: 'text-heading' },
  { pattern: /text-\[#505050\]/g, replacement: 'text-body-color' },
  { pattern: /text-\[#979797\]/g, replacement: 'text-tertiary' },
  { pattern: /text-\[#C7C8D5\]/gi, replacement: 'text-sub-icons' },
  { pattern: /text-\[#388896\]/gi, replacement: 'text-primary' },
  { pattern: /text-\[#69B57C\]/gi, replacement: 'text-secondary' },
  { pattern: /text-\[#8AC0AD\]/gi, replacement: 'text-disabled-primary' },
  { pattern: /text-\[#FFFFFF\]/gi, replacement: 'text-white' },
  
  // Background colors
  { pattern: /bg-\[#388896\]/gi, replacement: 'bg-primary' },
  { pattern: /bg-\[#69B57C\]/gi, replacement: 'bg-secondary' },
  { pattern: /bg-\[#E0EBE3\]/gi, replacement: 'bg-light-secondary' },
  { pattern: /bg-\[#8AC0AD\]/gi, replacement: 'bg-disabled-primary' },
  { pattern: /bg-\[#F2F2F7\]/gi, replacement: 'bg-variation' },
  { pattern: /bg-\[#C7C8D5\]/gi, replacement: 'bg-sub-icons' },
  { pattern: /bg-\[#e0ebe3\]/gi, replacement: 'bg-light-secondary' },
  { pattern: /bg-\[#f2f2f7\]/gi, replacement: 'bg-variation' },
  { pattern: /bg-\[#c7c8d5\]/gi, replacement: 'bg-sub-icons' },
  
  // Border colors
  { pattern: /border-\[#C7C8D5\]/gi, replacement: 'border-sub-icons' },
  { pattern: /border-\[#c7c8d5\]/gi, replacement: 'border-sub-icons' },
  
  // Gradients
  { 
    pattern: /bg-gradient-to-b from-\[#69b57c\] to-\[#388896\]/gi, 
    replacement: 'bg-gradient-brand' 
  }
];

// Shadow replacements
const shadowReplacements = [
  { 
    pattern: /shadow-\[0px_0px_10px_0px_#dddddd\]/gi, 
    replacement: 'shadow-elevation' 
  },
  { 
    pattern: /shadow-\[0px_0px_10px_0px_#DDDDDD\]/gi, 
    replacement: 'shadow-elevation' 
  },
  { 
    pattern: /shadow-\[0px_0px_10\.134px_0px_#dddddd\]/gi, 
    replacement: 'shadow-elevation' 
  }
];

// Spacing replacements (using Tailwind's standard spacing)
const spacingReplacements = [
  { pattern: /gap-\[8px\]/g, replacement: 'gap-2' },
  { pattern: /gap-\[12px\]/g, replacement: 'gap-3' },
  { pattern: /gap-\[16px\]/g, replacement: 'gap-4' },
  { pattern: /gap-\[24px\]/g, replacement: 'gap-6' },
  { pattern: /gap-\[32px\]/g, replacement: 'gap-8' },
  { pattern: /gap-\[48px\]/g, replacement: 'gap-12' },
  { pattern: /px-\[24px\]/g, replacement: 'px-6' },
  { pattern: /py-\[8px\]/g, replacement: 'py-2' },
  { pattern: /p-\[12px\]/g, replacement: 'p-3' },
  { pattern: /px-\[16px\]/g, replacement: 'px-4' },
  { pattern: /py-\[14px\]/g, replacement: 'py-3.5' }
];

function refactorFile(filePath) {
  console.log(`Refactoring: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Apply typography replacements
  console.log('  - Applying typography replacements...');
  typographyReplacements.forEach(({ pattern, replacement }) => {
    content = content.replace(pattern, replacement);
  });
  
  // Apply color replacements
  console.log('  - Applying color replacements...');
  colorReplacements.forEach(({ pattern, replacement }) => {
    content = content.replace(pattern, replacement);
  });
  
  // Apply shadow replacements
  console.log('  - Applying shadow replacements...');
  shadowReplacements.forEach(({ pattern, replacement }) => {
    content = content.replace(pattern, replacement);
  });
  
  // Apply spacing replacements
  console.log('  - Applying spacing replacements...');
  spacingReplacements.forEach(({ pattern, replacement }) => {
    content = content.replace(pattern, replacement);
  });
  
  // Remove content-stretch class (redundant)
  content = content.replace(/content-stretch\s+/g, '');
  
  // Clean up multiple spaces in className
  content = content.replace(/className="([^"]*)"/g, (match, classes) => {
    const cleaned = classes.split(/\s+/).filter(Boolean).join(' ');
    return `className="${cleaned}"`;
  });
  
  if (content !== originalContent) {
    // Create backup
    const backupPath = filePath + '.backup';
    fs.writeFileSync(backupPath, originalContent, 'utf8');
    console.log(`  - Backup created: ${backupPath}`);
    
    // Write refactored content
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ File refactored successfully!`);
    
    // Count changes
    const colorChanges = originalContent.match(/#192126|#505050|#388896|#69B57C/gi)?.length || 0;
    const fontChanges = originalContent.match(/font-\['Roboto:/g)?.length || 0;
    console.log(`  - Replaced ${colorChanges} color instances`);
    console.log(`  - Replaced ${fontChanges} font declarations`);
  } else {
    console.log(`  ℹ️  No changes needed`);
  }
  
  return content !== originalContent;
}

// Main execution
if (process.argv.length < 3) {
  console.log('Usage: node refactor-design-system.js <file-path>');
  console.log('Example: node refactor-design-system.js src/imports/HomePageDesktop.tsx');
  process.exit(1);
}

const filePath = process.argv[2];

if (!fs.existsSync(filePath)) {
  console.error(`Error: File not found: ${filePath}`);
  process.exit(1);
}

console.log('🎨 Design System Refactoring Tool\n');
console.log('This will refactor Figma-exported code to use design system utilities.\n');

const changed = refactorFile(filePath);

if (changed) {
  console.log('\n✨ Refactoring complete!');
  console.log('📝 A backup of the original file has been created with .backup extension');
  console.log('🧪 Please test the refactored component to ensure it looks correct');
} else {
  console.log('\n✨ No changes were needed');
}

export { refactorFile, typographyReplacements, colorReplacements, shadowReplacements, spacingReplacements };

