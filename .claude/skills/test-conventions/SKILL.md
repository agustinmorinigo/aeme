---
name: test-conventions
description: Defines testing standards and practices for the monorepo. Use when writing tests or when the user needs information about testing conventions.
version: 1.0.0
model: sonnet
lastUpdated: 2024-01-31
lastReviewed: 2024-01-31
maintenancePriority: LOW
monitorPaths:
  - apps/unovision-frontend/**/*.test.ts
  - apps/unovision-frontend/**/*.test.tsx
  - packages/ui/**/*.test.ts
  - packages/ui/**/*.test.tsx
  - apps/unovision-frontend/vitest.config.ts
  - packages/ui/vitest.config.ts
monitorDependencies:
  - vitest: "^4"
  - "@testing-library/react": "^16"
  - "@testing-library/user-event": "^14"
  - "@vitest/browser": "^4"
  - playwright: "^1"
relatedSkills:
  - frontend-conventions
  - ui-package-conventions
  - functions-conventions
  - typescript-conventions
---
This skill applies to all apps/packages in the monorepo that require testing.

# Test Structure
- Use a single `describe()` block per test file.
- All test cases must be inside `it()` blocks within the main `describe()`.
- Use "should" prefix for all test descriptions to clearly state expected behavior.
- Group related tests logically but keep them in the same `describe()` block.

# Test Coverage Requirements
Tests must cover the following scenarios:
- Success cases - verify expected behavior under normal conditions.
- Failure cases - verify proper error handling and error messages.
- Common cases - test the most frequently used code paths.
- Rare cases - test infrequent but valid scenarios.
- Edge cases - test boundary conditions and extreme values.
- Invalid input - verify proper validation and rejection of bad data.

# Test Organization
- Name test files with `.test.ts` or `.test.tsx` suffix.
- Place test files next to the code they test.
- Keep test files focused on a single module or component.
- Use clear, descriptive test names that explain what is being tested.

# Best Practices
- Each test should be independent and not rely on other tests.
- Avoid testing implementation details; focus on behavior and outcomes.
- Use meaningful assertions that verify actual requirements.
- Keep tests simple and readable.
- Mock external dependencies to isolate the unit under test.
- Clean up resources after tests complete.
- Prefer unit tests over integration tests when possible.
- Write tests before or alongside feature development.

# Assertions
- Use specific assertions that clearly express intent.
- Avoid multiple unrelated assertions in a single test.
