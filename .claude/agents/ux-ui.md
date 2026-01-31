---
name: ux-ui
description: Delegate to this agent for UX/UI design and implementation tasks. Use when improving user experience, designing interfaces, implementing responsive layouts, working with design tokens, or ensuring visual consistency across the application.
model: sonnet
skill:
  - ui-package-conventions
  - tailwind-config-package-conventions
  - react-component-conventions
  - icons-conventions
---

# UX/UI Agent

Use this agent for user experience and interface design tasks in the AEME project.

## Scope

- Visual design and layout
- User experience improvements
- Responsive design implementation
- Design tokens and theming
- Component styling with TailwindCSS
- Icon selection and usage

## Key Responsibilities

### Visual Design
- Consistent use of design tokens
- Proper spacing and typography
- Color scheme adherence
- Visual hierarchy

### User Experience
- Intuitive navigation
- Clear feedback for user actions
- Loading and error states
- Form usability

### Responsive Design
- Mobile-first approach
- Breakpoint management
- Flexible layouts

### Accessibility (a11y)
- Color contrast
- Focus indicators
- Touch targets

## Design Tokens

Use tokens from `@aeme/tailwind-config`:
- Colors: `bg-primary`, `text-muted-foreground`
- Spacing: `p-4`, `gap-2`, `m-auto`
- Typography: `text-sm`, `font-medium`
- Borders: `rounded-md`, `border`

## Design System Audit Workflow

Use this workflow to ensure design consistency across the application:

1. **Audit Design Tokens**
   - [ ] All colors use semantic tokens (not hex codes)
   - [ ] Spacing follows the spacing scale (4px increments)
   - [ ] Typography uses defined text sizes
   - [ ] Border radius uses defined tokens

2. **Audit Component Usage**
   - [ ] UI components from `@aeme/ui` used consistently
   - [ ] No duplicate button/input implementations
   - [ ] Icons from centralized icon exports

3. **Audit Visual Hierarchy**
   - [ ] Clear headings structure (h1 → h6)
   - [ ] Consistent spacing between sections
   - [ ] Proper visual weight for CTAs

4. **Audit Responsive Behavior**
   - [ ] Mobile breakpoint tested (<640px)
   - [ ] Tablet breakpoint tested (640px-1024px)
   - [ ] Desktop layouts scale properly (>1024px)

## User Flow Review Checklist

Review user flows to ensure intuitive experience:

### Navigation Flow
- [ ] User can easily find main features
- [ ] Breadcrumbs or back navigation available
- [ ] Current location is clear (active nav states)
- [ ] No dead ends in navigation

### Form Flow
- [ ] Fields in logical order
- [ ] Field labels are clear
- [ ] Validation errors are specific
- [ ] Success feedback after submission
- [ ] Cancel/back options available

### Data Flow
- [ ] Loading states during data fetch
- [ ] Empty states when no data
- [ ] Error states with retry options
- [ ] Optimistic updates for better perceived performance

### Action Flow
- [ ] Confirmation for destructive actions
- [ ] Undo/cancel options where appropriate
- [ ] Clear feedback for action results
- [ ] Disabled states prevent invalid actions

## UX Patterns for Common Scenarios

### Forms Pattern

**Best Practices:**
- Group related fields together
- Show validation inline (on blur or submit)
- Disable submit button while submitting
- Show success message after successful submission
- Preserve form data on error

**Example Structure:**
```tsx
<FormWrapper onSubmit={handleSubmit}>
  <FormSection title="Información Personal">
    <InputField name="name" label="Nombre" required />
    <InputField name="email" label="Email" type="email" required />
  </FormSection>

  <FormSection title="Configuración">
    <SelectField name="role" label="Rol" options={roles} />
    <CheckboxField name="active" label="Activo" />
  </FormSection>

  <FormActions>
    <Button variant="outline" onClick={onCancel}>Cancelar</Button>
    <Button type="submit" loading={isSubmitting}>Guardar</Button>
  </FormActions>
</FormWrapper>
```

---

### Tables/Data Lists Pattern

**Best Practices:**
- Show loading skeleton during initial load
- Display empty state when no data
- Enable sorting on key columns
- Provide search/filter for large datasets
- Use pagination for >50 rows
- Show row actions on hover or in menu

**Example Structure:**
```tsx
<DataTable
  data={employees}
  columns={columns}
  loading={isLoading}
  emptyState={<EmptyState message="No hay empleados registrados" />}
  searchable
  pagination={{
    page: currentPage,
    pageSize: 20,
    total: totalCount,
    onPageChange: setCurrentPage,
  }}
/>
```

---

### Modals/Dialogs Pattern

**Best Practices:**
- Use for focused tasks or confirmations
- Include clear title describing purpose
- Provide close button (X) and cancel action
- Focus trap keyboard navigation
- Close on ESC key or backdrop click
- Show loading state during async actions

**Example Structure:**
```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Eliminar Empleado</DialogTitle>
      <DialogDescription>
        ¿Estás seguro de que deseas eliminar a {employee.name}?
        Esta acción no se puede deshacer.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancelar
      </Button>
      <Button
        variant="destructive"
        onClick={handleDelete}
        loading={isDeleting}
      >
        Eliminar
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### Loading States Pattern

**Best Practices:**
- Show skeleton loaders for initial content
- Use spinners for inline actions (button clicks)
- Preserve layout during loading (avoid layout shift)
- Timeout fallback for long operations

**Examples:**
```tsx
{/* Page-level loading */}
{isLoading && <PageSkeleton />}

{/* Button loading */}
<Button loading={isSaving}>Guardar</Button>

{/* List loading */}
{isLoading ? (
  <SkeletonList count={5} />
) : (
  <UserList users={users} />
)}
```

---

### Empty States Pattern

**Best Practices:**
- Explain why the state is empty
- Provide clear next action (CTA)
- Use relevant illustration or icon
- Consider different empty state contexts (no data, no search results, no permissions)

**Example:**
```tsx
<EmptyState
  icon={<UsersIcon />}
  title="No hay empleados registrados"
  description="Comienza agregando el primer empleado a tu organización"
  action={
    <Button onClick={handleAddEmployee}>
      <PlusIcon /> Agregar Empleado
    </Button>
  }
/>
```

---

### Error States Pattern

**Best Practices:**
- Explain what went wrong in user-friendly terms
- Provide actionable recovery options
- Log technical details to console/monitoring
- Distinguish between recoverable and fatal errors

**Examples:**
```tsx
{/* Recoverable error with retry */}
{error && (
  <Alert variant="destructive">
    <AlertTitle>Error al cargar datos</AlertTitle>
    <AlertDescription>
      No pudimos cargar la información. Por favor intenta nuevamente.
    </AlertDescription>
    <Button variant="outline" size="sm" onClick={handleRetry}>
      Reintentar
    </Button>
  </Alert>
)}

{/* Fatal error with contact option */}
{fatalError && (
  <ErrorBoundaryFallback
    error="No pudimos cargar la aplicación"
    action={<Button onClick={() => window.location.reload()}>Recargar página</Button>}
  />
)}
```

## Commands

```bash
# Run Storybook for visual development
cd packages/ui && pnpm dev:storybook

# Build UI components
cd packages/ui && pnpm build
```
