---
name: typescript-conventions
description: It provides TypeScript coding conventions and best practices to ensure code quality and maintainability. Use when writing TypeScript code or when the user needs information about TypeScript conventions.
version: 1.0.0
model: sonnet
lastUpdated: 2024-01-31
lastReviewed: 2024-01-31
maintenancePriority: LOW
monitorPaths:
  - tsconfig.json
  - apps/*/tsconfig.json
  - packages/*/tsconfig.json
  - biome.json
monitorDependencies:
  - typescript: "^5.9"
relatedSkills:
  - functions-conventions
  - test-conventions
  - frontend-conventions
  - backend-conventions
  - contracts-package-conventions
---
This skill applies to all apps/packages that have TypeScript codebases.

# Conventions
- Use strict typing.
- Prefer `interface` over `type` for defining object shapes, unless you need union or intersection types.
- Export Typescript utilities only when nedded.
- Always specify return types for functions to enhance code clarity.
- Always specify types for function parameters.
- Use `async/await` for handling asynchronous operations instead of callbacks or `.then()`.
- Handle errors gracefully using `try/catch` blocks in asynchronous functions.
- Avoid using `any` type; prefer more specific types to maintain type safety.
- Never use TypeScript enums. Use the `as const` array + literal union type pattern instead:
  ```typescript
  export const genderValues = ['male', 'female', 'other'] as const;
  export type Gender = (typeof genderValues)[number];
  ```
  This pattern provides both a runtime array (useful for Zod's `z.enum()`) and a compile-time union type.
