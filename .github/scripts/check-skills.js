#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const yaml = require('js-yaml');

/**
 * Skills Maintenance Check Script
 *
 * This script:
 * 1. Gets list of changed files in the PR
 * 2. Reads all skills and their monitorPaths/monitorDependencies
 * 3. Matches changed files against monitorPaths using glob patterns
 * 4. Detects dependency changes in package.json files
 * 5. Generates a report of skills that need review
 */

// Get changed files from git
function getChangedFiles() {
  const baseRef = process.env.BASE_REF || 'origin/main';
  const headRef = process.env.HEAD_REF || 'HEAD';

  try {
    const output = execSync(`git diff --name-only ${baseRef} ${headRef}`, {
      encoding: 'utf8'
    });
    return output.trim().split('\n').filter(Boolean);
  } catch (error) {
    console.error('Error getting changed files:', error.message);
    return [];
  }
}

// Parse YAML frontmatter from a file
function parseFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/^---\n([\s\S]*?)\n---/);

    if (!match) {
      return null;
    }

    return yaml.load(match[1]);
  } catch (error) {
    console.error(`Error parsing frontmatter from ${filePath}:`, error.message);
    return null;
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
    console.error('Error reading skills directory:', error.message);
  }

  return skills;
}

// Simple glob matching (supports ** and *)
function matchGlob(pattern, filePath) {
  // Convert glob pattern to regex
  let regexPattern = pattern
    .replace(/\./g, '\\.')
    .replace(/\*\*/g, '.*')
    .replace(/\*/g, '[^/]*');

  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(filePath);
}

// Check if any changed file matches monitorPaths
function checkMonitorPaths(changedFiles, monitorPaths) {
  if (!monitorPaths || monitorPaths.length === 0) {
    return [];
  }

  const matches = [];

  for (const file of changedFiles) {
    for (const pattern of monitorPaths) {
      if (matchGlob(pattern, file)) {
        matches.push({ file, pattern });
        break;  // One match per file is enough
      }
    }
  }

  return matches;
}

// Check for dependency changes
function checkDependencyChanges(changedFiles, monitorDependencies) {
  if (!monitorDependencies || monitorDependencies.length === 0) {
    return [];
  }

  // Check if any package.json changed
  const packageJsonFiles = changedFiles.filter(f => f.endsWith('package.json'));

  if (packageJsonFiles.length === 0) {
    return [];
  }

  const changes = [];

  for (const pkgFile of packageJsonFiles) {
    try {
      // Get the diff for this package.json
      const baseRef = process.env.BASE_REF || 'origin/main';
      const headRef = process.env.HEAD_REF || 'HEAD';

      const diff = execSync(`git diff ${baseRef} ${headRef} -- ${pkgFile}`, {
        encoding: 'utf8'
      });

      // Check if any monitored dependency changed
      for (const dep of monitorDependencies) {
        const depName = typeof dep === 'string' ? dep : Object.keys(dep)[0];

        if (diff.includes(`"${depName}"`)) {
          changes.push({
            file: pkgFile,
            dependency: depName
          });
        }
      }
    } catch (error) {
      console.error(`Error checking ${pkgFile}:`, error.message);
    }
  }

  return changes;
}

// Determine impact level
function determineImpact(skill, pathMatches, depChanges) {
  const priority = skill.metadata.maintenancePriority || 'MEDIUM';

  // High impact if:
  // - High priority skill with changes
  // - Multiple files changed in monitorPaths
  // - Dependency changes detected
  if (priority === 'HIGH' && (pathMatches.length > 0 || depChanges.length > 0)) {
    return 'critical';
  }

  if (pathMatches.length > 3 || depChanges.length > 0) {
    return 'important';
  }

  if (pathMatches.length > 0) {
    return 'informational';
  }

  return 'none';
}

