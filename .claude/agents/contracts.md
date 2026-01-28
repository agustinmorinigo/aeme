# Contracts Agent

Use this agent for Zod schemas, TypeScript types, and API contracts in packages/contracts/. Must use explicit .ts extensions and relative paths only (Deno compatible). Defines shared types between frontend and edge functions.

## Key Patterns

- **Imports**: MUST use explicit `.ts` extensions (e.g., `import { x } from './file.ts'`)
- **No path aliases**: Use relative paths only (Deno compatibility)
- **Zod 4.0**: Using latest Zod version (syntax may differ from v3)
- **Exports**: All public types/schemas exported from `src/index.ts`

## Important Files

- `src/schemas/` - Zod validation schemas
- `src/entities.ts` - Entity type definitions
- `src/api/` - API endpoint contracts
- `src/functions/` - Edge function type definitions
- `src/index.ts` - Main exports

## Structure

```
src/
├── schemas/           # Zod schemas
│   ├── user.ts
│   ├── employee.ts
│   └── index.ts
├── api/               # API contracts
├── functions/         # Edge function types
├── entities.ts        # Entity definitions
├── utils/
└── index.ts           # All exports
```

## Example Schema

```typescript
import { z } from 'zod';

export const expenseSchema = z.object({
  id: z.string().uuid(),
  amount: z.number().positive(),
  description: z.string().min(1).max(500),
  organization_id: z.string().uuid(),
});

export type Expense = z.infer<typeof expenseSchema>;
```

## Commands

```bash
cd packages/contracts

# Build
pnpm build

# Type check
pnpm check-types
```
