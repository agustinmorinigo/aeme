#!/usr/bin/env node

/**
 * Cross-platform script to generate Supabase types with correct encoding
 * Works on Windows, Linux, macOS without encoding issues
 */

import { spawn } from 'child_process';
import { writeFileSync } from 'fs';
import { platform } from 'os';
import { join } from 'path';

console.log('🔄 Generating Supabase types...');

// Handle Windows npx command properly
const isWindows = platform() === 'win32';
const command = isWindows ? 'npx.cmd' : 'npx';

const child = spawn(command, ['supabase', 'gen', 'types', 'typescript', '--local'], {
  cwd: process.cwd(),
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

  // Write file with explicit UTF-8 encoding without BOM
  const filePath = join('supabase', 'types', 'database.types.ts');
  writeFileSync(filePath, output, { encoding: 'utf8' });

  console.log('✅ Types generated successfully!');
  console.log(`📁 File saved to: ${filePath}`);
});
