import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './separator';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator',
    },
    decorative: {
      control: 'boolean',
      description: 'Whether the separator is decorative',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: (args) => (
    <div className='w-64 space-y-4'>
      <div>Content above</div>
      <Separator {...args} />
      <div>Content below</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <div className='flex h-32 items-center space-x-4'>
      <div>Left content</div>
      <Separator {...args} orientation='vertical' />
      <div>Right content</div>
    </div>
  ),
};

export const CustomWidth: Story = {
  render: (args) => (
    <div className='w-96 space-y-4'>
      <div>Content above</div>
      <Separator {...args} className='w-1/2' />
      <div>Content below</div>
    </div>
  ),
};

export const CustomColor: Story = {
  render: (args) => (
    <div className='w-64 space-y-4'>
      <div>Content above</div>
      <Separator {...args} className='bg-red-500' />
      <div>Content below</div>
    </div>
  ),
};

export const ThickSeparator: Story = {
  render: (args) => (
    <div className='w-64 space-y-4'>
      <div>Content above</div>
      <Separator {...args} className='h-1' />
      <div>Content below</div>
    </div>
  ),
};

export const DashedSeparator: Story = {
  render: (args) => (
    <div className='w-64 space-y-4'>
      <div>Content above</div>
      <Separator {...args} className='border-dashed border-t border-border bg-transparent h-0' />
      <div>Content below</div>
    </div>
  ),
};

export const NonDecorative: Story = {
  render: (args) => (
    <div className='w-64 space-y-4'>
      <div>Content above</div>
      <Separator {...args} decorative={false} />
      <div>Content below</div>
    </div>
  ),
  args: {
    decorative: false,
  },
};
