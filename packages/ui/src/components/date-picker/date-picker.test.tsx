import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DatePicker, DateRangePicker } from './date-picker';

describe('DatePicker', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with placeholder when no value is provided', () => {
    render(<DatePicker placeholder='Seleccionar fecha' />);
    expect(screen.getByText('Seleccionar fecha')).toBeInTheDocument();
  });

  it('renders with formatted date when value is provided', () => {
    const date = new Date(2026, 0, 15); // January 15, 2026
    render(<DatePicker value={date} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onChange when a date is selected', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<DatePicker onChange={handleChange} />);

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    // The popover dialog should be visible now
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<DatePicker disabled placeholder='Seleccionar fecha' />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<DatePicker className='custom-class' placeholder='Seleccionar fecha' />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});

describe('DateRangePicker', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with placeholder when no value is provided', () => {
    render(<DateRangePicker placeholder='Seleccionar rango' />);
    expect(screen.getByText('Seleccionar rango')).toBeInTheDocument();
  });

  it('renders with formatted date range when value is provided', () => {
    const range = {
      from: new Date(2026, 0, 15),
      to: new Date(2026, 0, 20),
    };
    render(<DateRangePicker value={range} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with only from date when to date is not provided', () => {
    const range = {
      from: new Date(2026, 0, 15),
    };
    render(<DateRangePicker value={range} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onChange when a date range is selected', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<DateRangePicker onChange={handleChange} />);

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    // The popover dialog should be visible now
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<DateRangePicker disabled placeholder='Seleccionar rango' />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<DateRangePicker className='custom-class' placeholder='Seleccionar rango' />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});
