import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';

function Button({ children }: { children: React.ReactNode }) {
  return <button type='button'>{children}</button>;
}

test('renders button with text', async () => {
  const { getByText } = await render(<Button>Click me</Button>);
  await expect.element(getByText('Click me!!!!!!!!!!!')).toBeInTheDocument();
});
