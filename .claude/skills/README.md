# Skills Maintenance System

This directory contains skills (documentation) for the AEME project with an automated maintenance system to keep them up-to-date.

## What are Skills?

Skills are structured documentation files that guide Claude (and developers) on:
- How to develop features
- Architecture patterns
- Coding conventions
- Package structures
- Workflows and processes

## Directory Structure

```
.claude/skills/
├── README.md                          # This file
├── CHANGELOG.md                       # Central changelog for all skills
├── backend-conventions/               # Backend development workflow
├── commit-conventions/                # Commit message conventions
├── contracts-package-conventions/     # API contracts and schemas
├── frontend-conventions/              # Frontend development workflow
├── functions-conventions/             # Function writing conventions
├── git-workflow/                      # Git branching workflow
├── icons-conventions/                 # Icon usage conventions
├── iso-8601-conventions/              # Date/time format standard
├── react-component-conventions/       # React component guidelines
├── skills-maintenance/                # Skills maintenance process
├── supabase-client-package-conventions/  # Supabase client usage
├── tailwind-config-package-conventions/  # Design tokens and theming
├── test-conventions/                  # Testing standards
├── typescript-conventions/            # TypeScript conventions
└── ui-package-conventions/            # UI package structure
```

## Skills Maintenance System

### Overview

Skills can become outdated when code changes. The maintenance system automatically:
1. **Detects** when code changes might affect skills
2. **Alerts** developers via PR comments
3. **Tracks** changes in CHANGELOG.md
4. **Versions** skills using semantic versioning

### Skill Metadata

Each skill has metadata in its frontmatter:

```yaml
---
name: skill-name
description: What this skill covers and when to use it
version: 1.2.0                      # Semantic versioning
model: sonnet                       # Recommended Claude model
lastUpdated: 2024-01-31            # Last content change
lastReviewed: 2024-01-31           # Last verification
maintenancePriority: HIGH           # HIGH | MEDIUM | LOW
monitorPaths:                       # Paths that trigger review
  - apps/*/src/**
  - packages/*/src/**
monitorDependencies:                # Dependencies to monitor
  - react: "^19"
  - vite: "^7"
relatedSkills:                      # Connected skills
  - other-skill
  - another-skill
---
```

### Priority Levels

**HIGH** - Directly coupled to code, need frequent updates:
- `frontend-conventions`
- `backend-conventions`

**MEDIUM** - Package-specific, moderate coupling:
- `ui-package-conventions`
- `contracts-package-conventions`
- `supabase-client-package-conventions`
- `tailwind-config-package-conventions`

**LOW** - General conventions, rarely change:
- `typescript-conventions`
- `test-conventions`
- `functions-conventions`
- `react-component-conventions`
- `git-workflow`
- `commit-conventions`
- `icons-conventions`
- `iso-8601-conventions`
- `skills-maintenance`

## Using the System

### For Developers

#### Check if your changes affect skills (locally)

```bash
pnpm run skills:check
```

This command runs before you commit to warn you if any skills need review.

#### Update a skill

1. **Review** the skill: Read `.claude/skills/<skill-name>/SKILL.md`
2. **Update** content as needed
3. **Bump version**:
   - MAJOR (2.0.0): Breaking changes in documented patterns
   - MINOR (1.1.0): New sections or features
   - PATCH (1.0.1): Typos or clarifications
4. **Update dates**: `lastUpdated` and `lastReviewed`
5. **Update CHANGELOG.md**: Add entry describing changes
6. **Commit changes**

#### Use Claude to help

Invoke the skills-maintenance skill:
```
/skills-maintenance
```

Then describe what changed and Claude will help update the relevant skills.

### In Pull Requests

When you open a PR, the **Skills Maintenance Check** workflow runs automatically:

1. Analyzes changed files
2. Matches against `monitorPaths` of all skills
3. Checks for dependency changes in `package.json`
4. Posts a comment with:
   - **Critical**: HIGH priority skills that need immediate review
   - **Important**: MEDIUM priority skills that should be checked
   - **Informational**: LOW priority skills that might be affected

### Semantic Versioning

**MAJOR (X.0.0)** - Breaking changes
- Old pattern no longer works
- Fundamental approach changed
- Example: Migrating from Class to Function components

**MINOR (1.X.0)** - Additions
- New sections added
- New patterns documented
- New features covered
- Example: Adding WebSockets section

**PATCH (1.0.X)** - Fixes
- Typo corrections
- Clarifications
- Small improvements
- Example: Fixing code example syntax

## Files and Scripts

### GitHub Workflow

- `.github/workflows/skills-maintenance-check.yml` - Runs on PRs
- `.github/scripts/check-skills.js` - Detection logic
- `.github/scripts/skills-comment.md` - Generated PR comment (temporary)

### Local Scripts

- `.claude/scripts/check-skills-local.js` - Local checker
- Package script: `pnpm run skills:check`

### Documentation

- `CHANGELOG.md` - History of all skill changes
- `skills-maintenance/SKILL.md` - Complete maintenance process guide
- This README

## CHANGELOG.md

The central changelog tracks all skill updates:

```markdown
## [skill-name] - 1.2.0 - 2024-01-31

### Added
- New section on [feature]

### Changed
- Updated [section] for [reason]

### Deprecated
- [Old pattern] use [new pattern] instead

### Removed
- Outdated section on [removed feature]

### Fixed
- Corrected [error]

### Trigger
- PR #123: "Description of what caused this update"
```

## Best Practices

### When to Update Skills

**Always update** when:
- Breaking changes in documented patterns
- New major features documented
- Significant refactoring of documented code
- Dependency major/minor version updates

**Consider updating** when:
- New optional patterns emerge
- Minor improvements to examples
- Clarifications needed

**Don't update** for:
- Internal refactoring (no API changes)
- Bug fixes (no pattern changes)
- Trivial code style changes

### How to Write Good Skills

1. **Be specific** - Reference actual code, not abstractions
2. **Use examples** - Show don't tell
3. **Keep updated** - Better a small accurate skill than large outdated one
4. **Link related** - Use `relatedSkills` to connect documentation
5. **Version properly** - Follow semantic versioning strictly

### Maintaining the System

The skills-maintenance system itself should be reviewed:
- Monthly: Check if detection logic works well
- Quarterly: Review if priority levels are still appropriate
- Annually: Consider if the system needs evolution

## Troubleshooting

### "My PR shows skill warnings but I didn't change anything related"

Check if:
- Your changes are in a broadly-monitored path (like `src/**`)
- A dependency changed inadvertently
- The skill's `monitorPaths` are too broad

Solution: Review the skill to confirm it's actually fine, update `lastReviewed`

### "I updated the code but the skill check didn't trigger"

Check if:
- Your changes are in paths covered by `monitorPaths`
- The skill has appropriate monitoring configured
- You pushed your changes (local checks only see local changes)

Solution: Manually review and update the skill, improve `monitorPaths`

### "The local check fails but I can't fix it now"

You can:
- Update skills later (not blocking)
- Create an issue to track the update
- Note in PR description that skills need review

The check is a **warning**, not a blocker.

## Contributing

To improve the skills maintenance system:
1. Update detection logic in `.github/scripts/check-skills.js`
2. Improve the `skills-maintenance` skill
3. Add monitoring to under-monitored skills
4. Suggest new priority levels or metadata fields

## Related Documentation

- [skills-maintenance/SKILL.md](skills-maintenance/SKILL.md) - Complete process guide
- [CHANGELOG.md](CHANGELOG.md) - History of all changes
- [Design Document](../../scratchpad/skills-maintenance-plan.md) - Original design (in scratchpad)

## License

Same as the AEME project.
