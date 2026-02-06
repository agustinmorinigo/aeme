---
name: backend-conventions
description: Complete backend development workflow and conventions. Use when developing edge functions, creating database migrations, or understanding the Supabase backend architecture and patterns.
version: 1.1.0
model: sonnet
lastUpdated: 2024-01-31
lastReviewed: 2024-01-31
maintenancePriority: HIGH
monitorPaths:
  - apps/unovision-backend/supabase/functions/**
  - apps/unovision-backend/supabase/migrations/**
  - apps/unovision-backend/supabase/seeds/**
  - apps/unovision-backend/supabase/config.toml
  - apps/unovision-backend/supabase/functions/deno.json
  - apps/unovision-backend/supabase/functions/_shared/**
  - apps/unovision-backend/supabase/functions/_contracts/**
  - apps/unovision-backend/supabase/functions/_entities/**
monitorDependencies:
  - "@supabase/supabase-js": "^2.58.0"
  - "@supabase/functions-js": "^2.4.1"
  - zod: "^4"
relatedSkills:
  - contracts-package-conventions
  - supabase-client-package-conventions
  - functions-conventions
  - typescript-conventions
  - iso-8601-conventions
---
This skill defines the complete workflow for backend development in the monorepo, including creating edge functions, handling database migrations, and following established patterns for authentication, error handling, and data access.

# Architecture Overview
The backend runs on Supabase Edge Functions using Deno runtime. Edge functions are serverless TypeScript functions that handle API requests with full type safety.

## Tech Stack
- Runtime: Deno (not Node.js)
- Database: PostgreSQL (via Supabase)
- Type Safety: TypeScript with auto-generated database types
- Validation: Zod schemas from @aeme/contracts
- ORM: Supabase JavaScript client
- Authentication: Supabase Auth with JWT
- Authorization: Role-based access control (RBAC) with Row Level Security (RLS)

## Key Directories
- `apps/unovision-backend/supabase/functions/` - Edge functions
- `apps/unovision-backend/supabase/migrations/` - Database migrations
- `apps/unovision-backend/supabase/seeds/` - Seed data
- `apps/unovision-backend/supabase/functions/_shared/` - Shared utilities

# Directory Structure

```
apps/unovision-backend/supabase/
├── config.toml              # Supabase configuration
├── functions/               # Edge Functions
│   ├── deno.json            # Deno configuration and imports
│   ├── _contracts/          # Re-exports from @aeme/contracts
│   ├── _entities/           # Re-exports from @aeme/supabase-client
│   ├── _shared/             # Shared utilities
│   │   ├── auth/            # Authentication helpers
│   │   ├── core/            # Core utilities (errors, response, types)
│   │   ├── database/        # Database clients and helpers
│   │   └── utils/           # General utilities
│   └── <function-name>/     # Individual edge functions
│       ├── index.ts         # Router (entry point)
│       └── handlers/        # Request handlers
├── migrations/              # Database migrations
└── seeds/                   # Seed data
```

## Naming Conventions
- Migration files: `YYYYMMDDHHMMSS_description.sql`

# Development Workflow

## Workflow 1: Creating a New Edge Function
Follow these steps to create a new edge function from scratch:

### Step 1: Plan the Function
Determine:
- Function name (kebab-case, e.g., `inventory-management`)
- Required endpoints (GET, POST, PUT, DELETE)
- Authentication requirements (admin-only, authenticated, public)
- Database tables involved
- Whether you need new migrations

### Step 2: Create Backend Contracts (if needed)
If the function requires new request/response types or validation schemas `packages/contracts`.
See the contracts-package-conventions skill for details.

### Step 3: Create Database Migration (if needed)
If you need to create or modify database tables:

1. Navigate to `apps/unovision-backend/supabase`
2. Create migration: `npx supabase migration new <descriptive-name>`
3. Write SQL in the generated file (see Migration Workflow below)
4. Reset local DB: `npx supabase db reset`
5. Regenerate types: `pnpm run backend:db-types` (from project root)

### Step 4: Create Function Folder Structure
```bash
cd apps/unovision-backend/supabase/functions
mkdir <function-name>
mkdir <function-name>/handlers
```

### Step 5: Create the Router (index.ts)
The router is the entry point for your edge function. It handles:
- CORS preflight requests
- Authentication
- URL routing to appropriate handlers
- Error handling

See [Router Pattern in examples.md](examples.md#router-pattern) for complete implementation.

### Step 6: Create Handler Files
Create handler files in `handlers/` directory:
- `get.ts` - List items with pagination
- `get-by-id.ts` - Get single item
- `create.ts` - Create new item
- `update.ts` - Update existing item
- `delete.ts` - Delete item

For nested resources: `handlers/<resource>/<action>.ts`

See complete handler templates in [examples.md](examples.md):
- [GET Handler (List with Pagination)](examples.md#get-handler-list-with-pagination)
- [GET by ID Handler](examples.md#get-by-id-handler)
- [CREATE Handler](examples.md#create-handler)
- [UPDATE Handler](examples.md#update-handler)
- [DELETE Handler](examples.md#delete-handler)

### Step 7: Configure Local Development
Update `config.toml`:
```toml
[functions.<function-name>]
verify_jwt = false  # Disable JWT verification in local dev
```

### Step 8: Test Locally
1. Start Supabase: `npx supabase start`
2. Serve functions: `npx supabase functions serve`
3. Test from frontend at `http://localhost:5173`
4. View in Supabase Studio: `http://127.0.0.1:54323`

### Step 9: Deploy (when ready)
Deployment is handled separately. Test thoroughly in local development first.

## Workflow 2: Adding Handlers to Existing Function
If you're adding new endpoints to an existing edge function:

### Step 1: Create New Handler File
Add to `functions/<function-name>/handlers/`. Follow the patterns from existing handlers (see [handler templates in examples.md](examples.md#get-handler-list-with-pagination)).

### Step 2: Update Router
Add route to `index.ts`. See [Complex Routing in examples.md](examples.md#complex-routing) for routing patterns.

### Step 3: Update Contracts (if needed)
Add request/response types and schemas to `packages/contracts`.

### Step 4: Test
Test the new endpoint in local development.

## Workflow 3: Creating Database Migrations
Migrations are SQL files that modify the database schema. They run in order and are version-controlled.

### Step 1: Create Migration File
From `apps/unovision-backend/supabase`:
```bash
npx supabase migration new <descriptive-name>
```

This creates: `migrations/YYYYMMDDHHMMSS_<descriptive-name>.sql`

### Step 2: Write Migration SQL
Common operations include:
- Create Table with enums and foreign keys
- Create Enum types
- Add updated_at triggers
- Enable Row Level Security (RLS)
- Create RLS policies for access control

See complete migration examples in [Migration Examples in examples.md](examples.md#migration-examples).

### Step 3: Apply Migration Locally

```bash
npx supabase db reset
```

This drops the database, re-runs all migrations, and applies seed data (supabase must be running).

### Step 4: Regenerate Database Types

From project root:
```bash
pnpm run backend:db-types
```

This updates `packages/supabase-client/src/types/database.types.ts`.

### Step 5: Update Entity Interfaces (if needed)
If you created new tables, add entity interfaces to `packages/supabase-client/src/entities/`.
See supabase-client-package-conventions skill for details.

### Step 6: Commit Migration
Migrations are version-controlled. Commit the migration file with your changes.

# Common Patterns

## Authentication
Available authentication helpers from `_shared/auth/index.ts`:

- `requireAuthOnly(req)` - Any authenticated user, returns `{ user, supabase }`
- `requireAuthWithAdmin(req)` - Admin role only (roleId: 1)
- `requireAuth(supabase)` - Verify user is authenticated
- `requireRole(supabase, roleName)` - Verify specific role
- `requireAdmin(supabase)` - Verify admin role

See [Authentication Patterns in examples.md](examples.md#authentication-patterns) for usage examples.

## Error Handling
Use `ApiError` class from `_shared/core/errors.ts`:

- `ApiError.validationError()` - Validation error (400)
- `ApiError.badRequest()` - Bad request (400)
- `ApiError.unauthorized()` - Unauthorized (401)
- `ApiError.forbidden()` - Forbidden (403)
- `ApiError.notFound()` - Not found (404)
- `ApiError.conflict()` - Conflict (409)
- `ApiError.internal()` - Internal error (500)

All errors are caught and formatted by `ResponseBuilder.error()`.
See [Error Handling Examples in examples.md](examples.md#error-handling-examples) for usage patterns.

## Response Format
Use `ResponseBuilder` from `_shared/core/response.ts`:
- `ResponseBuilder.success(data, statusCode)` - Success responses
- `ResponseBuilder.error(error)` - Error responses (automatic formatting)
- `ResponseBuilder.validationError(zodError)` - Validation errors from Zod
- `ResponseBuilder.cors()` - CORS preflight responses
See [Response Format Examples in examples.md](examples.md#response-format-examples) for usage patterns.

## Database Access
Two clients available from `_shared/database/clients.ts`:

- `supabaseAdmin` - Admin client (bypasses RLS, use for most operations)
- `getAuthenticatedClient(authHeader)` - User-scoped client (respects RLS)
See [Database Access Examples in examples.md](examples.md#database-access-examples) for usage.

## Pagination

Use `executePaginatedQuery` helper from `_shared/database/helpers.ts` with options for:
- Pagination (offset, limit)
- Search (text search across multiple fields)
- Sorting (field, order)
See [Pagination Examples in examples.md](examples.md#pagination-examples) for usage.

## Request Validation
Use Zod schemas from @aeme/contracts with `safeParse()` for validation. Always validate request bodies before processing.
See [Request Validation Examples in examples.md](examples.md#request-validation-examples) for usage patterns.

## Query Parameters

Use `parseQueryParams` utility from `_shared/utils/query-params.ts` with methods:
- `getNumber(key, default)` - Parse numeric parameters
- `getString(key, default)` - Parse string parameters
- `getBoolean(key, default)` - Parse boolean parameters
See [Query Parameters Examples in examples.md](examples.md#query-parameters-examples) for usage.

# Importing from Packages
Edge functions use Deno runtime, which requires explicit imports and bridge files.

## Bridge Files
- `_contracts/index.ts` - Re-exports from `@aeme/contracts`
- `_entities/index.ts` - Re-exports from `@aeme/supabase-client/entities`

## Import Patterns
Always use:
- `_contracts/index.ts` for types and schemas
- `_entities/index.ts` for entity interfaces, union types, and value arrays
- `_shared/core/types.ts` for database types

Never import directly from `@aeme/*` packages in edge functions.
See [Import Patterns Examples in examples.md](examples.md#import-patterns-examples) for correct usage.

## Deno Configuration
The `deno.json` file defines external dependencies for Supabase, Deno runtime, and Zod.
See [Deno Configuration Example in examples.md](examples.md#deno-configuration-example) for the full configuration.

# Testing

Currently, testing is done manually:
- Use Supabase Studio to inspect database
- Test endpoints from frontend during development
- Use Email Inbox (http://127.0.0.1:54324) for auth emails

Formal testing infrastructure may be added later.

# Best Practices

## Security
- Always validate input with Zod schemas
- Use RLS policies for data access control
- Never expose sensitive data in responses
- Use `supabaseAdmin` carefully (bypasses RLS)
- Check for conflicts before creating records
- Verify resources exist before updating/deleting

## Performance
- Use pagination for list endpoints
- Select only needed fields from database
- Use database indexes for frequently queried fields
- Avoid N+1 queries (use joins or batch queries)

## Code Organization
- Keep handlers focused on a single operation
- Extract complex logic to separate utility functions
- Use early returns to reduce nesting
- Follow the single responsibility principle
- Reuse shared utilities from `_shared/`

## Error Messages
- Provide clear, actionable error messages
- Don't expose internal implementation details
- Use appropriate HTTP status codes
- Include relevant context in error details

## Migrations
- Make migrations idempotent when possible (use IF NOT EXISTS)
- Never modify existing migrations (create new ones)
- Test migrations locally before committing
- Include rollback plan for complex migrations
- Document breaking changes clearly

# Important Notes

## Multi-Runtime Compatibility
- Edge functions run on Deno, not Node.js
- Use explicit `.ts` extensions in imports
- Use relative paths only (no path aliases)
- Import from bridge files (`_contracts/`, `_entities/`)

## Local Development
- Always run `npx supabase start` before development
- Run `npx supabase db reset` after creating migrations
- Regenerate types with `pnpm run backend:db-types`
- Disable JWT verification in `config.toml` for local dev

## Type Safety
- Database types are auto-generated, never modify manually
- Use types from @aeme/contracts for consistency
- Validate all input with Zod schemas
- Use TypeScript strict mode

## CORS
- All responses must include CORS headers
- Handle OPTIONS requests for preflight
- Use `ResponseBuilder` for automatic CORS headers

# Related Skills
- contracts-package-conventions
- supabase-client-package-conventions
- functions-conventions
- typescript-conventions

# Additional Resources
- For complete code examples, see [examples.md](examples.md)
