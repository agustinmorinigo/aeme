---
name: skills-maintenance
description: Use this skill to review and update skills when code, architecture, or dependencies change. Invoked when monitoring detects changes in tracked paths or dependencies, or during periodic reviews.
version: 1.0.0
model: opus
lastUpdated: 2024-01-31
lastReviewed: 2024-01-31
maintenancePriority: LOW
monitorPaths:
  - .claude/skills/**
  - .claude/skills/CHANGELOG.md
  - package.json
  - apps/*/package.json
  - packages/*/package.json
monitorDependencies: []
relatedSkills:
  - frontend-conventions
  - backend-conventions
  - ui-package-conventions
  - contracts-package-conventions
  - supabase-client-package-conventions
  - tailwind-config-package-conventions
  - typescript-conventions
  - test-conventions
  - functions-conventions
  - react-component-conventions
  - git-workflow
  - commit-conventions
  - icons-conventions
  - iso-8601-conventions
---

This skill guides the process of reviewing and updating skills to keep them aligned with the current codebase. It defines when to update skills, how to determine impact, and how to version changes properly.

# When to Invoke This Skill

## Automatic Triggers
1. **Dependency updates**: When package.json shows major/minor version changes in monitored dependencies
2. **Structure changes**: When files in `monitorPaths` are added/removed/moved significantly
3. **Breaking changes**: When commits mention "BREAKING CHANGE" affecting documented patterns
4. **Periodic review**: Monthly review of high-priority skills, quarterly for medium/low priority

## Manual Triggers
1. After completing a major refactoring
2. After architectural decisions that change documented patterns
3. When team reports outdated or incorrect skill information
4. When new patterns emerge that should be documented

# Review Process

## Step 1: Identify Affected Skills

Given a change description (commit, PR, or manual description):

1. **Check recent history**:
   - Review `.claude/skills/CHANGELOG.md` for recent changes
   - Identify patterns of recent updates

2. **Path-based detection**:
   - Identify skills with `monitorPaths` matching changed files
   - Consider indirect effects (shared utilities, types)

3. **Dependency-based detection**:
   - Check `monitorDependencies` against package.json changes
   - Major/minor version changes require review
   - Patch versions only if breaking changes in changelog

4. **Related skills cascade**:
   - Check `relatedSkills` of affected skills
   - Consider if changes propagate to related documentation

## Step 2: Assess Impact Level

For each potentially affected skill, determine the impact:

### 🔴 High Impact (requires immediate update)
- Breaking API changes in documented helpers or utilities
- New required patterns/conventions that replace old ones
- Deprecated approaches still prominently documented
- Major dependency upgrades that change usage patterns (React 18→19, Vite 6→7)
- Removal of documented features
- Changes to core architecture patterns

**Action**: Update skill immediately, bump version accordingly

### 🟡 Medium Impact (requires review and possible update)
- New optional patterns or approaches available
- Additional utilities/helpers added to documented areas
- Minor dependency updates with new features
- Clarifications needed based on user feedback
- Examples that could be improved

**Action**: Review skill, update if beneficial, consider minor version bump

### 🟢 Low Impact (review only, likely no action)
- Internal refactoring without API changes
- Code style improvements
- Bug fixes that don't change documented behavior
- Typo fixes in code comments

**Action**: Mark as reviewed (update `lastReviewed`), no version change

## Step 3: Update Process

### 3.1 Prepare for Update

1. **Read the complete skill**:
   - Understand current structure and content
   - Note any areas that seem outdated
   - Check examples.md if it exists

2. **Research the changes**:
   - Read PR descriptions or commit messages
   - Review changed files
   - Check dependency changelogs if applicable
   - Test new patterns if unclear

3. **Determine version bump**:
   - MAJOR (X.0.0): Breaking changes in documented patterns
   - MINOR (1.X.0): New additions without breaking existing content
   - PATCH (1.0.X): Corrections, clarifications, typos

### 3.2 Update Content

**Using the appropriate model**:
- Opus: Complex updates requiring deep analysis
- Sonnet: Moderate updates with clear scope
- Haiku: Simple corrections or additions

**Update strategy**:

1. **Preserve structure and style**:
   - Maintain the skill's existing organization
   - Match the tone and level of detail
   - Keep formatting consistent

2. **Update affected sections**:
   - Identify specific sections impacted by changes
   - Update references to paths, files, helpers
   - Update dependency versions
   - Add/remove/modify examples as needed

3. **Add deprecation notices if needed**:
   ```markdown
   ## Pattern Name (Deprecated)

   > ⚠️ **Deprecated**: This pattern is deprecated as of v2.0.0. Use [new pattern] instead.
   > See [link to new section] for the updated approach.

   [Keep old documentation for reference]
   ```

4. **Update examples.md if exists**:
   - Ensure code examples compile and make sense
   - Update imports to current syntax
   - Verify types/interfaces still exist
   - Add new examples for new patterns

### 3.3 Update Metadata

Update the frontmatter:

```yaml
---
name: skill-name
description: [keep unless fundamentally changed]
version: 1.2.0  # Bump according to change type
model: [keep unless changed]
lastUpdated: 2024-01-31  # Today's date
lastReviewed: 2024-01-31  # Today's date
monitorPaths:  # Update if structure changed
  - path/to/monitor/**
monitorDependencies:  # Update if deps changed
  - package: "^1.2.0"
relatedSkills:  # Update if new relationships
  - related-skill
maintenancePriority: [keep unless changed]
---
```

### 3.4 Update CHANGELOG.md

Add entry to `.claude/skills/CHANGELOG.md`:

```markdown
## [skill-name] - 1.2.0 - 2024-01-31

### Added
- New section on [feature]
- Examples for [new pattern]

### Changed
- Updated [section] to reflect [change]
- Modified examples to use [new syntax]

### Deprecated
- [Old pattern] in favor of [new pattern]

### Removed
- Outdated section on [removed feature]

### Fixed
- Corrected typo in [section]
- Updated path reference from [old] to [new]

### Trigger
- PR #123: "Add support for [feature]"
- Commit abc123: "Refactor [component]"
- Dependency update: react 19.0 → 19.1
```

### 3.5 Update Related Skills

If the skill has `relatedSkills` in metadata:

1. Review each related skill for potential impacts
2. Update if they reference the changed skill
3. Consider if they need similar changes
4. Update their `lastReviewed` even if no changes

## Step 4: Verification

Before considering the update complete, verify:

- ✅ All code examples are syntactically correct
- ✅ References to paths/files are accurate
- ✅ Dependency versions match package.json
- ✅ No contradictions with other skills
- ✅ `monitorPaths` and `monitorDependencies` are current
- ✅ CHANGELOG.md has complete entry
- ✅ Version follows semantic versioning rules
- ✅ Related skills reviewed

# Semantic Versioning for Skills

## Major Version (X.0.0)

**When to use**:
- Breaking changes in documented patterns (old pattern no longer works)
- Complete restructuring of skill content
- Removal of major sections
- Fundamental shift in approach

**Examples**:
- Migrating from offset-based to cursor-based pagination
- Changing from Class Components to Function Components
- Switching from Redux to Zustand

**Impact**: Users following old skill will encounter errors or deprecated patterns

## Minor Version (1.X.0)

**When to use**:
- New sections added
- New patterns/helpers documented
- Additional examples provided
- Expanded coverage of existing topics
- Dependency minor version updates with new features

**Examples**:
- Adding section on WebSockets to backend-conventions
- Documenting new helper function in shared utilities
- Adding examples for new React hook

**Impact**: Existing skill content remains valid, new information available

## Patch Version (1.0.X)

**When to use**:
- Typo corrections
- Clarifications of existing content
- Minor example improvements
- Path/reference corrections
- Formatting improvements

**Examples**:
- Fixing typo in code example
- Clarifying ambiguous instruction
- Updating file path that was renamed

**Impact**: No functional changes, improved clarity only

# Maintenance Commands

When working with skills maintenance, use these patterns:

## Review Specific Skill
```
Review the [skill-name] skill for accuracy against current code in [area]
```

## Review After Change
```
Review skills affected by [PR/commit number and description]
```

## Full Audit
```
Audit all [high/medium/low]-priority skills for outdated content
```

## Update Specific Skill
```
Update [skill-name] skill to version [new-version] based on [change description]
```

# Detection Strategies

## File-based Detection

Monitor git commits/PRs for changes in these patterns:

**Frontend**:
- `apps/unovision-frontend/src/**` (modules, components, services)
- `apps/unovision-frontend/package.json` (dependencies)

**Backend**:
- `apps/unovision-backend/supabase/functions/**` (edge functions)
- `apps/unovision-backend/supabase/migrations/**` (database schema)

**Packages**:
- `packages/*/src/**` (package code)
- `packages/*/package.json` (package dependencies)

**Configuration**:
- `turbo.json`, `biome.json` (monorepo config)
- `.github/workflows/**` (CI/CD)

## Dependency-based Detection

Monitor package.json changes for version bumps in:

**Frontend dependencies**:
- React, Vite, TailwindCSS
- Zustand, TanStack Query, React Hook Form
- React Router, TanStack Table

**Backend dependencies**:
- Supabase client libraries
- Deno runtime version

**Shared dependencies**:
- Zod
- TypeScript

**Trigger review on**:
- Major version changes (always)
- Minor version changes (check changelog)
- Patch version changes (only if breaking changes mentioned)

## Pattern-based Detection

Flag for review when commits/PRs mention:

**Keywords**:
- "BREAKING CHANGE", "BREAKING:"
- "refactor:", "feat:" (affecting shared code)
- "migration", "migrate", "deprecated"
- "architecture", "pattern"

**Scopes** (in commit messages):
- `feat(shared):`, `refactor(shared):`
- `feat(architecture):`, `refactor(architecture):`
- `feat(conventions):`, `docs(conventions):`

# Priority Matrix

| Priority | Review Frequency | Review Trigger | Max Age Before Review |
|----------|------------------|----------------|-----------------------|
| HIGH | After each major change | monitorPaths changes | 14 days |
| MEDIUM | Monthly or after minor changes | Dependency updates | 30 days |
| LOW | Quarterly | Manual review only | 90 days |

**High-priority skills**:
- frontend-conventions
- backend-conventions

**Medium-priority skills**:
- ui-package-conventions
- contracts-package-conventions
- supabase-client-package-conventions
- tailwind-config-package-conventions

**Low-priority skills**:
- typescript-conventions
- test-conventions
- functions-conventions
- react-component-conventions
- git-workflow
- commit-conventions
- icons-conventions
- iso-8601-conventions

# Output Format

When completing a skill update, provide:

## Update Summary

```markdown
# Skill Update: [skill-name]

## Version: [old] → [new]

## Changes Made:
- [Brief list of changes]

## Sections Updated:
- [Section name]: [What changed]

## New Examples Added:
- [Example description]

## Verification:
- ✅ Code examples verified
- ✅ Paths verified
- ✅ Dependencies verified
- ✅ No contradictions
- ✅ CHANGELOG.md updated

## Related Skills to Review:
- [skill-name]: [Why it might need review]
```

## CHANGELOG Entry

Provide the exact entry to add to CHANGELOG.md

## Related Skills Alert

List any related skills that should be reviewed as a result of this change

# Common Patterns

## Pattern: Dependency Update

```
1. Check package.json diff
2. Read dependency changelog for breaking changes
3. Search skill for version references
4. Update version numbers
5. Add new features section if applicable
6. Bump minor version
7. Update CHANGELOG.md
```

## Pattern: New Helper Function

```
1. Locate helper in codebase
2. Understand its purpose and usage
3. Find appropriate section in skill
4. Add documentation with example
5. Update examples.md if complex
6. Bump minor version
7. Update CHANGELOG.md
```

## Pattern: Refactored Structure

```
1. Map old paths to new paths
2. Search skill for old path references
3. Update all path references
4. Update file tree diagrams
5. Verify imports in examples
6. Bump patch version (or minor if significant)
7. Update CHANGELOG.md
```

## Pattern: Deprecated Pattern

```
1. Identify old and new patterns
2. Add deprecation notice to old section
3. Add new section for new pattern
4. Update examples to show both (with deprecation warning)
5. Plan removal for next major version
6. Bump major or minor version (depending on impact)
7. Update CHANGELOG.md with deprecation
```

# Best Practices

## Do's
- ✅ Always read the complete skill before updating
- ✅ Preserve the existing structure and tone
- ✅ Update examples.md when updating SKILL.md
- ✅ Verify code examples actually work
- ✅ Update CHANGELOG.md immediately
- ✅ Be specific about what changed and why
- ✅ Include references (PR, commit, issue)
- ✅ Review related skills

## Don'ts
- ❌ Don't change skill fundamentally without good reason
- ❌ Don't update version without updating content
- ❌ Don't forget to update metadata (lastUpdated, version)
- ❌ Don't leave broken examples
- ❌ Don't create contradictions with other skills
- ❌ Don't skip CHANGELOG.md updates
- ❌ Don't bump major version lightly

# Troubleshooting

## Issue: Not sure if update is needed

**Solution**:
1. Read the skill completely
2. Read the changed code
3. If in doubt, mark as reviewed but don't update
4. Better to review again later than create unnecessary churn

## Issue: Multiple skills affected

**Solution**:
1. Prioritize by maintenancePriority (HIGH first)
2. Start with most directly affected
3. Update related skills in dependency order
4. Batch CHANGELOG.md entries together

## Issue: Breaking change but skill still valid

**Solution**:
1. Add deprecation notice to old pattern
2. Add new section for new pattern
3. Bump minor version (not major) if both work
4. Plan major version when old pattern is fully removed

## Issue: Unclear what version bump to use

**Solution**:
- If users following skill would encounter errors: MAJOR
- If new information is added: MINOR
- If just clarification or typos: PATCH
- When in doubt: MINOR

# Related Skills
- All skills (this skill maintains all other skills)

# Additional Resources
- See `.claude/skills/CHANGELOG.md` for complete history
- See scratchpad/skills-maintenance-plan.md for detailed system design
