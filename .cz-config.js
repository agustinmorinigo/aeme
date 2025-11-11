const { execSync } = require('node:child_process');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');

// Read directories
const getDirectories = (source) => {
  try {
    return readdirSync(source, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch {
    return [];
  }
};

// Detect scopes affected by staged files
const getSuggestedScopes = () => {
  try {
    const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf-8' });
    const files = stagedFiles.split('\n').filter(Boolean);

    const scopes = new Set();

    files.forEach((file) => {
      // Detect apps/
      if (file.startsWith('apps/')) {
        const app = file.split('/')[1];
        if (app) scopes.add(app);
      }
      // Detect packages/
      else if (file.startsWith('packages/')) {
        const pkg = file.split('/')[1];
        if (pkg) scopes.add(pkg);
      }
      // Root files (turbo.json, package.json, pnpm-workspace.yaml, etc)
      else if (!file.includes('/')) {
        scopes.add('monorepo');
      }
    });

    return Array.from(scopes);
  } catch {
    return [];
  }
};

const apps = getDirectories(join(__dirname, 'apps')).map((name) => ({
  name: `${name} (app)`,
  value: name,
}));

const packages = getDirectories(join(__dirname, 'packages')).map((name) => ({
  name: `${name} (package)`,
  value: name,
}));

// Detect suggested scopes based on modified files
const suggestedScopes = getSuggestedScopes();
const hasSuggestions = suggestedScopes.length > 0;

// Build scope list with suggestions first
const allScopes = [
  // Suggested scopes first (highlighted)
  ...suggestedScopes.map((scope) => ({
    name: `⭐ ${scope} (modified)`,
    value: scope,
  })),
  // Visual separator
  ...(hasSuggestions ? [{ name: '────────────────────────', value: false }] : []),
  // All available scopes
  ...apps,
  ...packages,
  { name: '────────────────────────', value: false },
  { name: 'monorepo (root configuration)', value: 'monorepo' },
  { name: 'deps (dependencies)', value: 'deps' },
  { name: 'release (versioning)', value: 'release' },
].filter((scope) => scope.value !== false);

module.exports = {
  types: [
    { value: 'feat', name: 'feat:     ✨ New feature' },
    { value: 'fix', name: 'fix:      🐛 Bug fix' },
    { value: 'docs', name: 'docs:     📝 Documentation' },
    { value: 'style', name: 'style:    💄 Formatting, styles (no logic changes)' },
    { value: 'refactor', name: 'refactor: ♻️  Refactoring (no feat nor fix)' },
    { value: 'perf', name: 'perf:     ⚡️ Performance improvement' },
    { value: 'test', name: 'test:     ✅ Add or fix tests' },
    { value: 'chore', name: 'chore:    🔧 Maintenance, tooling, configs' },
    { value: 'ci', name: 'ci:       👷 CI/CD, GitHub Actions, etc' },
    { value: 'build', name: 'build:    📦 Build system, Turbo, etc' },
    { value: 'revert', name: 'revert:   ⏪ Revert previous commit' },
  ],

  scopes: allScopes,

  allowCustomScopes: false, // Only allowed scopes (apps, packages, monorepo, deps, release)
  allowBreakingChanges: ['feat', 'fix', 'refactor'],
  skipQuestions: ['body', 'footer'], // Skip body and footer for faster commits
  subjectLimit: 100,

  messages: {
    type: 'What type of change are you committing?',
    scope: hasSuggestions
      ? `\n🎯 Scopes with ⭐ are based on your modified files.\n\nWhat is the scope of this commit? (select ONE):`
      : '\nWhat is the scope of this commit? (select ONE):',
    subject: 'Write a short description of the change (lower-case, no ending period):\n',
    confirmCommit: '\nConfirm commit with the message above?',
  },

  // If user modifies multiple packages, show warning
  footerPrefix:
    hasSuggestions && suggestedScopes.length > 1
      ? `\n⚠️  We detected changes in: ${suggestedScopes.join(', ')}\n💡 Tip: Consider making separate commits (1 commit = 1 scope)\n\n`
      : '',
};
