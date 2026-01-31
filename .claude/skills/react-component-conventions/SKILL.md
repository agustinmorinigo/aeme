---
name: react-component-conventions
description: Guidelines for developing React components in the monorepo (excluding base UI components). Use when creating or refactoring React components in apps.
version: 1.0.0
model: sonnet
lastUpdated: 2024-01-31
lastReviewed: 2024-01-31
maintenancePriority: LOW
monitorPaths:
  - apps/unovision-frontend/src/components/**
  - apps/unovision-frontend/src/modules/**/components/**
  - apps/unovision-frontend/src/modules/**/layout/**
monitorDependencies:
  - react: "^19"
relatedSkills:
  - ui-package-conventions
  - tailwind-config-package-conventions
  - frontend-conventions
  - functions-conventions
  - typescript-conventions
---
# React Component Development Guidelines
This document defines the standards for developing React components in the monorepo applications. For base UI components, refer to the `packages/ui` skill instead.

# Core Principles
## Component Size and Responsibility
Components should be as small as possible while maintaining clarity:
- Single Responsibility Principle: Each component should do one thing well
- Composition over Complexity: Break down large components into smaller, focused ones
- Reusability First: Design components to be reusable across different contexts

## JSX Semantics
JSX must be simple, semantic, and maintainable:
- Use proper HTML semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, etc.)
- Keep JSX readable and self-explanatory
- Use descriptive component and prop names

## Design Tokens Usage
- Critical: Components must use design tokens from the `packages/tailwind-config` package for all styling values:
- Colors: Use token values, never hex/rgb directly
- Spacing: Use spacing scale tokens wherever possible
- Typography: Use font size, weight, and family tokens
- Border Radius: Use radius tokens
- Shadows: Use shadow tokens

## Component Structure Checklist
- Props are clearly defined with TypeScript types
- Component can be tested in isolation
- Components should follow a mobile-first approach in styling


## File Organization
```
components/
├── user-profile/
│   ├── user-profile.tsx          # Main component (orchestrator)
│   ├── user-header.tsx           # Sub-component
│   ├── user-avatar.tsx           # Sub-component
│   ├── user-info.tsx             # Sub-component
│   ├── user-actions.tsx          # Sub-component
│   ├── user-posts.tsx            # Sub-component
```

## Anti-Patterns to Avoid
- Large components (>150 lines of JSX)
- Magic numbers for spacing, colors, sizes
- Inline styles with literal values (classNames with design tokens only)
- Deep prop drilling (use context or state management like Zustand)
- Business logic mixed with presentation
- Non-semantic div soup

## Related Skills
- ui-package-conventions
- tailwind-config-package-conventions

## Additional resources
- For usage examples, see [examples.md](examples.md)
