const fs = require('fs');
const path = require('path');

// Leer directorios de forma segura
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

// Obtener apps y packages dinámicamente
const apps = getDirectories(path.join(__dirname, 'apps'));
const packages = getDirectories(path.join(__dirname, 'packages'));

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nueva funcionalidad
        'fix',      // Bug fix
        'docs',     // Documentación
        'style',    // Formato (no afecta código)
        'refactor', // Refactorización
        'perf',     // Performance
        'test',     // Tests
        'chore',    // Mantenimiento
        'ci',       // CI/CD
        'build',    // Build system
        'revert',   // Revertir commit
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        // Apps y packages detectados automáticamente
        ...apps,
        ...packages,
        // Scopes especiales para cambios que afectan múltiples packages o la estructura
        'monorepo',  // Cambios en root (turbo.json, pnpm-workspace.yaml, etc)
        'deps',      // Actualización de dependencias compartidas
        'release',   // Release/versioning
      ],
    ],
    // CRÍTICO: Scope es OBLIGATORIO - no se puede commitear sin especificar el package
    'scope-empty': [2, 'never'],
    
    // Formato estricto del mensaje
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    
    // Body y footer opcionales pero si existen deben estar bien formateados
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },
};