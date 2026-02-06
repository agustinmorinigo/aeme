---
name: contracts-package-conventions
description: Explains the contracts package structure and usage. Use when working with API contracts, Zod schemas, validations, edge function types, request/response types, or shared business logic between frontend and backend.
version: 1.1.0
model: opus
lastUpdated: 2024-01-31
lastReviewed: 2024-01-31
maintenancePriority: MEDIUM
monitorPaths:
  - packages/contracts/src/**
  - packages/contracts/package.json
  - apps/unovision-backend/supabase/functions/_contracts/**
monitorDependencies:
  - zod: "^4"
  - "@aeme/supabase-client": "workspace:*"
relatedSkills:
  - supabase-client-package-conventions
  - backend-conventions
  - frontend-conventions
  - typescript-conventions
  - iso-8601-conventions
---
The `packages/contracts` package serves as a shared contract layer between frontend (Node.js) and backend (Deno) applications. It provides type safety, validation schemas, and API contracts that ensure consistency across the entire application.

# Purpose and Benefits
This package solves three key problems:
1. Type Safety: Ensures frontend and backend agree on data structures
2. Validation: Provides Zod schemas for runtime validation for both frontend forms and backend requests
3. Single Source of Truth: Eliminates duplicate type definitions across apps

# Package Structure
The package is organized into four main directories:

## src/api/
Contains general API-related types used across the application:
- `QueryParams`: Base type for query parameters in GET requests

## src/entities.ts
Re-exports all entity types from `@aeme/supabase-client/entities`. This allows both packages to share the same entity definitions while maintaining proper dependency structure.

## src/functions/
Contains API contract definitions for edge functions, organized by domain (user-management, attendance, justifications, organizations). Each domain has files per operation (create, get, update, delete, get-by-id).

Function contracts define three types of interfaces:
- Request Params: Query parameters (e.g., `GetUsersParams`)
- Request Body: POST/PUT body data (e.g., `CreateUserBody`, `UpdateUserBody`)
- Response: API response structure (e.g., `GetUsersResponse`, `CreateUserResponse`)
- Raw Response: Database response before transformation (e.g., `GetUsersRawResponse`)

Naming conventions:
- Params interfaces: `{Operation}{Domain}Params` (e.g., `GetUsersParams`)
- Body interfaces: `{Operation}{Domain}Body` (e.g., `CreateUserBody`)
- Response types: `{Operation}{Domain}Response` (e.g., `GetUsersResponse`)
- Raw response types: `{Operation}{Domain}RawResponse` (for untransformed DB data)

## src/schemas/
Contains Zod validation schemas organized by domain, mirroring the functions structure. Schemas are used for:
- Frontend form validation
- Backend request validation
- Type inference with `z.infer<typeof schema>`

Schema naming conventions:
- Schema constants: `{operation}{Domain}Schema` (e.g., `createUserSchema`)
- Inferred types: `{Operation}{Domain}Schema` (e.g., `CreateUserSchema`)

Schemas can be composed and extended:
```typescript
// Base schema
export const createUserSchema = z.object({ /* ... */ });

// Extended schema
export const updateUserSchema = createUserSchema.extend({
  userId: z.uuid()
});
```

Sub-schemas can be broken down for reusability and clarity:
```typescript
// Sub-schemas in separate files
export const userProfileSchema = z.object({ /* ... */ });
export const employeeInfoSchema = z.object({ /* ... */ });

// Composed main schema
export const createUserSchema = z.object({
  profile: userProfileSchema,
  employeeData: employeeInfoSchema.optional()
});
```

## src/utils/
Contains shared utilities like regex patterns used across validation schemas:
- `onlyLettersRegex`: Validates text with only letters
- `onlyNumbersRegex`: Validates numeric strings

# Multi-Runtime Compatibility
This package works in both Node.js (frontend) and Deno (backend). Critical requirements:
- All imports MUST use explicit file extensions (.ts, .js)
- No path aliases allowed - use relative paths only
- Enforced by Biome rule `useImportExtensions`

# Usage Patterns

## Frontend Usage
Import contracts directly from the package:
```typescript
import type { GetUsersParams, GetUsersResponse, CreateUserBody } from '@aeme/contracts';
import { createUserSchema } from '@aeme/contracts';
```

Common use cases:
- API service functions: Type parameters and responses
- React Query hooks: Type query/mutation params
- Form validation: Use or extend Zod schemas
- Component props: Type data structures
- Stores: Type state structures

Example - API service:
```typescript
import type { GetJustificationsParams, GetJustificationsResponse } from '@aeme/contracts';

export async function get(params: GetJustificationsParams) {
  return invokeSupabaseFunction<GetJustificationsResponse>('attendance/justifications', {
    method: 'GET',
    params,
  });
}
```

Example - Form validation with schema extension:
```typescript
import { createUserSchema } from '@aeme/contracts';

