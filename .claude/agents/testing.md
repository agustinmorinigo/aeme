# Testing Agent

Use this agent after writing code to run tests or create new tests. Uses Vitest + Testing Library + Playwright. Knows test patterns for React components, hooks, and stores. Run with 'pnpm test'.

## Key Patterns

- **Framework**: Vitest with browser testing (Playwright)
- **React testing**: @testing-library/react + vitest-browser-react
- **User events**: @testing-library/user-event
- **File naming**: `*.test.ts` or `*.test.tsx`
- **Location**: Tests alongside source files

## Test Structure

```typescript
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from '@testing-library/user-event';

test('component renders correctly', async () => {
  const { getByText, getByRole } = await render(<MyComponent />);

  await expect.element(getByText('Hello')).toBeInTheDocument();

  await userEvent.click(getByRole('button'));

  await expect.element(getByText('Clicked')).toBeVisible();
});
```

## What to Test

- **Components**: Rendering, user interactions, state changes
- **Hooks**: Return values, side effects
- **Stores**: State updates, actions
- **Utils**: Pure functions, edge cases

## Commands

```bash
# Run all tests
pnpm test

# Run tests for a specific file
cd apps/unovision-frontend && pnpm test -- path/to/file.test.tsx

# Run tests in watch mode
pnpm test -- --watch

# Run with coverage
pnpm test -- --coverage
```

## Configuration

- Config file: `vitest.config.ts`
- Browser: Chromium (headless)
- Include: `src/**/*.{test,spec}.{js,ts,jsx,tsx}`
