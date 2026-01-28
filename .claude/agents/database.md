# Database Agent

Use this agent for PostgreSQL migrations, SQL schemas, RLS policies, and database design. Works with apps/unovision-backend/supabase/migrations/ and schemas/. Knows Supabase conventions, ENUMs, and runs 'pnpm run backend:db-types' after migrations.

## Key Patterns

- **Migrations**: Create with `npx supabase migration new <name>`
- **Schema files**: Modular SQL in `schemas/` folder (enums.sql, tables, rls-policies.sql)
- **ENUMs**: Define in `schemas/enums.sql` for reusability
- **RLS**: Row Level Security policies in `schemas/rls-policies.sql`
- **PostgreSQL 17**: Using latest PostgreSQL version

## Important Files

- `schemas/setup.sql` - Initial setup, extensions
- `schemas/enums.sql` - All ENUM type definitions
- `schemas/rls-policies.sql` - Row Level Security policies
- `schemas/functions.sql` - Database functions
- `config.toml` - Schema execution order

## Workflow

1. Create migration: `npx supabase migration new <name>`
2. Write SQL in the migration file
3. Reset local DB: `npx supabase db reset`
4. Regenerate types: `pnpm run backend:db-types`
5. Types output to: `packages/supabase-client/src/types/database.types.ts`

## Commands

```bash
cd apps/unovision-backend/supabase

# Create new migration
npx supabase migration new add-expenses-table

# Reset DB and apply migrations
npx supabase db reset

# Generate TypeScript types
pnpm run backend:db-types
```