export const handleUserFormSchema = createUserSchema
  .omit({ roleIds: true })
  .extend({
    roles: z.array(z.object({
      value: z.enum(roleNameValues),
      id: z.number(),
    })).min(1)
  });
```

## Backend Usage
Backend (Deno) cannot import npm packages directly. Instead:
1. Use the `_contracts/index.ts` file that re-exports the package
2. Import with relative paths

```typescript
import { createUserSchema } from '../../_contracts/index.ts';
import type { GetUsersRawResponse, GetUsersResponse } from '../../_contracts/index.ts';
```

Common use cases:
- Request validation: Use Zod schemas with `safeParse()`
- Response typing: Type return values
- Data transformation: Type raw DB responses and transformed outputs

Example - Edge function handler:
```typescript
import type { GetUsersRawResponse, GetUsersResponse } from '../../_contracts/index.ts';

export async function getUsers(req: Request) {
  // Query returns GetUsersRawResponse
  const result = await executePaginatedQuery<GetUsersRawResponse>(baseQuery, options);

  // Transform to GetUsersResponse
  const transformedData: GetUsersResponse = {
    users: result.data.map(item => ({
      profile: item,
      roles: item.roles.map(r => r.roles)
    }))
  };

  return ResponseBuilder.success(transformedData, 200);
}
```

# When to Add New Contracts

## Adding Function Contracts
Create new function contract files when:
- Adding a new edge function endpoint
- Modifying request/response structure of existing endpoints
- The contract defines the "shape" of API communication

Steps:
1. Create file in `src/functions/{domain}/{operation}.ts`
2. Define Params interface (extends QueryParams for GET requests)
3. Define Body interface for POST/PUT requests
4. Define Response interface(s)
5. Define RawResponse if transformation occurs
6. Export all interfaces
7. Add export to `src/functions/{domain}/index.ts`

## Adding Schemas
Create new schemas when:
- Adding form validation in frontend
- Adding request validation in backend
- Need runtime validation (not just TypeScript types)

Steps:
1. Create schema file in `src/schemas/{domain}/{operation}/`
2. Import required entities from entities.ts
3. Define Zod schema with validation rules
4. Export schema constant and inferred type
5. Add export to appropriate index.ts files
6. Consider breaking down into sub-schemas for reusability

# Key Conventions

## File Organization
- Functions and schemas mirror each other by domain
- One file per operation (create, get, update, delete, get-by-id)
- Use index.ts files to re-export at each level
- Keep related schemas together in subdirectories

## Type Composition
- Use TypeScript utility types (Omit, Pick, Partial) to derive types from entities
- Extend base types with additional fields when needed
- Create intermediate types for complex structures

Example:
```typescript
import type { Profile, Employee } from '../../entities.ts';

type ProfileData = Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>;
type EmployeeData = Omit<Employee, 'id'> & { schedules: Schedule[] };

export interface CreateUserBody {
  profile: ProfileData;
  employeeData?: EmployeeData;
}
```

## Schema Composition
- Break complex schemas into reusable sub-schemas
- Use .extend() to add fields to existing schemas
- Use .omit() to remove fields
- Use .optional() for optional nested objects

## Date and Time Validation
- ALWAYS use ISO 8601 standard for date, time, datetime, and timestamp validations
- Use Zod's ISO validators: `z.iso().date()` for dates, `z.iso().time()` for times (with "precision: -1" preferably)
- ISO 8601 ensures consistency across frontend, backend, and database
- See the `iso-8601-conventions` skill for detailed information about the standard

## Validation Messages
- Always provide user-friendly Spanish error messages
- Be specific about constraints (min length, max length, format)
- Use consistent terminology across schemas

# Difference Between Functions and Schemas

## Functions (src/functions/)
- TypeScript type definitions only
- Compile-time type checking
- Used for API contracts
- No runtime validation
- Lightweight - just type information

## Schemas (src/schemas/)
- Zod validation schemas
- Runtime validation and type inference
- Used for form validation and request validation
- Can validate at runtime with .parse() or .safeParse()
- Includes validation rules and error messages

Often you'll have both for the same operation:
- Function contract defines the shape (e.g., `CreateUserBody`)
- Schema validates the data (e.g., `createUserSchema`)
- They should match but serve different purposes

# Important Notes
- Never import @aeme/contracts directly in backend Deno code - use _contracts/index.ts
- Always use explicit .ts extensions in this package
- Schemas should be composed from smaller, reusable pieces
- Raw response types should be defined when transformation occurs between DB and API response
- Keep validation rules in sync between frontend and backend schemas
- Entity types come from supabase-client package - re-export them, don't duplicate
- Query params should extend the base QueryParams type
- In validation schemas, always use ".trim()" for string fields to avoid whitespace issues
