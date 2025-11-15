import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Story básica con configuración por defecto
export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

// Story con variante default (primary)
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'default',
    size: 'default',
  },
};

// Story con variante secondary
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'default',
  },
};

// Story con variante destructive
export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
    size: 'default',
  },
};

// Story con variante outline
export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    size: 'default',
  },
};

// Story con variante ghost
export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    size: 'default',
  },
};

// Story con tamaño small
export const Small: Story = {
  args: {
    children: 'Small Button',
    variant: 'default',
    size: 'sm',
  },
};

// Story con tamaño large
export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'default',
    size: 'lg',
  },
};

// Story con función onClick
export const WithClick: Story = {
  args: {
    children: 'Click Me!',
    variant: 'secondary',
    size: 'default',
    onClick: () => alert('Button clicked!'),
  },
};
