## Project Overview

AEME is a hybrid monorepo using **pnpm workspaces** and **Turborepo** that combines Node.js (frontend) and Deno (Supabase Edge Functions) runtimes. The project is a healthcare/HR management system.

## Common Commands

```bash
# Development (runs all apps/packages in dev mode)
pnpm run dev

# Build all packages
pnpm run build

# Type checking across all packages
pnpm check-types

# Run tests
pnpm test

# Run a single test file (from frontend or ui package)
cd apps/unovision-frontend && pnpm test -- path/to/file.test.tsx

# Lint and format (uses Biome)
pnpm format-and-lint:all

# Interactive commits (follows commitlint conventions)
pnpm commit

# Generate Supabase database types
pnpm run backend:db-types
```

### Backend/Supabase Commands (run from apps/unovision-backend/supabase)
```bash
npx supabase start         # Start local Supabase (requires Docker)
npx supabase stop          # Stop local Supabase
npx supabase db reset      # Reset DB and apply migrations
npx supabase migration new <name>  # Create new migration
npx supabase functions serve       # Run edge functions locally
```

## Architecture

### Monorepo Structure
- **apps/unovision-frontend**: React + Vite + TailwindCSS v4 frontend
- **apps/unovision-backend**: Supabase project (migrations, edge functions, seeds)
- **packages/ui**: Shared component library (Radix UI + shadcn/ui style, with Storybook)
- **packages/contracts**: Shared TypeScript types, Zod schemas, API contracts
- **packages/supabase-client**: Supabase client initialization and auto-generated DB types
- **packages/tailwind-config**: Shared TailwindCSS v4 design tokens

### Multi-Runtime Compatibility
The `contracts` and `supabase-client` packages run in both Node.js and Deno:
- **Must use explicit file extensions** in imports (`.ts`, `.js`)
- **No path aliases** (use relative paths only)
- Enforced by Biome rule `useImportExtensions` for backend/contracts/supabase-client

### Package Dependencies
```
unovision-frontend
├── @aeme/ui (components)
├── @aeme/contracts (types, schemas)
└── @aeme/supabase-client (DB client, types)

unovision-backend
├── @aeme/contracts
└── @aeme/supabase-client
```

## Key Conventions
- Use **kebab-case** for all files and folders: `user-profile.tsx`, `api-endpoints.ts`
- Documentation, comments and everything in English.
- All user-facing text should be in Spanish.

## Local Development Setup
Requires **4 terminals**:
1. Root: `pnpm run dev` (monorepo dev server)
2. Backend: `npx supabase start` (from apps/unovision-backend/supabase)
3. Backend: `npx supabase functions serve` (from apps/unovision-backend/supabase)

Local URLs:
- Frontend: http://localhost:5173 (Vite default)
- Supabase Studio: http://127.0.0.1:54323
- Email inbox (OTP): http://127.0.0.1:54324

## Skills Reference

- **backend-conventions**: Complete backend workflow for edge functions, migrations, and Supabase patterns - [.claude/skills/backend-conventions/SKILL.md](.claude/skills/backend-conventions/SKILL.md)
- **commit-conventions**: Commit message format and standards using commitlint - [.claude/skills/commit-conventions/SKILL.md](.claude/skills/commit-conventions/SKILL.md)
- **contracts-package-conventions**: API contracts, Zod schemas, and type definitions shared between frontend/backend - [.claude/skills/contracts-package-conventions/SKILL.md](.claude/skills/contracts-package-conventions/SKILL.md)
- **frontend-conventions**: Complete frontend workflow for React modules, forms, routing, and state management - [.claude/skills/frontend-conventions/SKILL.md](.claude/skills/frontend-conventions/SKILL.md)
- **functions-conventions**: Best practices for writing functions across the monorepo - [.claude/skills/functions-conventions/SKILL.md](.claude/skills/functions-conventions/SKILL.md)
- **git-workflow**: Git branching strategy and development workflow - [.claude/skills/git-workflow/SKILL.md](.claude/skills/git-workflow/SKILL.md)
- **icons-conventions**: Icon usage and management with Lucide Icons - [.claude/skills/icons-conventions/SKILL.md](.claude/skills/icons-conventions/SKILL.md)
- **iso-8601-conventions**: Date and time format standards (YYYY-MM-DD, HH:MM:SS) - [.claude/skills/iso-8601-conventions/SKILL.md](.claude/skills/iso-8601-conventions/SKILL.md)
- **react-component-conventions**: Guidelines for developing React components - [.claude/skills/react-component-conventions/SKILL.md](.claude/skills/react-component-conventions/SKILL.md)
- **skills-maintenance**: Process for reviewing and updating skills when code changes - [.claude/skills/skills-maintenance/SKILL.md](.claude/skills/skills-maintenance/SKILL.md)
- **supabase-client-package-conventions**: Supabase client initialization, database types, and entity interfaces - [.claude/skills/supabase-client-package-conventions/SKILL.md](.claude/skills/supabase-client-package-conventions/SKILL.md)
- **tailwind-config-package-conventions**: Design tokens, theming, and TailwindCSS v4 configuration - [.claude/skills/tailwind-config-package-conventions/SKILL.md](.claude/skills/tailwind-config-package-conventions/SKILL.md)
- **test-conventions**: Testing standards and practices using Vitest and Testing Library - [.claude/skills/test-conventions/SKILL.md](.claude/skills/test-conventions/SKILL.md)
- **typescript-conventions**: TypeScript coding standards and best practices - [.claude/skills/typescript-conventions/SKILL.md](.claude/skills/typescript-conventions/SKILL.md)
- **ui-package-conventions**: Shared UI component library structure and development - [.claude/skills/ui-package-conventions/SKILL.md](.claude/skills/ui-package-conventions/SKILL.md)