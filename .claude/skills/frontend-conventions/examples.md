# Frontend Development Examples

Complete code examples from the frontend development workflow.

---

## Phase 2: API Integration

### Step 4: Create API Service

```typescript
// src/services/api/[feature-name]/get.ts
import type { GetFeatureParams, GetFeatureResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function get(params: GetFeatureParams) {
  return invokeSupabaseFunction<GetFeatureResponse>('feature-name', {
    method: 'GET',
    params,
  });
}
```

```typescript
// src/services/api/[feature-name]/create.ts
import type { CreateFeatureBody, CreateFeatureResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function create(body: CreateFeatureBody) {
  return invokeSupabaseFunction<CreateFeatureResponse>('feature-name', {
    method: 'POST',
    body,
  });
}
```

```typescript
// src/services/api/[feature-name]/index.ts
export { get } from './get.ts';
export { create } from './create.ts';
```

Add to main API index:
```typescript
// src/services/api/index.ts
import * as featureName from './feature-name';

export default {
  // ... other services
  featureName,
};
```

---

### Step 5: Create React Query Hooks

Query example:
```typescript
// src/modules/[feature-name]/queries/use-get-feature-query.ts
import type { GetFeatureParams } from '@aeme/contracts';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export default function useGetFeatureQuery(params: GetFeatureParams) {
  const query = useQuery({
    queryKey: ['get-feature', params],
    queryFn: () => api.featureName.get(params),
    select: (data) => data.data,
  });
  return query;
}
```

Mutation example:
```typescript
// src/modules/[feature-name]/queries/use-create-feature-mutation.ts
import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

export default function useCreateFeatureMutation() {
  const mutation = useMutation({ mutationFn: api.featureName.create });
  return mutation;
}
```

Query with side effects (updating store):
```typescript
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { useFeatureStore } from '@/modules/[feature-name]/stores/use-feature-store';

export default function useGetFeatureQuery() {
  const { setFeatureData } = useFeatureStore();

  const query = useQuery({
    queryKey: ['get-feature'],
    queryFn: api.featureName.get,
    staleTime: 1000 * 60 * 5, // 5 minutes
    select: (data) => data.data,
  });

  useEffect(() => {
    if (!query.data) return;
    setFeatureData(query.data);
  }, [query.data, setFeatureData]);

  return query;
}
```

---

## Phase 3: State Management

### Step 6: Create Zustand Store (if needed)

Simple store:
```typescript
// src/modules/[feature-name]/stores/use-feature-store.ts
import create from '@/config/store';

interface State {
  selectedItem: Item | null;
  isLoading: boolean;
}

interface Actions {
  setSelectedItem: (item: Item | null) => void;
  setIsLoading: (loading: boolean) => void;
}

const initialState: State = {
  selectedItem: null,
  isLoading: false,
};

export const useFeatureStore = create<State & Actions>((set) => ({
  ...initialState,
  setSelectedItem: (item) => set({ selectedItem: item }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
```

Persisted store with localStorage:
```typescript
import create from '@/config/store';
import { persist } from 'zustand/middleware';

export const useFeatureStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      // actions
    }),
    {
      name: 'feature-store',
      partialize: (state) => ({
        // Only persist specific fields
        selectedItem: state.selectedItem,
      }),
    },
  ),
);
```

Modal/Dialog store pattern:
```typescript
type ModalType = 'create' | 'edit' | 'delete' | 'details';

interface State {
  isOpen: boolean;
  type: ModalType | null;
  item: Item | null;
}

interface Actions {
  open: (options: { type: ModalType; item?: Item }) => void;
  close: () => void;
}

const initialState: State = {
  isOpen: false,
  type: null,
  item: null,
};

export const useFeatureModalStore = create<State & Actions>((set) => ({
  ...initialState,
  open: ({ type, item }) => set({
    isOpen: true,
    type,
    item: item || null,
  }),
  close: () => set(initialState),
}));
```

---

## Phase 4: Forms and Validation

### Step 7: Create Zod Schemas (if needed)

```typescript
// src/modules/[feature-name]/schemas/create-feature-schema.ts
import { createFeatureSchema } from '@aeme/contracts';
import { z } from 'zod';

// Option 1: Use schema directly from contracts
export { createFeatureSchema } from '@aeme/contracts';

// Option 2: Extend/modify the contract schema for frontend-specific needs
export const createFeatureFormSchema = createFeatureSchema.extend({
  confirmPassword: z.string().min(1, 'Confirmación requerida'),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  }
);

export type CreateFeatureFormSchema = z.infer<typeof createFeatureFormSchema>;
```

