#!/usr/bin/env node

/**
 * Cross-platform script to generate Supabase types with correct encoding
 * Works on Windows, Linux, macOS without encoding issues
 */

// ESTE SCRIPT GENERAS LOS TYPES DE DB DE SUPABASE AUTOMÁTICAMENTE CUANDO EJECUTAS EL SCRIPT VIA COMANDO O LO Q SEA. LO PUSE ASÍ PQ SINO FALLAN LOS TESTS DEL CI/CD PORQUE DEPENDIENDO DESDE DÓNDE SE EJECUTE EL GIT DIFF, LO FORMATEA EN ASSCII Y NOSE Q, ENTONCES ESTO LO HACE CROSSOVER SIN IMPORTAR DESDE QUÉ O.S O CONSOLA DE COMANDO SE LO EJECUTE.
// VEREMOS Q ESTE SCRIPT SE USA EN UN WORKFLOW DE .GITHUB/WORKFLOWS.
// PARA Q ESTE SCRIPT FUNCIONE BIEN, ES IMPORTANTE Q EL SUPABSE DE APPS/UNOVISION-BACKEND ESTÉ LEVANTADO CON NPX SUPABASE START. SINO, VA A FALLAR.

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

  // // Save to backend directory (for CI/CD) BORRAR ESTO. EL CI CD DEBE LEER DE SUPABASE-CLIENT, NO DE BACKEND.
  // const backendTypesPath = join(backendDir, 'supabase', 'types', 'database.types.ts');
  // writeFileSync(backendTypesPath, output, { encoding: 'utf8' });
  // console.log(`✅ Types saved to backend: ${backendTypesPath}`);

  // Save to package directory (for sharing)
  const packageTypesPath = resolve(import.meta.dirname, '../src/types/database.types.ts');
  writeFileSync(packageTypesPath, output, { encoding: 'utf8' });
  console.log(`✅ Types saved to package: ${packageTypesPath}`);

  console.log('🎉 Types generated successfully in both locations!');
});
