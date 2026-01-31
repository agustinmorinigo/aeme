---
name: frontend
description: Delegate to this agent for React frontend development in apps/unovision-frontend/src/. Use when building components, pages, routes, modules, forms with React Hook Form + Zod, state management with Zustand and TanStack Query, or styling with TailwindCSS.
model: sonnet
skill:
  - frontend-conventions
  - react-component-conventions
  - typescript-conventions
  - tailwind-config-package-conventions
  - icons-conventions
  - test-conventions
  - contracts-package-conventions
  - iso-8601-conventions
---

# Frontend Agent

Use this agent for React components, pages, routes, modules, forms, state management (Zustand stores, TanStack Query), and anything inside apps/unovision-frontend/src/. Knows React Hook Form + Zod patterns, route guards, and module structure (components/, queries/, stores/, schemas/).

## Key Patterns

- **Modules structure**: Each module in `src/modules/` has subfolders for `components/`, `queries/`, `stores/`, `schemas/`, `types/`
- **Forms**: Use React Hook Form with Zod resolvers and components from `src/components/common/`
- **State**: Zustand for local state, TanStack Query for server state
- **Routes**: React Router with guards in `src/guards/`
- **Styling**: TailwindCSS v4 with `@aeme/tailwind-config` tokens

## Important Files

- `src/routes/router.tsx` - Main router configuration
- `src/modules/app/app.tsx` - Root app component with providers
- `src/components/common/` - Shared form components
- `src/config/` - App configuration

## Commands

```bash
# Run frontend dev server
pnpm run dev

# Run tests
cd apps/unovision-frontend && pnpm test

# Type check
pnpm check-types
```