---

### Step 8: Create Form Components

```typescript
// src/modules/[feature-name]/components/feature-form.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@aeme/ui';
import { toast } from '@aeme/ui/toast';
import { createFeatureFormSchema, type CreateFeatureFormSchema } from '@/modules/[feature-name]/schemas/create-feature-schema';
import useCreateFeatureMutation from '@/modules/[feature-name]/queries/use-create-feature-mutation';

interface FeatureFormProps {
  onSuccess?: () => void;
}

export default function FeatureForm({ onSuccess }: FeatureFormProps) {
  const { mutateAsync, isPending } = useCreateFeatureMutation();
  const queryClient = useQueryClient();

  const methods = useForm<CreateFeatureFormSchema>({
    resolver: zodResolver(createFeatureFormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
    shouldFocusError: false,
  });

  const onSubmit = async (data: CreateFeatureFormSchema) => {
    try {
      await mutateAsync(data);
      toast.success('Item creado correctamente');
      queryClient.invalidateQueries({ queryKey: ['get-items'] });
      methods.reset();
      onSuccess?.();
    } catch (error) {
      toast.error('Error al crear item', {
        description: error instanceof Error ? error.message : undefined,
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Form fields */}
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Guardando...' : 'Guardar'}
        </Button>
      </form>
    </FormProvider>
  );
}
```

Use reusable form components from `src/components/common/`:
```typescript
import { FormField } from '@/components/common/form-field';

<FormField
  id='name'
  label='Nombre'
  required
  register={methods.register('name')}
  error={methods.formState.errors.name?.message}
/>
```

---

## Phase 5: UI Components

### Step 9: Create Feature Components

Container/Presentational pattern:
```typescript
// src/modules/[feature-name]/components/feature-list/container.tsx
import { Loader } from '@aeme/ui/icons';
import useGetFeatureQuery from '@/modules/[feature-name]/queries/use-get-feature-query';
import FeatureList from './index';

export default function FeatureListContainer() {
  const { isPending, isError, data } = useGetFeatureQuery({ limit: 10 });

  if (isPending) return <Loader className='size-10' />;
  if (isError) return <div>Error loading data.</div>;
  if (!data) return <div>No data found.</div>;

  return <FeatureList items={data.items} />;
}

// src/modules/[feature-name]/components/feature-list/index.tsx
import FeatureCard from './feature-card';

export default function FeatureList({ items }: Props) {
  return (
    <div>
      {items.map(item => (
        <FeatureCard key={item.id} item={item} />
      ))}
    </div>
  );
}
```

Data table pattern (using TanStack Table):
```typescript
// src/modules/[feature-name]/components/feature-table/columns.tsx
import type { ColumnDef } from '@tanstack/react-table';
import type { Feature } from '@aeme/contracts';
import FeatureActions from './feature-actions';

export const columns: ColumnDef<Feature>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'createdAt',
    header: 'Fecha creación',
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    id: 'actions',
    cell: ({ row }) => <FeatureActions item={row.original} />,
  },
];
```

---

### Step 10: Create Layout Component

```typescript
import { useState } from 'react';
import { Button, Input } from '@aeme/ui';
import FeatureListContainer from '@/modules/[feature-name]/components/feature-list/container';
import FeatureModal from '@/modules/[feature-name]/components/feature-modal';
import { useFeatureModalStore } from '@/modules/[feature-name]/stores/use-feature-modal-store';

export default function FeatureLayout() {
  const [search, setSearch] = useState('');
  const modalStore = useFeatureModalStore();

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Feature Title</h1>
        <Button onClick={() => modalStore.open({ type: 'create' })}>
          Create New
        </Button>
      </div>

      <Input
        placeholder='Buscar...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <FeatureListContainer search={search} />

      <FeatureModal />
    </div>
  );
}
```

---

## Phase 6: Routing and Navigation

### Step 11: Create Page Component

```typescript
// src/pages/feature-page.tsx
import FeatureLayout from '@/modules/feature-name/layout';

export default function FeaturePage() {
  return <FeatureLayout />;
}
```

