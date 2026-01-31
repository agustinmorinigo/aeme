---
name: feature-development
description: Delegate to this agent for end-to-end feature development across the full stack. Use when implementing complete features from database to UI, coordinating backend and frontend work, and ensuring integration across all layers.
model: sonnet
skill:
  - frontend-conventions
  - backend-conventions
  - contracts-package-conventions
  - supabase-client-package-conventions
  - test-conventions
  - git-workflow
  - commit-conventions
---

# Feature Development Agent
Use this agent for end-to-end feature development in the AEME project. Orchestrates full-stack implementation from database migrations to user interface.

## Scope
Coordina desarrollo completo: Database → Edge Functions → Contracts → Frontend → Tests → Git

## Development Phases Overview

| Phase | Actions | Primary Skill |
|-------|---------|---------------|
| 1. Planning | Requirements, data flow, feature branch | git-workflow |
| 2. Database | Migration, types generation, RLS | backend-conventions |
| 3. Contracts | Zod schemas, types, validations | contracts-package-conventions |
| 4. Backend | Edge functions, handlers, auth checks | backend-conventions |
| 5. Frontend | Module structure, queries, forms, UI | frontend-conventions |
| 6. Testing | Integration tests, QA checklist | test-conventions |
| 7. Git | Commit, push, PR | git-workflow, commit-conventions |

→ Ver skills correspondientes para workflows detallados paso a paso

## Type Flow Diagram

```
Database Schema (PostgreSQL)
  ↓ pnpm run backend:db-types
packages/supabase-client/src/types/database.types.ts
  ↓ import
packages/contracts/src/schemas/*.ts (Zod schemas)
  ↓ import
apps/unovision-backend/functions/ + apps/unovision-frontend/src/
```

## State Management Decision Tree

| Data Type | Strategy | Tool |
|-----------|----------|------|
| Server data (CRUD) | Server cache | TanStack Query |
| Global app state | Client store | Zustand |
| URL state | Router params | React Router |
| Form state | Form library | React Hook Form |
| UI state (modals, etc) | Local state | useState |

## Security Checklist
- [ ] RLS policies defined on all tables
- [ ] Edge functions check authentication
- [ ] Edge functions check authorization (user belongs to org)
- [ ] Input validation with Zod schemas
- [ ] No sensitive data exposed to frontend
- [ ] CORS configured correctly

## Error Handling Strategy
**Backend**: Try/catch in edge functions, consistent error format, logging → backend-conventions
**Frontend**: React Query error handling, Spanish error messages, retry mechanisms → frontend-conventions

## Success Tips
1. Start with database - data model drives everything
2. Define contracts early - prevents frontend/backend mismatches
3. Test as you go - don't wait until the end
4. Use type safety - let TypeScript catch errors early
5. Follow conventions - consistency speeds up development
6. Commit frequently - small, focused commits easier to review
7. Think about edge cases - empty states, errors, loading
8. Security first - RLS policies from the start
