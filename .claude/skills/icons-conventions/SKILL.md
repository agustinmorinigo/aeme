---
name: icons-conventions
description: It contains conventions for creating and using icons in any project. Use it when you need to use or create icons.
version: 1.0.0
model: sonnet
lastUpdated: 2024-01-31
lastReviewed: 2024-01-31
maintenancePriority: LOW
monitorPaths:
  - packages/ui/src/icons/**
  - packages/ui/src/icons/lucide-icons/index.ts
monitorDependencies:
  - lucide-react: "^0.536"
relatedSkills:
  - ui-package-conventions
  - frontend-conventions
---
We use Lucide Icons as our primary icon library for our projects. Lucide Icons is an open-source icon library that provides a wide range of customizable and accessible icons suitable for web and mobile applications.
Icon docs: https://lucide.dev/icons/

These icons are centralized in the `packages/ui` package, which allows for easy management and updates across all projects.
All avaiable icons can be found in the `packages/ui/src/icons/lucide-icons/index.ts` file.

If you need to add a new icon, do this:
- Check if the icon you need is already available. You can do this by checking the `packages/ui/src/icons/lucide-icons/index.ts` file.
  - If the icon is available, simply import it (like `import { Loader2 } from '@aeme/ui/icons';`) from there and use it like `<Loader2 />`.
  - Otherwise, you can add the new icon to the `packages/ui/src/icons/lucide-icons/index.ts` file by following the existing pattern.
