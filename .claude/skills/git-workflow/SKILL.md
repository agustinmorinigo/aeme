---
name: git-workflow
description: It defines the Git branching and development workflow for the project. Use when creating branches, making commits, or managing pull requests.
version: 1.0.0
model: haiku
lastUpdated: 2024-01-31
lastReviewed: 2024-01-31
maintenancePriority: LOW
monitorPaths:
  - .github/**
  - .husky/**
  - commitlint.config.js
monitorDependencies:
  - husky: "^9"
relatedSkills:
  - commit-conventions
---
This document describes the standard Git workflow for development in this monorepo.

## Branch Naming Convention
Branch names must follow this structure:
```
<type>/<descriptive-name>
```

Where:
- `<type>` matches a valid commitlint (commitlint.config.js file) **type** (`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`, `revert`)
- `<descriptive-name>` is a brief, hyphen-separated description of the work

### Examples
```
feat/add-login-page
fix/correct-validation-schema
chore/update-turbo-config
refactor/improve-button-component
docs/update-api-documentation
```

## Standard Development Workflow

### 1. Start from main
```bash
git checkout main
git pull origin main
```

### 2. Create a feature branch
```bash
git checkout -b <type>/<descriptive-name>
```

**Example:**
```bash
git checkout -b feat/add-user-dashboard
```

### 3. Make your changes
Edit files, write code, update documentation, etc.

### 4. Stage and commit changes
**IMPORTANT:** Before committing, refer to the `commit-conventions` skill for detailed commit message rules.
```bash
git add .
git commit -m "<type>(<scope>): <description>"
```

### 5. Push to remote
```bash
git push origin <branch-name>
```

**Example:**
```bash
git push origin feat/add-user-dashboard
```

### 6. Open a Pull Request
- Go to the repository on GitHub/GitLab/etc.
- Open a Pull Request from your branch to `main`
- Add a descriptive title (starting with a verb in imperative mood)
- Add a clear description of the changes
- Request reviews if required
- Wait for CI/CD checks to pass

## Complete Example
```bash
# Update main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feat/add-auth-endpoint

# Make changes to code...

# Commit changes (note: imperative verb "add")
git add .
git commit -m "feat(unovision-backend): add JWT authentication endpoint"

# Push to remote
git push origin feat/add-auth-endpoint

# Then open PR via web interface
```

## Important Notes
- **Always start from an updated `main` branch**
- **Use imperative mood** - "add feature" not "added feature" or "adds feature"
- **Keep branches focused** - one feature/fix per branch when possible
- **Pull Request target is always `main`** - all work merges into the main branch
