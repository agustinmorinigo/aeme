import type { Meta, StoryObj } from '@storybook/react';
import { AlertCircle, ArrowRight, Calendar, CheckCircle, Plus, Star, User, X } from 'lucide-react';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'Visual style variant of the badge',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child element using Radix Slot',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Default',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Badge {...args}>
      <Star />
      Featured
    </Badge>
  ),
};

export const WithIconSecondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => (
    <Badge {...args}>
      <CheckCircle />
      Verified
    </Badge>
  ),
};

export const WithIconDestructive: Story = {
  args: {
    variant: 'destructive',
  },
  render: (args) => (
    <Badge {...args}>
      <AlertCircle />
      Error
    </Badge>
  ),
};

export const WithIconOutline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => (
    <Badge {...args}>
      <User />
      Profile
    </Badge>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge variant='default'>
        <CheckCircle />
        Active
      </Badge>
      <Badge variant='secondary'>
        <Calendar />
        Pending
      </Badge>
      <Badge variant='destructive'>
        <X />
        Inactive
      </Badge>
      <Badge variant='outline'>
        <AlertCircle />
        Warning
      </Badge>
    </div>
  ),
};

export const CountBadges: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge variant='default'>3</Badge>
      <Badge variant='secondary'>12</Badge>
      <Badge variant='destructive'>99+</Badge>
      <Badge variant='outline'>New</Badge>
    </div>
  ),
};

export const CategoryBadges: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge variant='default'>Technology</Badge>
      <Badge variant='secondary'>Design</Badge>
      <Badge variant='outline'>Marketing</Badge>
      <Badge variant='default'>
        <Star />
        Premium
      </Badge>
    </div>
  ),
};

export const SizesDemo: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-2'>
      <Badge variant='default' className='text-xs px-1.5 py-0.5'>
        Small
      </Badge>
      <Badge variant='secondary'>Default</Badge>
      <Badge variant='outline' className='text-sm px-3 py-1'>
        Large
      </Badge>
    </div>
  ),
};

export const InteractiveBadges: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge asChild variant='default'>
        <button type='button'>
          <Plus />
          Add Item
        </button>
      </Badge>
      <Badge asChild variant='secondary'>
        <a href='/learn-more' className='no-underline'>
          <ArrowRight />
          Learn More
        </a>
      </Badge>
      <Badge asChild variant='outline'>
        <button type='button'>
          <X />
          Remove
        </button>
      </Badge>
    </div>
  ),
};

export const NotificationBadges: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='relative inline-block'>
        <div className='w-8 h-8 bg-gray-200 rounded-full'></div>
        <Badge variant='destructive' className='absolute -top-1 -right-1 h-5 w-5 p-0 text-xs'>
          3
        </Badge>
      </div>
      <div className='relative inline-block'>
        <div className='w-10 h-10 bg-gray-200 rounded-lg'></div>
        <Badge variant='default' className='absolute -top-2 -right-2'>
          99+
        </Badge>
      </div>
    </div>
  ),
};

export const LongTextBadges: Story = {
  render: () => (
    <div className='flex flex-col gap-2 max-w-xs'>
      <Badge variant='default'>This is a longer badge text</Badge>
      <Badge variant='secondary'>Very long category name that might wrap</Badge>
      <Badge variant='outline' className='max-w-full truncate'>
        This text will be truncated if too long
      </Badge>
    </div>
  ),
};

export const CustomStyledBadges: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge variant='default' className='bg-green-500 hover:bg-green-600 text-white'>
        <CheckCircle />
        Success
      </Badge>
      <Badge variant='outline' className='border-blue-500 text-blue-500 hover:bg-blue-50'>
        <Star />
        Info
      </Badge>
      <Badge variant='secondary' className='bg-purple-100 text-purple-800 border-purple-200'>
        <Calendar />
        Custom
      </Badge>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-4'>
      <div className='space-y-2'>
        <h4 className='text-sm font-medium'>Without Icons</h4>
        <div className='flex flex-wrap gap-2'>
          <Badge variant='default'>Default</Badge>
          <Badge variant='secondary'>Secondary</Badge>
          <Badge variant='destructive'>Destructive</Badge>
          <Badge variant='outline'>Outline</Badge>
        </div>
      </div>
      <div className='space-y-2'>
        <h4 className='text-sm font-medium'>With Icons</h4>
        <div className='flex flex-wrap gap-2'>
          <Badge variant='default'>
            <Star />
            Default
          </Badge>
          <Badge variant='secondary'>
            <CheckCircle />
            Secondary
          </Badge>
          <Badge variant='destructive'>
            <AlertCircle />
            Destructive
          </Badge>
          <Badge variant='outline'>
            <User />
            Outline
          </Badge>
        </div>
      </div>
    </div>
  ),
};
