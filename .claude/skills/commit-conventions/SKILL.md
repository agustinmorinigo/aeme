---
name: commit-conventions
description: It provides commit message conventions for the project to ensure consistent and clear version control practices. Use when writing commit messages or when the user needs information about commit standards.
version: 1.0.0
model: haiku
lastUpdated: 2024-01-31
lastReviewed: 2024-01-31
maintenancePriority: LOW
monitorPaths:
  - commitlint.config.js
  - .husky/commit-msg
  - apps/*/package.json
  - packages/*/package.json
monitorDependencies:
  - "@commitlint/cli": "^20"
  - "@commitlint/config-conventional": "^20"
  - commitizen: "^4"
relatedSkills:
  - git-workflow
---
This project uses **commitlint** to enforce commit message standards. All commits must follow the conventions defined in `commitlint.config.js` located at the repository root.

## Commit Message Format
Commits **must** follow the Conventional Commits format with a **mandatory scope**:
```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Examples
```
feat(unovision-frontend): add login page
fix(contracts): correct schema validation
chore(monorepo): update dependencies
perf(unovision-backend): optimize database queries
docs(ui): update button component documentation
```

## Valid Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code formatting (no functional changes)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `ci` - CI/CD changes
- `build` - Build system changes
- `revert` - Reverting a previous commit

## Valid Scopes
Scopes are **dynamically detected** from the monorepo structure:

### App Scopes
All directories in `apps/` (e.g., `unovision-frontend`, `unovision-backend`)

### Package Scopes
All directories in `packages/` (e.g., `ui`, `contracts`, `supabase-client`, `tailwind-config`)

### Special Scopes
- `monorepo` - Root-level changes (turbo.json, pnpm-workspace.yaml, etc.)
- `deps` - Shared dependency updates affecting multiple packages
- `release` - Release management and versioning

## Strict Rules
1. **Scope is MANDATORY** - Every commit must include a scope. Commits without scopes will be rejected.
2. **Subject must be lowercase** - Use lowercase for the commit subject.
3. **No period at the end** - Subject lines must not end with a period.
4. **Max header length: 100 characters** - Keep the entire first line under 100 characters.
5. **Blank lines required** - If body or footer is present, they must be separated from the header by a blank line.

## Tips for Writing Good Commits
- A commit should represent a single logical change. Avoid committing multiple unrelated changes in one commit.
- Write clear, concise commit messages that explain the "what" of the change.
- Keep subjects clear and descriptive. Always use imperative mood (e.g., "add" not "added" or "adds")
