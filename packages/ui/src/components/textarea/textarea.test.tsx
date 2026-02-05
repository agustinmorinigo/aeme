import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Textarea } from './textarea.js';

test('renders textarea', async () => {
  const { getByPlaceholder } = await render(<Textarea placeholder='Enter text' />);
  await expect.element(getByPlaceholder('Enter text')).toBeInTheDocument();
});

test('applies isError styling', async () => {
  const { getByPlaceholder } = await render(<Textarea placeholder='Test' isError />);
  const textarea = getByPlaceholder('Test');
  await expect.element(textarea).toHaveClass('border-destructive');
});

test('applies custom className', async () => {
  const { getByPlaceholder } = await render(<Textarea placeholder='Test' className='custom-class' />);
  const textarea = getByPlaceholder('Test');
  await expect.element(textarea).toHaveClass('custom-class');
});

test('passes through native props', async () => {
  const { getByPlaceholder } = await render(<Textarea placeholder='Test' disabled rows={5} />);
  const textarea = getByPlaceholder('Test');
  await expect.element(textarea).toBeDisabled();
  await expect.element(textarea).toHaveAttribute('rows', '5');
});
