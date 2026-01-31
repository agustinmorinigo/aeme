---
name: tailwind-config-package-conventions
description: Explains the tailwind-config package structure and usage. Use when working with design tokens, theming, or styling configuration across the monorepo.
version: 1.0.0
model: sonnet
lastUpdated: 2024-01-31
lastReviewed: 2024-01-31
maintenancePriority: MEDIUM
monitorPaths:
  - packages/tailwind-config/**
  - packages/tailwind-config/shared-styles.css
  - packages/tailwind-config/postcss.config.js
  - packages/tailwind-config/package.json
monitorDependencies:
  - tailwindcss: "^4"
  - postcss: "^8"
  - tw-animate-css: "^1"
relatedSkills:
  - ui-package-conventions
  - react-component-conventions
  - frontend-conventions
---
The `packages/tailwind-config` package provides centralized TailwindCSS v4 configuration and design tokens used across all applications and the UI package. This package ensures visual consistency and maintainability by defining all colors, spacing, typography, and theme variables in a single location.

# Package Structure
The package contains three key files:
- `shared-styles.css`: Main stylesheet with TailwindCSS imports, design tokens, and base styles
- `postcss.config.js`: PostCSS configuration for applications that need it
- `package.json`: Exports configuration

# Design Tokens
All design tokens are defined using CSS custom properties in the `shared-styles.css` file:
- Colors: Use OKLCH color space for light and dark mode
- Radius: Multiple radius variants (sm, md, lg, xl)
- Typography: Font family (Inter) and size tokens
- Semantic colors: background, foreground, primary, secondary, muted, accent, destructive, border, input, ring
- Chart colors: 5 chart color variants
- Sidebar colors: Complete sidebar theming system

# Theme System
The package includes a complete light/dark theme system:
- Light mode tokens defined in `:root`
- Dark mode tokens defined in `.dark` class
- Custom dark variant: `@custom-variant dark (&:is(.dark *))`
- Automatic color scheme switching

# Content Scanning
The package defines `@source` directives to scan for TailwindCSS classes:
- `@source "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"`: Scans UI package components
- `@source "../../apps/*/src/**/*.{js,ts,jsx,tsx}"`: Scans all app source files

# Base Styles
Includes common base styles applied globally:
- Custom scrollbar styling for webkit and standard browsers
- Default border and ring colors
- Background and text colors from tokens
- Full height/width setup for html, body, and root
- Label cursor pointer

# Usage in Applications
To use the tailwind-config package in an app or package:

1. Add as devDependency in package.json:
```json
"devDependencies": {
  "@aeme/tailwind-config": "workspace:*"
}
```

2. Import in your main CSS file (e.g., `src/index.css`):
```css
@import "@aeme/tailwind-config";
```

3. For PostCSS configuration, create `postcss.config.js`:
```javascript
import { postcssConfig } from '@aeme/tailwind-config/postcss';
export default postcssConfig;
```

# Modifying Design Tokens
When you need to add or modify design tokens:
- Add new CSS custom properties to the `@theme inline` block
- Define light mode values in `:root`
- Define dark mode values in `.dark` class
- Use OKLCH color space for new colors
- Never use hex or RGB values directly in components

# Important Notes
- Never import TailwindCSS directly in app files; always import from this package
- Do not use arbitrary values or magic numbers in components
- All spacing, colors, and typography should reference design tokens
