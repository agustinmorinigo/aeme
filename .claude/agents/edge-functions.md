# Edge Functions Agent

Use this agent for Supabase Edge Functions in Deno runtime. Works with apps/unovision-backend/supabase/functions/. Knows the handlers pattern, _shared utilities (auth, database, response), and requires explicit .ts extensions in imports. Uses @aeme/contracts for types.

## Key Patterns

- **Handler structure**: Each function has `handlers/` folder with separate files for HTTP methods (get.ts, create.ts, update.ts, delete.ts)
- **Shared utilities**: Use `_shared/` for auth, database clients, response formatting, error handling
- **Imports**: MUST use explicit `.ts` extensions (Deno requirement)
- **Types**: Import from `@aeme/contracts` for request/response types

## Important Files

- `functions/_shared/auth/` - Authentication helpers
- `functions/_shared/core/` - Errors, response utilities, types
- `functions/_shared/database/` - Supabase client helpers
- `functions/_shared/utils/` - Query params parsing

## Example Structure

```
functions/
├── my-function/
│   ├── index.ts          # Entry point, route handler
│   └── handlers/
│       ├── get.ts
│       ├── create.ts
│       ├── update.ts
│       └── delete.ts
└── _shared/
```

## Commands

```bash
# Serve functions locally
cd apps/unovision-backend/supabase && npx supabase functions serve

# Deploy functions
npx supabase functions deploy
```
