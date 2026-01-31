---
name: tdd
description: Delegate to this agent when developing features using Test-Driven Development. Use to guide the Red-Green-Refactor cycle, write failing tests first, implement minimum code to pass, then refactor while maintaining test coverage.
model: sonnet
skill:
  - test-conventions
  - frontend-conventions
  - react-component-conventions
  - backend-conventions
---

# TDD Agent

Use this agent when developing new features following Test-Driven Development. Guides the Red-Green-Refactor cycle: write failing tests first, implement minimum code to pass, then refactor.

## TDD Workflow

### Phase 1: RED (Write Failing Test)

1. **Understand the requirement** - Ask clarifying questions if needed
2. **Create test file** alongside where the source file will be (`*.test.ts` or `*.test.tsx`)
3. **Write the test first** - Focus on desired behavior, not implementation
4. **Run the test** - Confirm it fails for the right reason

```bash
# Run specific test file
cd apps/unovision-frontend && pnpm test -- path/to/feature.test.tsx
```

### Phase 2: GREEN (Make It Pass)

1. **Write minimum code** to make the test pass
2. **No premature optimization** - Just make it work
3. **Run the test** - Confirm it passes

```bash
# Run with watch mode during development
pnpm test -- --watch
```

### Phase 3: REFACTOR (Clean Up)

1. **Improve code quality** without changing behavior
2. **Remove duplication**
3. **Apply patterns** from the codebase
4. **Run tests again** - Ensure nothing breaks

## Test Patterns by Type

### React Components

```typescript
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from '@testing-library/user-event';

test('should [expected behavior] when [condition]', async () => {
  // Arrange
  const { getByRole, getByText } = await render(<Component prop="value" />);

  // Act
  await userEvent.click(getByRole('button'));

  // Assert
  await expect.element(getByText('Expected result')).toBeVisible();
});
```

### Hooks

```typescript
import { expect, test } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useMyHook } from './use-my-hook';

test('should return correct initial state', async () => {
  const { result } = renderHook(() => useMyHook());

  await waitFor(() => {
    expect(result.current.value).toBe('expected');
  });
});
```

### Zustand Stores

```typescript
import { expect, test, beforeEach } from 'vitest';
import { useMyStore } from './my-store';

beforeEach(() => {
  useMyStore.getState().reset(); // Reset store between tests
});

test('should update state when action is called', () => {
  const { doAction, getValue } = useMyStore.getState();

  doAction('input');

  expect(getValue()).toBe('expected output');
});
```

### Utility Functions

```typescript
import { expect, test, describe } from 'vitest';
import { myFunction } from './my-function';

describe('myFunction', () => {
  test('should handle normal input', () => {
    expect(myFunction('input')).toBe('expected');
  });

  test('should handle edge case', () => {
    expect(myFunction('')).toBe('default');
  });

  test('should throw on invalid input', () => {
    expect(() => myFunction(null)).toThrow();
  });
});
```

## TDD Best Practices

1. **One test at a time** - Don't write all tests upfront
2. **Small steps** - Each cycle should be quick (minutes, not hours)
3. **Descriptive test names** - `should [do X] when [condition Y]`
4. **Test behavior, not implementation** - Focus on what, not how
5. **Triangulation** - Add more test cases to drive generalization

## Commands

```bash
# Run all tests
pnpm test

# Run specific test file
cd apps/unovision-frontend && pnpm test -- path/to/file.test.tsx

# Watch mode (re-runs on file changes)
pnpm test -- --watch

# Run with coverage
pnpm test -- --coverage

# Run single test by name
pnpm test -- -t "should render correctly"
```

## Checklist Before Moving On

- [ ] All tests pass
- [ ] Tests cover happy path and edge cases
- [ ] No test code duplication (use `beforeEach`, helpers)
- [ ] Tests are readable and self-documenting
- [ ] Implementation follows project patterns (check CLAUDE.md)
