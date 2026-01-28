# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AEME is a hybrid monorepo using **pnpm workspaces** and **Turborepo** that combines Node.js (frontend) and Deno (Supabase Edge Functions) runtimes. The project is a healthcare/HR management system called "Unovision".

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

Edge Functions (Deno)
├── @aeme/contracts
└── @aeme/supabase-client
```

## Key Conventions

### File Naming
Use **kebab-case** for all files and folders: `user-profile.tsx`, `api-endpoints.ts`

### Commit Messages
Commits require a scope and follow conventional format:
```
feat(unovision-frontend): add login page
fix(contracts): correct schema validation
chore(monorepo): update dependencies
```
Valid scopes: app/package names (`unovision-frontend`, `unovision-backend`, `ui`, `contracts`, `supabase-client`, `tailwind-config`) plus `monorepo`, `deps`, `release`

### Database Workflow
1. Create migration: `npx supabase migration new <name>`
2. Write SQL in the migration file
3. Reset local DB: `npx supabase db reset`
4. Regenerate types: `pnpm run backend:db-types`
5. Types output to: `packages/supabase-client/src/types/database.types.ts`

### UI Package
- Build before using: components export from `dist/`
- Run `pnpm run dev` from root to watch all packages
- Storybook available: `cd packages/ui && pnpm dev:storybook`

## Local Development Setup

Requires **4 terminals**:
1. Root: `pnpm run dev` (monorepo dev server)
2. Backend: `npx supabase start` (from apps/unovision-backend/supabase)
3. Backend: `npx supabase functions serve` (edge functions)

Local URLs:
- Frontend: http://localhost:5173 (Vite default)
- Supabase Studio: http://127.0.0.1:54323
- Email inbox (OTP): http://127.0.0.1:54324
