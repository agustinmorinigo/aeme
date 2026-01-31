#!/usr/bin/env node

/**
 * Local Skills Maintenance Check
 *
 * Run this script locally to check if your changes require updating skills.
 * Usage: node .claude/scripts/check-skills-local.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Parse YAML frontmatter
function parseFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/^---\n([\s\S]*?)\n---/);

    if (!match) {
      return null;
    }

    // Simple YAML parser (works for our structure)
    const lines = match[1].split('\n');
    const result = {};
    let currentKey = null;
    let currentArray = null;

    for (const line of lines) {
      if (line.trim() === '') continue;

      if (line.startsWith('  - ')) {
        // Array item
        if (currentArray) {
          const value = line.replace('  - ', '').trim();
          currentArray.push(value.replace(/['"]/g, ''));
        }
      } else if (line.includes(':')) {
        // Key-value pair
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':').trim();

        currentKey = key.trim();

        if (value === '') {
          // Start of array
          currentArray = [];
          result[currentKey] = currentArray;
        } else if (value === '[]') {
          // Empty array
          result[currentKey] = [];
          currentArray = null;
        } else {
          // Simple value
          result[currentKey] = value.replace(/['"]/g, '');
          currentArray = null;
        }
      }
    }

    return result;
  } catch (error) {
    log(`Error parsing ${filePath}: ${error.message}`, 'red');
    return null;
  }
}

// Get changed files (staged + unstaged)
function getChangedFiles() {
  try {
    // Get staged files
    const staged = execSync('git diff --cached --name-only', { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean);

    // Get unstaged files
    const unstaged = execSync('git diff --name-only', { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean);

    // Get untracked files
    const untracked = execSync('git ls-files --others --exclude-standard', { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean);

    // Combine and deduplicate
    return [...new Set([...staged, ...unstaged, ...untracked])];
  } catch (error) {
    log('Error getting changed files. Make sure you are in a git repository.', 'red');
    process.exit(1);
  }
}

// Get all skills
function getAllSkills() {
  const skillsDir = path.join(process.cwd(), '.claude', 'skills');
  const skills = [];

  try {
    const entries = fs.readdirSync(skillsDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const skillFile = path.join(skillsDir, entry.name, 'SKILL.md');

        if (fs.existsSync(skillFile)) {
          const metadata = parseFrontmatter(skillFile);

          if (metadata) {
            skills.push({
              name: metadata.name,
              path: skillFile,
              metadata
            });
          }
        }
      }
    }
  } catch (error) {
    log(`Error reading skills directory: ${error.message}`, 'red');
    process.exit(1);
  }

  return skills;
}

// Match glob pattern
function matchGlob(pattern, filePath) {
  let regexPattern = pattern
    .replace(/\./g, '\\.')
    .replace(/\*\*/g, '.*')
    .replace(/\*/g, '[^/]*');

  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(filePath);
}

// Check monitorPaths
function checkMonitorPaths(changedFiles, monitorPaths) {
  if (!monitorPaths || monitorPaths.length === 0) {
    return [];
  }

  const matches = [];

  for (const file of changedFiles) {
    for (const pattern of monitorPaths) {
      if (matchGlob(pattern, file)) {
        matches.push({ file, pattern });
        break;
      }
    }
  }

  return matches;
}

// Check dependency changes
function checkDependencyChanges(changedFiles, monitorDependencies) {
  if (!monitorDependencies || monitorDependencies.length === 0) {
    return [];
  }

  const packageJsonFiles = changedFiles.filter(f => f.endsWith('package.json'));

  if (packageJsonFiles.length === 0) {
    return [];
  }

  const changes = [];

  for (const pkgFile of packageJsonFiles) {
    try {
      const diff = execSync(`git diff HEAD -- ${pkgFile}`, { encoding: 'utf8' });

      if (!diff) continue;

      for (const dep of monitorDependencies) {
        const depName = typeof dep === 'string' ? dep.split(':')[0] : Object.keys(dep)[0];

        if (diff.includes(`"${depName}"`)) {
          changes.push({
            file: pkgFile,
            dependency: depName
          });
        }
      }
    } catch (error) {
      // File might be new, skip
    }
  }

  return changes;
}

// Main
function main() {
  log('\n🔍 Skills Maintenance Check (Local)\n', 'cyan');

  const changedFiles = getChangedFiles();

  if (changedFiles.length === 0) {
    log('✓ No changes detected', 'green');
    process.exit(0);
  }

  log(`Found ${changedFiles.length} changed file(s)\n`, 'blue');

  const skills = getAllSkills();
  log(`Checking ${skills.length} skills...\n`, 'blue');

  const affectedSkills = [];

  for (const skill of skills) {
    const pathMatches = checkMonitorPaths(changedFiles, skill.metadata.monitorPaths);
    const depChanges = checkDependencyChanges(changedFiles, skill.metadata.monitorDependencies);

    if (pathMatches.length > 0 || depChanges.length > 0) {
      const priority = skill.metadata.maintenancePriority || 'MEDIUM';

      affectedSkills.push({
        name: skill.name,
        version: skill.metadata.version,
        priority,
        pathMatches,
        depChanges
      });
    }
  }

  if (affectedSkills.length === 0) {
    log('✓ No skills need review\n', 'green');
    process.exit(0);
  }

  // Group by priority
  const critical = affectedSkills.filter(s => s.priority === 'HIGH');
  const important = affectedSkills.filter(s => s.priority === 'MEDIUM');
  const informational = affectedSkills.filter(s => s.priority === 'LOW');

  if (critical.length > 0) {
    log('⚠️  CRITICAL - High Priority Skills Need Review:\n', 'red');
    for (const skill of critical) {
      log(`  ${skill.name} (v${skill.version})`, 'bold');
      log(`    Priority: ${skill.priority}`, 'yellow');

      if (skill.pathMatches.length > 0) {
        log('    Changed files:', 'yellow');
        skill.pathMatches.slice(0, 3).forEach(m => {
          log(`      - ${m.file}`, 'reset');
        });
        if (skill.pathMatches.length > 3) {
          log(`      ... and ${skill.pathMatches.length - 3} more`, 'reset');
        }
      }

      if (skill.depChanges.length > 0) {
        log('    Dependency changes:', 'yellow');
        skill.depChanges.forEach(d => {
          log(`      - ${d.dependency} in ${d.file}`, 'reset');
        });
      }

      log('', 'reset');
    }
  }

  if (important.length > 0) {
    log('📝 IMPORTANT - Medium Priority Skills:\n', 'yellow');
    for (const skill of important) {
      log(`  ${skill.name} (v${skill.version})`, 'bold');
      log(`    ${skill.pathMatches.length} file(s) changed, ${skill.depChanges.length} dependency change(s)`, 'reset');
      log('', 'reset');
    }
  }

  if (informational.length > 0) {
    log('ℹ️  INFORMATIONAL - Low Priority Skills:\n', 'blue');
    for (const skill of informational) {
      log(`  ${skill.name}: ${skill.pathMatches.length} file(s) changed`, 'reset');
    }
    log('', 'reset');
  }

  log('📚 Next Steps:\n', 'cyan');
  log('  1. Review the affected skills', 'reset');
  log('  2. Update skill documentation if needed', 'reset');
  log('  3. Update version numbers using semantic versioning', 'reset');
  log('  4. Add entries to .claude/skills/CHANGELOG.md', 'reset');
  log('\n  For help, see: .claude/skills/skills-maintenance/SKILL.md\n', 'reset');

  // Exit with warning code if critical skills affected
  process.exit(critical.length > 0 ? 1 : 0);
}

main();
