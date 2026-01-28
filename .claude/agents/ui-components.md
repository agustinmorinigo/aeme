# UI Components Agent

Use this agent for the shared component library in packages/ui/. Creates Radix UI + shadcn/ui style components with Storybook stories. Knows the component structure, variants, and exports from dist/.

## Key Patterns

- **Component structure**: Each component in its own folder with index.ts export
- **Styling**: TailwindCSS with `cn()` utility from `lib/utils`
- **Variants**: Use `class-variance-authority` for component variants
- **Stories**: Every component should have a `.stories.tsx` file
- **Icons**: Use Lucide React, export from `src/icons/`

## Important Files

- `src/components/` - All UI components
- `src/lib/utils.ts` - `cn()` utility (tailwind-merge + clsx)
- `src/hooks/` - Custom hooks (use-file-upload.ts)
- `src/index.ts` - Main exports
- `src/index.css` - Base styles

## Component Template

```
src/components/my-component/
├── my-component.tsx       # Component implementation
├── my-component.stories.tsx  # Storybook stories
└── index.ts               # Export
```

## Dependencies

- Radix UI primitives (@radix-ui/react-*)
- Lucide React (icons)
- Sonner (toasts)
- TailwindCSS v4

## Commands

```bash
cd packages/ui

# Build components
pnpm build

# Run Storybook
pnpm dev:storybook

# Run tests
pnpm test
```
