#!/usr/bin/env node

/**
 * Cross-platform script to generate Supabase types with correct encoding
 * Works on Windows, Linux, macOS without encoding issues
 */

/**
 * Este script genera automáticamente los tipos TypeScript de la base de datos de Supabase.
 *
 * ¿Por qué existe este script?
 * - Soluciona problemas de encoding (ASCII/UTF-8) que ocurren en CI/CD cuando se ejecuta
 *   desde diferentes sistemas operativos y terminales
 * - Garantiza compatibilidad cross-platform (Windows, Linux, macOS)
 * - Evita fallos en tests automatizados debido a diferencias de formato
 *
 * Uso:
 * - Se ejecuta manualmente: `node generate-types.mjs`
 * - Se usa en workflows de GitHub Actions (.github/workflows)
 *
 * Prerequisitos:
 * ⚠️  IMPORTANTE: El entorno local de Supabase debe estar ejecutándose
 *    Ejecutar primero: `npx supabase start` en apps/unovision-backend
 *    Sin esto, el script fallará.
 */

import { spawn } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { platform } from 'node:os';
import { join, resolve } from 'node:path';

console.log('🔄 Generating Supabase types...');

// Find the backend directory relative to this script location
const backendDir = resolve(import.meta.dirname, '../../../apps/unovision-backend');

if (!existsSync(join(backendDir, 'supabase', 'config.toml'))) {
  console.error('❌ Could not find Supabase backend directory at:', backendDir);
  process.exit(1);
}

console.log(`📂 Running Supabase from: ${backendDir}`);

// Handle Windows npx command properly
const isWindows = platform() === 'win32';
const command = isWindows ? 'npx.cmd' : 'npx';

const child = spawn(command, ['supabase', 'gen', 'types', 'typescript', '--local'], {
  cwd: backendDir, // Execute from backend directory
  stdio: ['inherit', 'pipe', 'inherit'],
  shell: isWindows,
});

let output = '';

child.stdout.on('data', (data) => {
  output += data.toString();
});

child.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ Supabase command failed with exit code ${code}`);
    process.exit(1);
  }

  // Save to package directory (for sharing)
  const packageTypesPath = resolve(import.meta.dirname, '../src/types/database.types.ts');
  writeFileSync(packageTypesPath, output, { encoding: 'utf8' });
  console.log(`✅ Types saved to package: ${packageTypesPath}`);

  console.log('🎉 Types generated successfully in both locations!');
});
