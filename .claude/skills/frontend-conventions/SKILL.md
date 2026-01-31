---
name: frontend-conventions
description: Complete frontend development workflow and conventions. Use when developing new features, creating modules, implementing forms, integrating with backend APIs, or understanding the frontend architecture and patterns.
version: 1.0.0
model: sonnet
lastUpdated: 2024-01-31
lastReviewed: 2024-01-31
maintenancePriority: HIGH
monitorPaths:
  - apps/unovision-frontend/src/**
  - apps/unovision-frontend/package.json
  - apps/unovision-frontend/vite.config.ts
  - apps/unovision-frontend/tsconfig.json
monitorDependencies:
  - react: "^19"
  - vite: "^7"
  - tailwindcss: "^4"
  - zustand: "^5"
  - "@tanstack/react-query": "^5"
  - "@tanstack/react-table": "^8"
  - react-hook-form: "^7"
  - react-router: "^7"
  - zod: "^4"
  - date-fns: "^4"
relatedSkills:
  - backend-conventions
  - contracts-package-conventions
  - supabase-client-package-conventions
  - ui-package-conventions
  - tailwind-config-package-conventions
  - react-component-conventions
  - functions-conventions
  - typescript-conventions
  - icons-conventions
  - test-conventions
  - iso-8601-conventions
---
The frontend application (apps/unovision-frontend) is a React application built with Vite, following a feature-based modular architecture. This skill describes the complete workflow for developing new features, from planning to implementation.

# Architecture Overview

## Technology Stack
- React 19 with TypeScript
- Vite 7 for build tooling
- TailwindCSS v4 for styling
- Zustand 5 for state management
- TanStack React Query 5 for server state
- React Hook Form 7 + Zod 4 for forms
- React Router 7 for routing
- @aeme/ui package for UI components (Radix UI + shadcn/ui)
- TanStack React Table 8 for data tables

## Directory Structure
```
src/
├── client/              # Supabase client configuration
├── components/          # Shared components across features
├── config/              # App configuration (date-fns, store)
├── guards/              # Route protection components
├── hooks/               # Global custom hooks
├── modules/             # Feature modules (domain-based)
├── pages/               # Page components (thin route wrappers)
├── routes/              # Routing configuration
├── services/            # API services layer
├── shared/              # Shared utilities across modules
├── styles/              # Global CSS
└── utils/               # Generic utility functions
```

# Module Organization

Each feature module follows this structure:
```
modules/[feature-name]/
├── components/          # UI components specific to this feature
├── constants/           # Feature-specific constants
├── hooks/              # Feature-specific custom hooks (optional)
├── layout/             # Main layout component for the feature
│   └── index.tsx
├── queries/            # React Query hooks (useQuery/useMutation)
├── schemas/            # Zod validation schemas
├── stores/             # Zustand stores
├── types/              # TypeScript types/interfaces (optional)
└── utils/              # Feature-specific utility functions
```

# Complete Development Workflow

## Phase 1: Planning and Setup

### Step 1: Analyze Requirements
Before starting development, determine:
- Does this feature need backend support? (new edge functions, database changes)
- What data needs to be displayed/manipulated?
- What user roles can access this feature?
- Does it require new UI components or can you reuse existing ones?
- What state management is needed? (local, Zustand, React Query)

### Step 2: Backend Development (if needed)
If the feature requires backend support:
1. Create or modify database tables/migrations
2. Regenerate database types: `pnpm run backend:db-types`
3. Add entity interfaces to @aeme/supabase-client if needed
4. Create API contracts in @aeme/contracts:
   - Request/Response types in `packages/contracts/src/functions/[domain]/`
   - Zod schemas in `packages/contracts/src/schemas/[domain]/`
5. Implement edge function in `apps/unovision-backend/supabase/functions/`
6. Test the edge function locally

Refer to supabase-client-package-conventions, contracts-package-conventions and backend-conventions skills for details.

### Step 3: Create Module Structure
Create the module directory and initial files:
```
src/modules/[feature-name]/
├── layout/
│   └── index.tsx        # Main layout component
└── queries/             # Create this directory early
```

## Phase 2: API Integration

### Step 4: Create API Service
Create service functions in `src/services/api/[feature-name]/` for each endpoint (GET, POST, PUT, DELETE). Import types from @aeme/contracts and use `invokeSupabaseFunction` from `@/client`. Export all functions from an index file and add to main API index.
See complete examples in [examples.md - Phase 2, Step 4](examples.md#step-4-create-api-service).

### Step 5: Create React Query Hooks
Create query hooks in `src/modules/[feature-name]/queries/` using `useQuery` for fetching data and `useMutation` for mutations. Include queryKey with params for caching, use `select` to transform response data. Can include side effects with useEffect to update stores.
See complete examples in [examples.md - Phase 2, Step 5](examples.md#step-5-create-react-query-hooks).

## Phase 3: State Management

### Step 6: Create Zustand Store (if needed)
Create stores in `src/modules/[feature-name]/stores/` for client state that needs to be shared across components. Use simple stores for basic state, persisted stores with localStorage using `persist` middleware and `partialize`, or modal stores for managing modal/dialog state. Always separate State and Actions interfaces and use initialState constant.
See complete examples in [examples.md - Phase 3, Step 6](examples.md#step-6-create-zustand-store-if-needed).

## Phase 4: Forms and Validation

### Step 7: Create Zod Schemas (if needed)
If the feature requires forms, create validation schemas in `src/modules/[feature-name]/schemas/`. Can re-export schemas directly from @aeme/contracts or extend contract schemas for frontend-specific validation (e.g., password confirmation, UI-only fields). Use `z.infer` to generate TypeScript types from schemas.
See complete examples in [examples.md - Phase 4, Step 7](examples.md#step-7-create-zod-schemas-if-needed).

### Step 8: Create Form Components
Create form components in `src/modules/[feature-name]/components/` using `useForm` from react-hook-form with `zodResolver`. Wrap form in `FormProvider`, set `shouldFocusError: false`, use mutation hooks for submission.

**Important:** Use `mutateAsync` (not `mutate`) within a try-catch block for error handling. In the try block: execute mutation, show success toast, invalidate queries, reset form. In the catch block: show error toast with message. Use reusable `FormField` component from `@/components/common/form-field` for consistent field rendering.

See complete examples in [examples.md - Phase 4, Step 8](examples.md#step-8-create-form-components).

## Phase 5: UI Components

### Step 9: Create Feature Components
Create UI components in `src/modules/[feature-name]/components/` using Container/Presentational pattern (container handles data fetching and loading states, presentational receives data as props) or Data Table pattern (using TanStack React Table with `ColumnDef<T>[]`, `accessorKey` for simple fields, and `cell` renderer for custom formatting).
See complete examples in [examples.md - Phase 5, Step 9](examples.md#step-9-create-feature-components).

### Step 10: Create Layout Component
Create the main layout in `src/modules/[feature-name]/layout/index.tsx` with page title, primary actions (e.g., "Create New" button), search/filter inputs, main content area, and modals/dialogs. Use local state for UI concerns (search, filters) and stores for modal state.
See complete example in [examples.md - Phase 5, Step 10](examples.md#step-10-create-layout-component).

## Phase 6: Routing and Navigation

### Step 11: Create Page Component
Create a thin page wrapper in `src/pages/` that only imports and renders the layout component. Keep pages thin.
See complete example in [examples.md - Phase 6, Step 11](examples.md#step-11-create-page-component).

### Step 12: Configure Routes
Add route configuration in `src/routes/private/` using lazy loading with `React.lazy()`, wrap lazy components in `Suspense` with fallback, use `RoleGuard` for role-based access control, define `allowedRoles` array from `RoleName` enum, set up nested routes with index and wildcard redirects, and use `Navigate` component for redirects. Add the new route config to main private routes in `src/routes/private/index.tsx`.
See complete examples in [examples.md - Phase 6, Step 12](examples.md#step-12-configure-routes).

### Step 13: Add to Sidebar if needed
Update sidebar configuration in `src/modules/app/config/sidebar-groups.ts` with `label`, `allowedRoles` array, `path`, and `icon` from lucide-react.
See complete example in [examples.md - Phase 6, Step 13](examples.md#step-13-add-to-sidebar).

## Phase 7: Utilities and Constants

### Step 14: Add Constants (if needed)
Create constants in `src/modules/[feature-name]/constants/` using `as const` for constant arrays to get literal types (status options, filter options, configuration values).
See complete example in [examples.md - Phase 7, Step 14](examples.md#step-14-add-constants-if-needed).

### Step 15: Add Utility Functions (if needed)
Create utilities in `src/modules/[feature-name]/utils/` for feature-specific utilities. For shared utilities across features, use `src/shared/[domain]/utils/`. Follow functions-conventions skill for utility function best practices.
See complete example in [examples.md - Phase 7, Step 15](examples.md#step-15-add-utility-functions-if-needed).

## Phase 8: Testing and Refinement

### Step 16: Test the Feature
1. Test all user flows manually
2. Test form validation (valid and invalid inputs)
3. Test error states (network errors, validation errors)
4. Test loading states
5. Test with different user roles
6. Test edge cases (empty states, pagination, search)

### Step 17: Add Tests (optional but recommended)
Create tests in `src/modules/[feature-name]/tests/` or co-located with components using Vitest and React Testing Library. Test rendering, user interactions, and validation logic.
See complete example in [examples.md - Phase 8, Step 17](examples.md#step-17-add-tests-optional-but-recommended).

# Naming Conventions

## Files and Folders
- Use kebab-case for all files and folders: `feature-name`, `use-feature-query.ts`

## Components
- PascalCase: `FeatureCard`, `FeatureList`, `FeatureForm`
- Use descriptive names that indicate purpose

## Hooks
- Prefix with `use`: `useFeatureQuery`, `useFeatureStore`, `usePagination`
- Query hooks: `use-get-[resource]-query.ts`
- Mutation hooks: `use-[action]-[resource]-mutation.ts`

## Stores
- Pattern: `use-[feature]-store.ts`
- Export as: `useFeatureStore`

## Types
- Use descriptive names from contracts
- Local types in PascalCase: `FeatureListProps`, `FeatureCardProps`

# Common Patterns

## Pagination
Use the `usePagination` hook from `@/hooks/use-pagination` with `initialPageSize` option. Pass `offset` and `limit` to query hooks. Use pagination state methods: `goToNextPage()`, `goToPreviousPage()`, etc.
See example in [examples.md - Common Patterns: Pagination](examples.md#pagination).

## Search/Filter
Use local state for search input. Conditionally include search param in query only when search has value and is not empty string.
See example in [examples.md - Common Patterns: Search/Filter](examples.md#searchfilter).

## Modal Management
Use a dedicated modal store with `isOpen`, `type`, `item`, `open()`, and `close()` methods. Open modal with type and optional item. Render different content based on modal type. Return null if not open.
See example in [examples.md - Common Patterns: Modal Management](examples.md#modal-management).

## Loading States
Always handle three states: isPending (show loader), isError (show error message), !data (show empty state).
See example in [examples.md - Common Patterns: Loading States](examples.md#loading-states).

## Error Handling
In mutation callbacks: `onSuccess` (show success toast, invalidate queries, close modal/reset form), `onError` (log error, show error toast with message).
See example in [examples.md - Common Patterns: Error Handling](examples.md#error-handling).

# Integration with Backend

## When Backend is Ready
1. API service is already created (Step 4)
2. React Query hooks are ready (Step 5)
3. Just use the hooks in components

## When Backend is NOT Ready
Create mock data or use local state temporarily. Use the same hook interface so switching is seamless. Replace `queryFn` with actual API call when backend is ready.
See example in [examples.md - Integration with Backend - When Backend is NOT Ready](examples.md#integration-with-backend---when-backend-is-not-ready).

# Key Best Practices

## Code Organization
- Keep related files together in the same module
- One component per file
- Co-locate tests with components or in tests folder
- When working in apps/unovision-frontend, **Use path aliases (`@/`) for all imports**, except for files in the same directory (use `./` for same-directory imports)

## State Management
- Use React Query for server state
- Use Zustand for client state that needs to be shared
- Use local state (useState) for component-only state
- Persist only necessary state to localStorage

## Performance
- Use lazy loading for routes
- Implement pagination for large lists
- Use React Query's staleTime for caching
- Avoid using useMemo/useCallback React.memo, etc. Project uses React 19, which comes with React Compiler optimizations.

## Type Safety
- Always import types from @aeme/contracts
- Use Zod for runtime validation

## Error Handling
- Show user-friendly error messages in Spanish
- Handle loading and error states in all queries
- Provide fallback UI for errors
- Log errors for debugging
- Handle edge cases (empty states, no data)
- **Use `mutateAsync` with try-catch** for mutations (never use `mutate` with callbacks)

# Important Notes
- Always use components from @aeme/ui package when available
- Follow TailwindCSS conventions from tailwind-config-package-conventions skill
- Use date-fns for date manipulation with Spanish locale (es)
- Forms should always validate with Zod schemas
- API calls should be typed with contracts from @aeme/contracts
- Never store sensitive data in localStorage
- Use Suspense with lazy loading for better UX
- Invalidate React Query cache after mutations

## Related Skills
- functions-conventions
- icons-conventions
- react-component-conventions
- tailwind-config-package-conventions
- test-conventions
- typescript-conventions
- ui-package-conventions

## Additional resources
- For usage examples, see [examples.md](examples.md)