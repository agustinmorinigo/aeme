const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Leer directorios
const getDirectories = (source) => {
  try {
    return fs
      .readdirSync(source, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch (error) {
    return [];
  }
};

// Detectar scopes afectados por archivos staged
const getSuggestedScopes = () => {
  try {
    const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf-8' });
    const files = stagedFiles.split('\n').filter(Boolean);

    const scopes = new Set();

    files.forEach((file) => {
      // Detectar apps/
      if (file.startsWith('apps/')) {
        const app = file.split('/')[1];
        if (app) scopes.add(app);
      }
      // Detectar packages/
      else if (file.startsWith('packages/')) {
        const pkg = file.split('/')[1];
        if (pkg) scopes.add(pkg);
      }
      // Archivos root (turbo.json, package.json, pnpm-workspace.yaml, etc)
      else if (!file.includes('/')) {
        scopes.add('monorepo');
      }
    });

    return Array.from(scopes);
  } catch (error) {
    return [];
  }
};

const apps = getDirectories(path.join(__dirname, 'apps')).map((name) => ({
  name: `${name} (app)`,
  value: name,
}));

const packages = getDirectories(path.join(__dirname, 'packages')).map((name) => ({
  name: `${name} (package)`,
  value: name,
}));

// Detectar scopes sugeridos basados en archivos modificados
const suggestedScopes = getSuggestedScopes();
const hasSuggestions = suggestedScopes.length > 0;

// Construir lista de scopes con sugeridos primero
const allScopes = [
  // Scopes sugeridos primero (destacados)
  ...suggestedScopes.map((scope) => ({
    name: `⭐ ${scope} (modificado)`,
    value: scope,
  })),
  // Separador visual
  ...(hasSuggestions ? [{ name: '────────────────────────', value: false }] : []),
  // Todos los scopes disponibles
  ...apps,
  ...packages,
  { name: '────────────────────────', value: false },
  { name: 'monorepo (configuración root)', value: 'monorepo' },
  { name: 'deps (dependencias)', value: 'deps' },
  { name: 'release (versioning)', value: 'release' },
].filter((scope) => scope.value !== false);

module.exports = {
  types: [
    { value: 'feat', name: 'feat:     ✨ Nueva funcionalidad' },
    { value: 'fix', name: 'fix:      🐛 Corrección de bug' },
    { value: 'docs', name: 'docs:     📝 Documentación' },
    { value: 'style', name: 'style:    💄 Formato, estilos (sin cambios de lógica)' },
    { value: 'refactor', name: 'refactor: ♻️  Refactorización (sin feat ni fix)' },
    { value: 'perf', name: 'perf:     ⚡️ Mejora de performance' },
    { value: 'test', name: 'test:     ✅ Agregar o corregir tests' },
    { value: 'chore', name: 'chore:    🔧 Mantenimiento, tooling, configs' },
    { value: 'ci', name: 'ci:       👷 CI/CD, GitHub Actions, etc' },
    { value: 'build', name: 'build:    📦 Build system, Turbo, etc' },
    { value: 'revert', name: 'revert:   ⏪ Revertir commit anterior' },
  ],

  scopes: allScopes,

  allowCustomScopes: false, // Solo scopes permitidos (apps, packages, monorepo, deps, release)
  allowBreakingChanges: ['feat', 'fix', 'refactor'],
  skipQuestions: ['body', 'footer'], // Saltar body y footer para commits más rápidos
  subjectLimit: 100,

  messages: {
    type: '¿Qué tipo de cambio estás committeando?',
    scope: hasSuggestions
      ? `\n🎯 Los scopes con ⭐ están basados en tus archivos modificados.\n\n¿Cuál es el scope del commit? (selecciona UNO):`
      : '\n¿Cuál es el scope del commit? (selecciona UNO):',
    subject: 'Escribe una descripción corta del cambio (lower-case, sin punto final):\n',
    confirmCommit: '\n¿Confirmar el commit con el mensaje de arriba?',
  },

  // Si el usuario modifica múltiples packages, mostrar advertencia
  footerPrefix:
    hasSuggestions && suggestedScopes.length > 1
      ? `\n⚠️  Detectamos cambios en: ${suggestedScopes.join(', ')}\n💡 Tip: Considera hacer commits separados (1 commit = 1 scope)\n\n`
      : '',
};
