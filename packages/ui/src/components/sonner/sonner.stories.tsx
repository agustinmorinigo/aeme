import type { Meta, StoryObj } from '@storybook/react';
import { toast } from 'sonner';
import { Button } from '../button/button';
import { Toaster } from './sonner';

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
      description: 'Position of the toaster',
    },
    expand: {
      control: 'boolean',
      description: 'Expand toasts on hover',
    },
    richColors: {
      control: 'boolean',
      description: 'Use rich colors for different toast types',
    },
    closeButton: {
      control: 'boolean',
      description: 'Show close button on toasts',
    },
    duration: {
      control: 'number',
      description: 'Default duration for toasts',
    },
  },
  args: {
    position: 'bottom-right',
    expand: true,
    richColors: false,
    closeButton: false,
    duration: 4000,
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: (args) => (
    <div>
      <Button onClick={() => toast('Default toast message')}>Show Toast</Button>
      <Toaster {...args} />
    </div>
  ),
};

export const TopLeft: Story = {
  render: (args) => (
    <div>
      <Button onClick={() => toast('Toast in top-left position')}>Show Toast</Button>
      <Toaster {...args} position='top-left' />
    </div>
  ),
};

export const TopCenter: Story = {
  render: (args) => (
    <div>
      <Button onClick={() => toast('Toast in top-center position')}>Show Toast</Button>
      <Toaster {...args} position='top-center' />
    </div>
  ),
};

export const WithCloseButton: Story = {
  render: (args) => (
    <div>
      <Button onClick={() => toast('Toast with close button')}>Show Toast</Button>
      <Toaster {...args} closeButton />
    </div>
  ),
};

export const RichColors: Story = {
  render: (args) => (
    <div className='space-x-2'>
      <Button onClick={() => toast.success('Success message')}>Success</Button>
      <Button onClick={() => toast.error('Error message')}>Error</Button>
      <Button onClick={() => toast.warning('Warning message')}>Warning</Button>
      <Button onClick={() => toast.info('Info message')}>Info</Button>
      <Toaster {...args} richColors />
    </div>
  ),
};

export const CustomDuration: Story = {
  render: (args) => (
    <div className='space-x-2'>
      <Button onClick={() => toast('Short duration (1s)', { duration: 1000 })}>1 Second</Button>
      <Button onClick={() => toast('Long duration (10s)', { duration: 10000 })}>10 Seconds</Button>
      <Button onClick={() => toast('Persistent toast', { duration: Infinity })}>Persistent</Button>
      <Toaster {...args} />
    </div>
  ),
};

export const ExpandOnHover: Story = {
  render: (args) => (
    <div>
      <Button
        onClick={() => {
          toast('First toast');
          setTimeout(() => toast('Second toast'), 500);
          setTimeout(() => toast('Third toast'), 1000);
        }}
      >
        Show Multiple Toasts
      </Button>
      <Toaster {...args} expand />
    </div>
  ),
};

export const NoExpand: Story = {
  render: (args) => (
    <div>
      <Button
        onClick={() => {
          toast('First toast');
          setTimeout(() => toast('Second toast'), 500);
          setTimeout(() => toast('Third toast'), 1000);
        }}
      >
        Show Multiple Toasts
      </Button>
      <Toaster {...args} expand={false} />
    </div>
  ),
};
