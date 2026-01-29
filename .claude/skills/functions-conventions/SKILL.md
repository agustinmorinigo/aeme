---
name: functions-conventions
description: Defines conventions for writing functions across the monorepo. Use when creating or refactoring functions to ensure code quality and maintainability.
version: 1.0.0
model: sonnet
lastUpdated: 2024-01-31
lastReviewed: 2024-01-31
maintenancePriority: LOW
monitorPaths:
  - apps/unovision-frontend/src/utils/**
  - apps/unovision-frontend/src/shared/**
  - apps/unovision-frontend/src/modules/**/utils/**
  - apps/unovision-backend/supabase/functions/_shared/utils/**
  - packages/ui/src/lib/**
  - packages/contracts/src/utils/**
monitorDependencies: []
relatedSkills:
  - typescript-conventions
  - test-conventions
  - react-component-conventions
  - frontend-conventions
  - backend-conventions
---
This skill defines conventions for writing functions across all TypeScript code in the monorepo. Following these conventions ensures consistency, testability, and maintainability.

# Core Principles

## Single Responsibility
Each function should do one thing and do it well:
- A function should have a single, clear purpose
- If a function does multiple things, split it into smaller functions
- Function names should clearly describe what the function does

## Pure Functions
Prefer pure functions whenever possible:
- A pure function always returns the same output for the same input
- Pure functions have no side effects (no mutations, no API calls, no logging)
- Pure functions are easier to test, reason about, and debug
- When side effects are necessary, isolate them in dedicated functions

## Early Return Pattern
Use early returns to reduce nesting and improve readability:
- Check for error conditions first and return early
- Check for edge cases and return early
- Avoid deep nesting with if/else chains
- The main logic should be at the lowest indentation level

## Simplicity
Keep functions simple and focused:
- Aim for functions under 20 lines when possible
- If a function is getting long, look for opportunities to extract smaller functions
- Avoid complex logic and nested conditions
- Use descriptive variable names to make code self-documenting

# Function Parameters

## Parameter Count
- Limit parameters to 2 maximum.
- If you need more than 2 parameters, use an options object
- Use destructuring for options objects

## Parameter Naming
- Use descriptive names that indicate the parameter's purpose
- Use camelCase for parameter names
- Avoid single-letter names except for common cases (i, j for loops, x, y for coordinates)

# Return Types
- Return types improve code clarity and catch errors early
- Prefer returning objects over tuples for multiple values

# Documentation

## JSDoc Comments
Document functions in these cases:
- All functions in utils folders or similar utility modules
- Complex functions with non-obvious logic
- Public API functions
- Functions with complex parameters or return types

JSDoc should include:
- Brief description of what the function does
- Description of each parameter (using @param)
- Description of return value (using @returns)
- Any exceptions or edge cases (using @throws or notes)
- Examples of usage (using @example)
- Examples should demonstrate common, edge case, and error scenarios

# Testing

- All functions in utils folders or similar utility modules MUST have unit tests

# Naming Conventions

## Function Names
- Use camelCase for function names
- Use verb + noun pattern for function names (e.g., getUserById, createOrder, validateEmail)
- Boolean-returning functions should start with is, has, can, should or similar (e.g., isValid, hasPermission)
- Event handlers should start with handle or similar (e.g., handleClick, handleSubmit)

## Async Functions
- Async functions should have names that indicate they perform asynchronous operations
- Always use async/await syntax instead of raw promises

# Error Handling

- Use try/catch blocks in async functions
- Throw meaningful errors with descriptive messages
- Handle errors at the appropriate level (don't catch and ignore)

# Anti-Patterns to Avoid
- Functions that modify their parameters (prefer immutability)
- Functions with side effects mixed with return values
- Deeply nested functions
- Functions with unclear or misleading names
- Functions that do too many things
- Magic numbers or strings (use named constants)
- Ignoring or swallowing errors
- Using var instead of const/let
- Mutating global state

# Related Skills
- typescript-conventions
- test-conventions
- react-component-conventions

## Additional resources
- For usage examples, see [examples.md](examples.md)
