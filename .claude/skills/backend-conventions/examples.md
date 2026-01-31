# Backend Development Examples

This file contains complete code examples for common backend patterns in edge functions. All code examples referenced in [SKILL.md](SKILL.md) are provided here.

## Table of Contents
1. [Router Pattern](#router-pattern)
2. [GET Handler (List with Pagination)](#get-handler-list-with-pagination)
3. [GET by ID Handler](#get-by-id-handler)
4. [CREATE Handler](#create-handler)
5. [UPDATE Handler](#update-handler)
6. [DELETE Handler](#delete-handler)
7. [Complex Routing](#complex-routing)
8. [Authentication Patterns](#authentication-patterns)
9. [Error Handling Examples](#error-handling-examples)
10. [Response Format Examples](#response-format-examples)
11. [Database Access Examples](#database-access-examples)
12. [Pagination Examples](#pagination-examples)
13. [Request Validation Examples](#request-validation-examples)
14. [Query Parameters Examples](#query-parameters-examples)
15. [Import Patterns Examples](#import-patterns-examples)
16. [Deno Configuration Example](#deno-configuration-example)
17. [Migration Examples](#migration-examples)

---

## Router Pattern

Complete router implementation for an edge function:

```typescript
// functions/user-management/index.ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { requireAuthWithAdmin } from '../_shared/auth/index.ts';
import { ApiError } from '../_shared/core/errors.ts';
import { ResponseBuilder } from '../_shared/core/response.ts';
import { getUsers } from './handlers/get.ts';
import { getUserById } from './handlers/get-by-id.ts';
import { createUser } from './handlers/create.ts';
import { updateUser } from './handlers/update.ts';
import { deleteUser } from './handlers/delete.ts';

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return ResponseBuilder.cors();
  }

  try {
    // Require admin authentication
    await requireAuthWithAdmin(req);

    // Parse URL and extract path parts
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const method = req.method;

    // Route matching
    if (method === 'GET' && pathParts.length === 1) {
      // GET /user-management
      return await getUsers(req);
    }

    if (method === 'GET' && pathParts.length === 2) {
      // GET /user-management/:id
      return await getUserById(pathParts[1]);
    }

    if (method === 'POST' && pathParts.length === 1) {
      // POST /user-management
      return await createUser(req);
    }

    if (method === 'PUT' && pathParts.length === 2) {
      // PUT /user-management/:id
      return await updateUser(req, pathParts[1]);
    }

    if (method === 'DELETE' && pathParts.length === 2) {
      // DELETE /user-management/:id
      return await deleteUser(pathParts[1]);
    }

    // Route not found
    return ResponseBuilder.error(ApiError.notFound('Route'));
  } catch (error) {
    return ResponseBuilder.error(error);
  }
});
```

---

## GET Handler (List with Pagination)

Complete implementation with pagination, search, and sorting:

```typescript
// functions/user-management/handlers/get.ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import type {
  GetUsersRawResponse,
  GetUsersResponse,
} from '../../../_contracts/index.ts';
import { ResponseBuilder } from '../../../_shared/core/response.ts';
import { supabaseAdmin } from '../../../_shared/database/clients.ts';
import { executePaginatedQuery } from '../../../_shared/database/helpers.ts';
import { parseQueryParams } from '../../../_shared/utils/query-params.ts';

export async function getUsers(req: Request) {
  try {
    // Extract and parse query parameters
    const params = parseQueryParams(req);
    const offset = params.getNumber('offset', 0);
    const limit = params.getNumber('limit', 10);
    const search = params.getString('search');
    const sortBy = params.getString('sortBy', 'updatedAt');
    const sortOrder = params.getString('sortOrder', 'desc') as 'asc' | 'desc';

    // Build base query with relations
    const baseQuery = supabaseAdmin
      .from('profiles')
      .select(
        `
        *,
        profilesRoles(
          roleId,
          roles(id, name, description)
        ),
        profilesOrganizations(
          organizationId,
          organizations(id, name)
        )
      `,
        { count: 'exact' }
      );

    // Execute paginated query with search
    const result = await executePaginatedQuery<GetUsersRawResponse>(
      baseQuery,
      {
        pagination: { offset, limit },
        search,
        searchFields: ['firstName', 'lastName', 'email'],
        sort: { field: sortBy, order: sortOrder },
      }
    );

    // Transform data to match response contract
    const transformedData: GetUsersResponse = {
      users: result.data.map((profile) => ({
        id: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        documentType: profile.documentType,
        documentNumber: profile.documentNumber,
        phone: profile.phone,
        address: profile.address,
        gender: profile.gender,
        birthdate: profile.birthdate,
        roles: profile.profilesRoles.map((pr) => ({
          id: pr.roles.id,
          name: pr.roles.name,
          description: pr.roles.description,
        })),
        organizations: profile.profilesOrganizations.map((po) => ({
          id: po.organizations.id,
          name: po.organizations.name,
        })),
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      })),
      count: result.count,
      hasMore: result.hasMore,
    };

    return ResponseBuilder.success(transformedData, 200);
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
```

---

## GET by ID Handler

Fetch a single resource by ID:

```typescript
// functions/user-management/handlers/get-by-id.ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import type { GetUserByIdResponse } from '../../../_contracts/index.ts';
import { ApiError } from '../../../_shared/core/errors.ts';
import { ResponseBuilder } from '../../../_shared/core/response.ts';
import { supabaseAdmin } from '../../../_shared/database/clients.ts';

export async function getUserById(userId: string) {
  try {
    // Fetch user with relations
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select(
        `
        *,
        profilesRoles(
          roleId,
          roles(id, name, description)
        ),
        profilesOrganizations(
          organizationId,
          organizations(id, name)
        )
      `
      )
      .eq('id', userId)
      .single();

    if (error || !data) {
      throw ApiError.notFound('User');
    }

    // Transform data
    const user: GetUserByIdResponse = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      phone: data.phone,
      address: data.address,
      gender: data.gender,
      birthdate: data.birthdate,
      roles: data.profilesRoles.map((pr) => ({
        id: pr.roles.id,
        name: pr.roles.name,
        description: pr.roles.description,
      })),
      organizations: data.profilesOrganizations.map((po) => ({
        id: po.organizations.id,
        name: po.organizations.name,
      })),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    return ResponseBuilder.success(user, 200);
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
```

---

## CREATE Handler

Create a new resource with validation and conflict checking:

```typescript
// functions/user-management/handlers/create.ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createUserSchema } from '../../../_contracts/index.ts';
import { ApiError } from '../../../_shared/core/errors.ts';
import { ResponseBuilder } from '../../../_shared/core/response.ts';
import { supabaseAdmin } from '../../../_shared/database/clients.ts';

export async function createUser(req: Request) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const validation = createUserSchema.safeParse(body);

    if (!validation.success) {
      return ResponseBuilder.validationError(validation.error);
    }

    const validated = validation.data;

    // Check for email conflict
    const { data: existingUser } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('email', validated.profile.email)
      .single();

    if (existingUser) {
      throw ApiError.conflict('A user with this email already exists');
    }

    // Create auth user
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: validated.profile.email,
        email_confirm: true,
        user_metadata: {
          firstName: validated.profile.firstName,
          lastName: validated.profile.lastName,
        },
      });

    if (authError || !authData.user) {
      throw ApiError.internal(`Failed to create auth user: ${authError?.message}`);
    }

    const userId = authData.user.id;

    // Create profile
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: userId,
        ...validated.profile,
      });

    if (profileError) {
      // Rollback auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(userId);
      throw ApiError.internal(`Failed to create profile: ${profileError.message}`);
    }

    // Assign roles
    if (validated.roleIds && validated.roleIds.length > 0) {
      const roleInserts = validated.roleIds.map((roleId) => ({
        profileId: userId,
        roleId,
      }));

      const { error: rolesError } = await supabaseAdmin
        .from('profilesRoles')
        .insert(roleInserts);

      if (rolesError) {
        throw ApiError.internal(`Failed to assign roles: ${rolesError.message}`);
      }
    }

    // Assign organizations
    const orgInserts = validated.organizationIds.map((orgId) => ({
      profileId: userId,
      organizationId: orgId,
    }));

    const { error: orgsError } = await supabaseAdmin
      .from('profilesOrganizations')
      .insert(orgInserts);

    if (orgsError) {
      throw ApiError.internal(`Failed to assign organizations: ${orgsError.message}`);
    }

    return ResponseBuilder.success(
      {
        message: 'User created successfully',
        userId,
      },
      201
    );
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
```

---

## UPDATE Handler

Update an existing resource with validation:

```typescript
// functions/user-management/handlers/update.ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { updateUserSchema } from '../../../_contracts/index.ts';
import { ApiError } from '../../../_shared/core/errors.ts';
import { ResponseBuilder } from '../../../_shared/core/response.ts';
import { supabaseAdmin } from '../../../_shared/database/clients.ts';

export async function updateUser(req: Request, userId: string) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const validation = updateUserSchema.safeParse({ ...body, userId });

    if (!validation.success) {
      return ResponseBuilder.validationError(validation.error);
    }

    const validated = validation.data;

    // Verify user exists
    const { data: existingUser, error: fetchError } = await supabaseAdmin
      .from('profiles')
      .select('id, email')
      .eq('id', userId)
      .single();

    if (fetchError || !existingUser) {
      throw ApiError.notFound('User');
    }

    // Check email conflict (if email is being changed)
    if (validated.profile.email && validated.profile.email !== existingUser.email) {
      const { data: emailConflict } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('email', validated.profile.email)
        .neq('id', userId)
        .single();

      if (emailConflict) {
        throw ApiError.conflict('Email already in use by another user');
      }
    }

    // Update profile
    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update(validated.profile)
      .eq('id', userId);

    if (updateError) {
      throw ApiError.internal(`Failed to update profile: ${updateError.message}`);
    }

    // Update organizations (if provided)
    if (validated.organizationIds) {
      // Delete existing organizations
      await supabaseAdmin
        .from('profilesOrganizations')
        .delete()
        .eq('profileId', userId);

      // Insert new organizations
      if (validated.organizationIds.length > 0) {
        const orgInserts = validated.organizationIds.map((orgId) => ({
          profileId: userId,
          organizationId: orgId,
        }));

        const { error: orgsError } = await supabaseAdmin
          .from('profilesOrganizations')
          .insert(orgInserts);

        if (orgsError) {
          throw ApiError.internal(`Failed to update organizations: ${orgsError.message}`);
        }
      }
    }

    // Update roles (if provided)
    if (validated.roleIds) {
      // Delete existing roles
      await supabaseAdmin
        .from('profilesRoles')
        .delete()
        .eq('profileId', userId);

      // Insert new roles
      if (validated.roleIds.length > 0) {
        const roleInserts = validated.roleIds.map((roleId) => ({
          profileId: userId,
          roleId,
        }));

        const { error: rolesError } = await supabaseAdmin
          .from('profilesRoles')
          .insert(roleInserts);

        if (rolesError) {
          throw ApiError.internal(`Failed to update roles: ${rolesError.message}`);
        }
      }
    }

    return ResponseBuilder.success(
      {
        message: 'User updated successfully',
        userId,
      },
      200
    );
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
```

---

## DELETE Handler

Delete a resource with verification:

```typescript
// functions/attendance/handlers/justifications/delete.ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { ApiError } from '../../../../_shared/core/errors.ts';
import { ResponseBuilder } from '../../../../_shared/core/response.ts';
import { supabaseAdmin } from '../../../../_shared/database/clients.ts';

export async function deleteJustification(justificationId: string) {
  try {
    // Verify justification exists
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from('attendanceJustifications')
      .select('id')
      .eq('id', justificationId)
      .single();

    if (fetchError || !existing) {
      throw ApiError.notFound('Justification');
    }

    // Delete justification
    const { error: deleteError } = await supabaseAdmin
      .from('attendanceJustifications')
      .delete()
      .eq('id', justificationId);

    if (deleteError) {
      throw ApiError.internal(`Failed to delete justification: ${deleteError.message}`);
    }

    return ResponseBuilder.success(
      {
        message: 'Justification deleted successfully',
        justificationId,
      },
      200
    );
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
```

---

## Complex Routing

Routing with nested resources and custom actions:

```typescript
// functions/attendance/index.ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { requireAuthWithAdmin } from '../_shared/auth/index.ts';
import { ApiError } from '../_shared/core/errors.ts';
import { ResponseBuilder } from '../_shared/core/response.ts';
import { getEmployees } from './handlers/employees/get.ts';
import { getJustifications } from './handlers/justifications/get.ts';
import { getJustificationById } from './handlers/justifications/get-by-id.ts';
import { createJustification } from './handlers/justifications/create.ts';
import { updateJustification } from './handlers/justifications/update.ts';
import { deleteJustification } from './handlers/justifications/delete.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return ResponseBuilder.cors();
  }

  try {
    await requireAuthWithAdmin(req);

    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const method = req.method;

    // GET /attendance/employees
    if (method === 'GET' && pathParts[1] === 'employees') {
      return await getEmployees(req);
    }

    // GET /attendance/justifications
    if (method === 'GET' && pathParts[1] === 'justifications' && pathParts.length === 2) {
      return await getJustifications(req);
    }

    // GET /attendance/justifications/:id
    if (method === 'GET' && pathParts[1] === 'justifications' && pathParts.length === 3) {
      return await getJustificationById(pathParts[2]);
    }

    // POST /attendance/justifications
    if (method === 'POST' && pathParts[1] === 'justifications') {
      return await createJustification(req);
    }

    // PUT /attendance/justifications/:id
    if (method === 'PUT' && pathParts[1] === 'justifications' && pathParts.length === 3) {
      return await updateJustification(req, pathParts[2]);
    }

    // DELETE /attendance/justifications/:id
    if (method === 'DELETE' && pathParts[1] === 'justifications' && pathParts.length === 3) {
      return await deleteJustification(pathParts[2]);
    }

    return ResponseBuilder.error(ApiError.notFound('Route'));
  } catch (error) {
    return ResponseBuilder.error(error);
  }
});
```

---

## Authentication Patterns

Different authentication requirements:

```typescript
// Admin-only endpoint
import { requireAuthWithAdmin } from '../_shared/auth/index.ts';

Deno.serve(async (req) => {
  try {
    await requireAuthWithAdmin(req);
    // Handler logic
  } catch (error) {
    return ResponseBuilder.error(error);
  }
});

// Any authenticated user
import { requireAuthOnly } from '../_shared/auth/index.ts';

Deno.serve(async (req) => {
  try {
    const { user, supabase } = await requireAuthOnly(req);
    // Handler logic - can access user.id, user.email, etc.
  } catch (error) {
    return ResponseBuilder.error(error);
  }
});

// Specific role requirement
import { requireAuthOnly } from '../_shared/auth/index.ts';
import { requireRole } from '../_shared/auth/index.ts';
import { RoleName } from '../../_entities/index.ts';

Deno.serve(async (req) => {
  try {
    const { supabase } = await requireAuthOnly(req);
    await requireRole(supabase, RoleName.DOCTOR);
    // Handler logic
  } catch (error) {
    return ResponseBuilder.error(error);
  }
});
```

---

## Error Handling Examples

Common error scenarios:

```typescript
// Validation error
const validation = schema.safeParse(data);
if (!validation.success) {
  return ResponseBuilder.validationError(validation.error);
}

// Not found error
if (!data) {
  throw ApiError.notFound('User');
}

// Conflict error
if (existingUser) {
  throw ApiError.conflict('Email already exists');
}

// Unauthorized error
if (!authHeader) {
  throw ApiError.unauthorized('Missing authorization header');
}

// Forbidden error
if (!hasPermission) {
  throw ApiError.forbidden('You do not have permission to perform this action');
}

// Bad request error
if (!requiredParam) {
  throw ApiError.badRequest('Missing required parameter: employeeId');
}

// Internal error (for database errors)
if (error) {
  throw ApiError.internal(`Database error: ${error.message}`);
}
```

---

## Response Format Examples

Standard response patterns using `ResponseBuilder`:

```typescript
// Success response
return ResponseBuilder.success(data, 200);

// Created response
return ResponseBuilder.success({ id }, 201);

// Error response (automatic formatting)
return ResponseBuilder.error(error);

// Validation error (from Zod)
return ResponseBuilder.validationError(zodError);

// CORS preflight
return ResponseBuilder.cors();
```

---

## Database Access Examples

Two database clients available:

```typescript
// Admin client (bypasses RLS, use for most operations)
import { supabaseAdmin } from '../../_shared/database/clients.ts';

// User-scoped client (respects RLS)
import { getAuthenticatedClient } from '../../_shared/database/clients.ts';
const supabase = getAuthenticatedClient(authHeader);
```

---

## Pagination Examples

Using `executePaginatedQuery` helper:

```typescript
import { executePaginatedQuery } from '../../_shared/database/helpers.ts';

const baseQuery = supabaseAdmin
  .from('tableName')
  .select('*', { count: 'exact' });

const result = await executePaginatedQuery(baseQuery, {
  pagination: { offset, limit },
  search,
  searchFields: ['name', 'email'],
  sort: { field: 'createdAt', order: 'desc' },
});
```

---

## Request Validation Examples

Using Zod schemas from `@aeme/contracts`:

```typescript
import { createItemSchema } from '../../_contracts/index.ts';

const body = await req.json();
const validation = createItemSchema.safeParse(body);

if (!validation.success) {
  return ResponseBuilder.validationError(validation.error);
}

const validated = validation.data;
```

---

## Query Parameters Examples

Using `parseQueryParams` utility:

```typescript
import { parseQueryParams } from '../../_shared/utils/query-params.ts';

const params = parseQueryParams(req);
const offset = params.getNumber('offset', 0);
const limit = params.getNumber('limit', 10);
const search = params.getString('search');
const isActive = params.getBoolean('isActive');
```

---

## Import Patterns Examples

Proper import patterns for edge functions:

```typescript
// Types and schemas from contracts
import type { GetUsersResponse } from '../../_contracts/index.ts';
import { createUserSchema } from '../../_contracts/index.ts';

// Entities and enums
import { RoleName, Gender } from '../../_entities/index.ts';

// Database type
import type { Database } from '../../_shared/core/types.ts';

// Never import directly from @aeme/* in edge functions
```

---

## Deno Configuration Example

The `deno.json` file defines external dependencies:

```json
{
  "imports": {
    "@supabase/supabase-js": "jsr:@supabase/supabase-js@^2.58.0",
    "@supabase/functions-js": "jsr:@supabase/functions-js@^2.4.1",
    "zod": "npm:zod@^4.0.0"
  }
}
```

---

## Migration Examples

### Create Table with RLS

```sql
-- Create enum type
CREATE TYPE "public"."attendanceStatus" AS ENUM (
  'present',
  'absent',
  'late',
  'justified'
);

-- Create table
CREATE TABLE IF NOT EXISTS "public"."attendanceRecords" (
  "id"         "uuid" DEFAULT "gen_random_uuid"() PRIMARY KEY NOT NULL,
  "employeeId" "uuid" NOT NULL,
  "date"       "date" NOT NULL,
  "status"     "public"."attendanceStatus" NOT NULL,
  "checkIn"    "time",
  "checkOut"   "time",
  "notes"      "text",
  "createdAt"  timestamp with time zone DEFAULT "now"() NOT NULL,
  "updatedAt"  timestamp with time zone DEFAULT "now"() NOT NULL,

  CONSTRAINT "fk_employee"
    FOREIGN KEY ("employeeId")
    REFERENCES "public"."employees" ("id")
    ON DELETE CASCADE,

  CONSTRAINT "unique_employee_date"
    UNIQUE ("employeeId", "date")
);

-- Add updated_at trigger
CREATE TRIGGER "set_updated_at_on_attendanceRecords"
  BEFORE UPDATE ON "public"."attendanceRecords"
  FOR EACH ROW
  EXECUTE FUNCTION "public"."handle_updated_at"();

-- Create index for common queries
CREATE INDEX "idx_attendanceRecords_employeeId"
  ON "public"."attendanceRecords" ("employeeId");

CREATE INDEX "idx_attendanceRecords_date"
  ON "public"."attendanceRecords" ("date");

-- Enable RLS
ALTER TABLE "public"."attendanceRecords" ENABLE ROW LEVEL SECURITY;

-- Admin access policy
CREATE POLICY "admin_full_access"
  ON "public"."attendanceRecords"
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM "public"."profilesRoles"
      WHERE "profileId" = auth.uid()
      AND "roleId" = 1
    )
  );

-- Employee can view their own records
CREATE POLICY "employee_view_own"
  ON "public"."attendanceRecords"
  FOR SELECT
  USING (
    "employeeId" IN (
      SELECT "id" FROM "public"."employees"
      WHERE "profileId" = auth.uid()
    )
  );
```

### Add Column to Existing Table

```sql
-- Add new column
ALTER TABLE "public"."employees"
ADD COLUMN "department" "text";

-- Add default value for existing rows
UPDATE "public"."employees"
SET "department" = 'General'
WHERE "department" IS NULL;

-- Make column not null (after setting defaults)
ALTER TABLE "public"."employees"
ALTER COLUMN "department" SET NOT NULL;
```

### Create Junction Table (Many-to-Many)

```sql
CREATE TABLE IF NOT EXISTS "public"."employeeDepartments" (
  "employeeId"   "uuid" NOT NULL,
  "departmentId" "uuid" NOT NULL,
  "createdAt"    timestamp with time zone DEFAULT "now"() NOT NULL,

  PRIMARY KEY ("employeeId", "departmentId"),

  CONSTRAINT "fk_employee"
    FOREIGN KEY ("employeeId")
    REFERENCES "public"."employees" ("id")
    ON DELETE CASCADE,

  CONSTRAINT "fk_department"
    FOREIGN KEY ("departmentId")
    REFERENCES "public"."departments" ("id")
    ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE "public"."employeeDepartments" ENABLE ROW LEVEL SECURITY;

-- Admin access
CREATE POLICY "admin_full_access"
  ON "public"."employeeDepartments"
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM "public"."profilesRoles"
      WHERE "profileId" = auth.uid()
      AND "roleId" = 1
    )
  );
```

### Add NOT NULL Constraint

```sql
-- First, ensure all existing rows have a value
UPDATE "public"."profiles"
SET "phone" = ''
WHERE "phone" IS NULL;

UPDATE "public"."profiles"
SET "address" = ''
WHERE "address" IS NULL;

-- Then add NOT NULL constraints
ALTER TABLE "public"."profiles"
ALTER COLUMN "phone" SET NOT NULL;

ALTER TABLE "public"."profiles"
ALTER COLUMN "address" SET NOT NULL;
```

### Create Custom Function

```sql
-- Function to calculate employee work hours
CREATE OR REPLACE FUNCTION "public"."calculate_work_hours"(
  p_employee_id "uuid",
  p_start_date "date",
  p_end_date "date"
)
RETURNS TABLE (
  "date" "date",
  "hours" "interval"
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    "ar"."date",
    ("ar"."checkOut" - "ar"."checkIn") AS "hours"
  FROM "public"."attendanceRecords" "ar"
  WHERE "ar"."employeeId" = p_employee_id
    AND "ar"."date" BETWEEN p_start_date AND p_end_date
    AND "ar"."checkIn" IS NOT NULL
    AND "ar"."checkOut" IS NOT NULL
  ORDER BY "ar"."date";
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```
