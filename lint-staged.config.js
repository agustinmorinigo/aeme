export default {
  // For TypeScript/JavaScript files
  '*.{ts,tsx,js,jsx}': [
    // 1. Biome: Lint + Format (auto-fix what can be fixed)
    'biome check --write --no-errors-on-unmatched --files-ignore-unknown=true',
    
    // 2. Type-check: If it fails, cancel the commit
    () => 'pnpm run check-types',
  ],
  
  // For other files (JSON, CSS, etc) only format
  '*.{json,css,md}': [
    'biome format --write --no-errors-on-unmatched',
  ],
};