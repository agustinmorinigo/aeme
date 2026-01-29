---
name: ui-package-conventions
description: It explains how and when to work with the packages/ui package. Use it when you need to develop or work on a basic UI component such as an input, button, file input, select, popover, dialog, modal, etc.
version: 1.0.0
model: sonnet
lastUpdated: 2024-01-31
lastReviewed: 2024-01-31
maintenancePriority: MEDIUM
monitorPaths:
  - packages/ui/src/**
  - packages/ui/package.json
  - packages/ui/tsconfig.json
  - packages/ui/.storybook/**
monitorDependencies:
  - react: "^19"
  - "@radix-ui/*": "^1"
  - lucide-react: "^0.536"
  - class-variance-authority: "^0.7"
  - tailwind-merge: "^3"
  - sonner: "^2"
  - react-day-picker: "^9"
  - storybook: "^8"
relatedSkills:
  - tailwind-config-package-conventions
  - react-component-conventions
  - icons-conventions
  - test-conventions
  - frontend-conventions
---
The `packages/ui` package is a shared library of basic UI components used across multiple applications. When working with this package, it's important to follow certain conventions to ensure consistency, maintainability, and usability of the components. Below are the key conventions to keep in mind:
- Each component should be placed in its own folder within the `packages/ui/src/components` directory.
- The folder name should match the component name (e.g., `Button`, `Input`, `Select`).
- Each component folder should contain the following files:
  - `component-name.tsx`: The main component file.
  - `component-name.test.tsx`: The test file for the component.
  - `component-name.stories.tsx`: The Storybook file for the component.
- Component names should be in PascalCase (e.g., `Button`, `TextInput`).
- When it comes to a complex component, break it down into smaller sub-components if necessary, applying the 'compound pattern' where appropriate. A good example is a `Select` component that includes sub-components like `Select.Option` and `Select.Group`.
- The component should use design tokens from the `packages/tailwind-config` package for colors, typography, spacing, etc.
- To enable to use the component in other packages, ensure it is exported from the `packages/ui/src/components/index.ts` file as `export * from './component-name/component-name';`.
- When you need to import internal components or utilities, use relative paths such as “../../” instead of path aliases or similar, so that everything works properly.
- Build before using: components export from `dist/`
- Run `pnpm run dev` from root to watch all packages
- Storybook available: `cd packages/ui && pnpm dev:storybook`