// Generate markdown report
function generateReport(affectedSkills) {
  if (affectedSkills.length === 0) {
    return null;
  }

  const critical = affectedSkills.filter(s => s.impact === 'critical');
  const important = affectedSkills.filter(s => s.impact === 'important');
  const informational = affectedSkills.filter(s => s.impact === 'informational');

  let report = '## 🤖 Skills Maintenance Check\n\n';
  report += 'This PR modifies files that may require updating skills documentation.\n\n';

  if (critical.length > 0) {
    report += '### ⚠️ Critical - Requires Update\n\n';
    for (const skill of critical) {
      report += `- **${skill.name}** (v${skill.metadata.version})\n`;
      report += `  - Priority: ${skill.metadata.maintenancePriority}\n`;

      if (skill.pathMatches.length > 0) {
        report += `  - Changed files:\n`;
        skill.pathMatches.slice(0, 5).forEach(m => {
          report += `    - \`${m.file}\` (matches \`${m.pattern}\`)\n`;
        });
        if (skill.pathMatches.length > 5) {
          report += `    - ... and ${skill.pathMatches.length - 5} more\n`;
        }
      }

      if (skill.depChanges.length > 0) {
        report += `  - Dependency changes:\n`;
        skill.depChanges.forEach(d => {
          report += `    - \`${d.dependency}\` in \`${d.file}\`\n`;
        });
      }

      report += `  - Action: Review and update documentation\n`;
      report += `  - Command: \`/skills-maintenance\` and specify this skill\n\n`;
    }
  }

  if (important.length > 0) {
    report += '### 📝 Important - Review Recommended\n\n';
    for (const skill of important) {
      report += `- **${skill.name}** (v${skill.metadata.version})\n`;
      report += `  - ${skill.pathMatches.length} file(s) changed in monitored paths\n`;
      if (skill.depChanges.length > 0) {
        report += `  - ${skill.depChanges.length} dependency change(s) detected\n`;
      }
      report += `  - Action: Review for potential updates\n\n`;
    }
  }

  if (informational.length > 0) {
    report += '### ℹ️ Informational\n\n';
    report += '<details>\n<summary>Low-priority skills that may be affected (click to expand)</summary>\n\n';
    for (const skill of informational) {
      report += `- **${skill.name}**: ${skill.pathMatches.length} file(s) changed\n`;
    }
    report += '\n</details>\n\n';
  }

  report += '---\n\n';
  report += '**How to update skills:**\n';
  report += '1. Review the skill using `/skills-maintenance` command\n';
  report += '2. Update affected sections in the skill\n';
  report += '3. Update version number (see [semantic versioning](../.claude/skills/skills-maintenance/SKILL.md#semantic-versioning-for-skills))\n';
  report += '4. Add entry to [CHANGELOG.md](../.claude/skills/CHANGELOG.md)\n\n';
  report += '_Generated by [skills-maintenance-check workflow](.github/workflows/skills-maintenance-check.yml)_\n';

  return report;
}

// Main function
function main() {
  console.log('🔍 Checking skills maintenance...\n');

  // Get changed files
  const changedFiles = getChangedFiles();
  console.log(`Found ${changedFiles.length} changed files\n`);

  if (changedFiles.length === 0) {
    console.log('No changes detected');
    process.exit(0);
  }

  // Get all skills
  const skills = getAllSkills();
  console.log(`Found ${skills.length} skills\n`);

  // Check each skill
  const affectedSkills = [];

  for (const skill of skills) {
    const pathMatches = checkMonitorPaths(changedFiles, skill.metadata.monitorPaths);
    const depChanges = checkDependencyChanges(changedFiles, skill.metadata.monitorDependencies);

    if (pathMatches.length > 0 || depChanges.length > 0) {
      const impact = determineImpact(skill, pathMatches, depChanges);

      affectedSkills.push({
        ...skill,
        pathMatches,
        depChanges,
        impact
      });

      console.log(`✓ ${skill.name}: ${impact} (${pathMatches.length} paths, ${depChanges.length} deps)`);
    }
  }

  console.log(`\n${affectedSkills.length} skill(s) affected\n`);

  // Generate report
  const report = generateReport(affectedSkills);

  if (report) {
    // Write report to file
    fs.writeFileSync('.github/scripts/skills-comment.md', report);

    // Set output for GitHub Actions
    console.log('::set-output name=needs_review::true');
    console.log('\nReport generated successfully');
  } else {
    console.log('::set-output name=needs_review::false');
    console.log('\nNo skills need review');
  }
}

main();
