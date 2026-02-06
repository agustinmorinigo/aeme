---
name: supabase-client-package-conventions
description: Explains the supabase-client package structure and usage. Use when working with database, database types, entities, entity interfaces, Supabase client initialization, or when generating database types.
version: 1.0.0
model: sonnet
lastUpdated: 2024-01-31
lastReviewed: 2024-01-31
maintenancePriority: MEDIUM
monitorPaths:
  - packages/supabase-client/src/**
  - packages/supabase-client/package.json
  - apps/unovision-backend/supabase/migrations/**
  - apps/unovision-backend/supabase/functions/_entities/**
monitorDependencies:
  - "@supabase/supabase-js": "^2.39"
relatedSkills:
  - contracts-package-conventions
  - backend-conventions
  - frontend-conventions
  - typescript-conventions
---
The `packages/supabase-client` package provides centralized Supabase client configuration and database-related resources shared across both frontend (Node.js) and backend (Deno) applications. This package ensures type safety and consistency when working with the database.

# Package Structure
The package contains the following key components:
- `src/client.ts`: Supabase client initialization function
- `src/types/database.types.ts`: Auto-generated TypeScript types that mirror the database schema
- `src/entities/`: Entity interfaces representing database tables
- `src/generate-types.mjs`: Script to regenerate database types from Supabase

# Multi-Runtime Compatibility
This package is designed to work in two different JavaScript runtimes:
- Node.js: Used in the frontend (Vite/React)
- Deno: Used in Supabase Edge Functions (backend)

Due to this multi-runtime requirement, there are strict conventions that must be followed:
- All imports must use explicit file extensions (.ts, .js)
- No path aliases allowed (use relative paths only)
- Enforced by Biome rule `useImportExtensions`

# Package Exports
The package has two main export paths:

1. Main export (`@aeme/supabase-client`):
   - `createSupabaseClient`: Function to create typed Supabase client
   - `FunctionInvokeOptions`: Type for edge function invocation options
   - `isAuthApiError`: Helper to check if error is auth-related

2. Entities export (`@aeme/supabase-client/entities`):
   - All entity interfaces (Doctor, Employee, Profile, etc.)
   - All literal union types and their value arrays (Gender, genderValues, DocumentType, documentTypeValues, RoleName, roleNameValues, etc.)

# Usage Examples
Import the client creator:
```typescript
import { createSupabaseClient } from '@aeme/supabase-client';
```

Import entity types and union types:
```typescript
import { Profile, Employee, Gender, genderValues, DocumentType, documentTypeValues } from '@aeme/supabase-client/entities';
```

Import specific types:
```typescript
import type { Role } from '@aeme/supabase-client/entities';
```

# Entity Conventions
- Entity interfaces are defined in `src/entities/` directory
- Each entity represents a database table with its structure
- Entity interfaces use PascalCase naming (e.g., `EmployeeSchedule`)
- All entities are re-exported through `src/entities/index.ts`
- Literal union types and their value arrays are defined alongside their entity interfaces (e.g., `Gender` and `genderValues` are in `profiles.ts`, `RoleName` and `roleNameValues` are in `roles.ts`)

# Creating or Modifying Entities
When adding or modifying entities:
1. Create or edit the entity file in `src/entities/`
2. Use explicit `.ts` extensions for all imports
3. Export the interface, union type, and/or value array
4. Add the export to `src/entities/index.ts`
5. Use relative paths for internal imports (e.g., `import type { ContractType } from './employees.ts';`)

# Database Type Generation
The package includes auto-generated database types that reflect the actual database schema:
- Types are generated using the Supabase CLI
- Run generation: `pnpm run backend:db-types` (from project root)
- Output file: `src/types/database.types.ts`
- Requires local Supabase to be running: `npx supabase start`

When to regenerate types:
- After creating or modifying database migrations
- After running `npx supabase db reset`
- When database schema changes need to be reflected in TypeScript

# Important Notes
- Never modify `database.types.ts` manually - it's auto-generated
- The client is typed with the Database type for full type safety
- Entity interfaces provide application-level abstractions over database types
