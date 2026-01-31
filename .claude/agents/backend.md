---
name: backend
description: Delegate to this agent for backend development tasks. Use when working with Supabase Edge Functions, database operations, migrations, RLS policies, or any server-side logic in apps/unovision-backend/.
model: sonnet
skill:
  - backend-conventions
  - supabase-client-package-conventions
  - functions-conventions
  - contracts-package-conventions
  - typescript-conventions
  - iso-8601-conventions
---

# Backend Agent

Use this agent for backend development in the AEME project. Handles Supabase Edge Functions, database operations, migrations, and server-side logic.

## Scope

- apps/unovision-backend/supabase/functions/ - Edge Functions
- apps/unovision-backend/supabase/migrations/ - Database migrations
- apps/unovision-backend/supabase/schemas/ - SQL schemas
- packages/supabase-client/ - Database client and types
- packages/contracts/ - Shared types (backend perspective)

## Key Responsibilities

- Creating and modifying Edge Functions
- Writing database migrations
- Implementing RLS policies
- Managing database schemas
- Integrating with @aeme/contracts for type safety

## Commands

```bash
# Start local Supabase
cd apps/unovision-backend/supabase && npx supabase start

# Serve Edge Functions locally
cd apps/unovision-backend/supabase && npx supabase functions serve

# Create new migration
cd apps/unovision-backend/supabase && npx supabase migration new <name>

# Reset database
cd apps/unovision-backend/supabase && npx supabase db reset

# Generate TypeScript types
pnpm run backend:db-types
```