---

### Step 12: Configure Routes

```typescript
// src/routes/private/feature.tsx
import { lazy, Suspense } from 'react';
import { Navigate, type RouteObject } from 'react-router';
import { RoleName } from '@aeme/supabase-client/entities';
import RoleGuard from '@/guards/role-guard';

const FeaturePage = lazy(() => import('@/pages/feature-page'));

const allowedRoles = [RoleName.Admin, RoleName.Accountant];

const featureRoutesConfig: RouteObject = {
  path: 'feature',
  element: <RoleGuard allowedRoles={allowedRoles} />,
  children: [
    { index: true, element: <Navigate to='list' replace /> },
    {
      path: 'list',
      element: (
        <Suspense fallback={<div>Cargando...</div>}>
          <FeaturePage />
        </Suspense>
      ),
    },
    { path: '*', element: <Navigate to='/feature/list' replace /> },
  ],
};

export default featureRoutesConfig;
```

Add to main private routes:
```typescript
// src/routes/private/index.tsx
import featureRoutesConfig from './feature';

const privateRoutes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      // ... other routes
      featureRoutesConfig,
    ],
  },
];
```

---

### Step 13: Add to Sidebar

```typescript
{
  label: 'Feature Section',
  allowedRoles: [RoleName.Admin, RoleName.Accountant],
  items: [
    {
      label: 'Feature List',
      path: '/feature/list',
      icon: FileText, // Import from lucide-react
    },
  ],
}
```

---

## Phase 7: Utilities and Constants

### Step 14: Add Constants (if needed)

```typescript
// src/modules/[feature-name]/constants/status-options.ts
export const STATUS_OPTIONS = [
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
] as const;
```

---

### Step 15: Add Utility Functions (if needed)

```typescript
// src/modules/[feature-name]/utils/format-feature.ts
import type { Feature } from '@aeme/contracts';

export function formatFeatureName(feature: Feature): string {
  return `${feature.name} - ${feature.code}`;
}
```

---

## Phase 8: Testing and Refinement

### Step 17: Add Tests (optional but recommended)

```typescript
// src/modules/[feature-name]/components/feature-form.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FeatureForm from './feature-form';

describe('FeatureForm', () => {
  it('renders form fields', () => {
    render(<FeatureForm />);
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
  });

  it('shows validation errors', async () => {
    // Test validation
  });
});
```

---

## Common Patterns

### Pagination

```typescript
import { usePagination } from '@/hooks/use-pagination';

const paginationState = usePagination({ initialPageSize: 50 });

const { data } = useGetItemsQuery({
  offset: paginationState.offset,
  limit: paginationState.limit,
});

// Use paginationState.goToNextPage(), goToPreviousPage(), etc.
```

---

### Search/Filter

```typescript
const [search, setSearch] = useState('');

const { data } = useGetItemsQuery({
  ...(search && search.trim().length > 0 ? { search } : {}),
});
```

---

### Modal Management

```typescript
const { isOpen, type, item, open, close } = useFeatureModalStore();

// Open modal
open({ type: 'create' });
open({ type: 'edit', item: selectedItem });

// In modal component
if (!isOpen) return null;
```

---

### Loading States

```typescript
const { isPending, isError, data } = useQuery(/* ... */);

if (isPending) return <Loader />;
if (isError) return <ErrorMessage />;
if (!data) return <EmptyState />;

return <DataDisplay data={data} />;
```

---

### Error Handling with mutateAsync

```typescript
const { mutateAsync, isPending } = useCreateItemMutation();
const queryClient = useQueryClient();
const { close } = useFeatureModalStore();

const handleSubmit = async (data) => {
  try {
    await mutateAsync(data);
    toast.success('Operación exitosa');
    queryClient.invalidateQueries({ queryKey: ['get-items'] });
    close();
  } catch (error) {
    toast.error('Error al realizar la operación', {
      description: error instanceof Error ? error.message : undefined,
    });
  }
};
```

---

## Integration with Backend - When Backend is NOT Ready

```typescript
// Temporary mock
export default function useGetFeatureQuery() {
  return useQuery({
    queryKey: ['get-feature'],
    queryFn: async () => ({
      data: { items: mockItems },
    }),
  });
}

// Later: replace queryFn with actual API call
queryFn: () => api.featureName.get(params),
```
