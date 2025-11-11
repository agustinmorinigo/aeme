import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read directories safely
const getDirectories = (source) => {
  try {
    return readdirSync(source, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch (error) {
    return [];
  }
};

// Get apps and packages dynamically
const apps = getDirectories(join(__dirname, 'apps'));
const packages = getDirectories(join(__dirname, 'packages'));

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Formatting (doesn't affect code)
        'refactor', // Refactoring
        'perf',     // Performance
        'test',     // Tests
        'chore',    // Maintenance
        'ci',       // CI/CD
        'build',    // Build system
        'revert',   // Revert commit
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        // Apps and packages detected automatically
        ...apps,
        ...packages,
        // Special scopes for changes affecting multiple packages or structure
        'monorepo',  // Root changes (turbo.json, pnpm-workspace.yaml, etc)
        'deps',      // Shared dependencies updates
        'release',   // Release/versioning
      ],
    ],
    // CRITICAL: Scope is MANDATORY - can't commit without specifying the package
    'scope-empty': [2, 'never'],
    
    // Strict message format
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    
    // Body and footer optional but must be well formatted if they exist
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },
};