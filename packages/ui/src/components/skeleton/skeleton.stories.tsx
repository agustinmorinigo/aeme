import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: (args) => <Skeleton {...args} className='h-4 w-[250px]' />,
};

export const Circle: Story = {
  render: (args) => <Skeleton {...args} className='h-12 w-12 rounded-full' />,
};

export const Rectangle: Story = {
  render: (args) => <Skeleton {...args} className='h-20 w-40' />,
};

export const TextLine: Story = {
  render: (args) => <Skeleton {...args} className='h-4 w-full max-w-sm' />,
};

export const Button: Story = {
  render: (args) => <Skeleton {...args} className='h-9 w-20 rounded-md' />,
};

export const Avatar: Story = {
  render: (args) => <Skeleton {...args} className='h-10 w-10 rounded-full' />,
};

export const Card: Story = {
  render: (args) => (
    <div className='space-y-3'>
      <Skeleton {...args} className='h-4 w-[250px]' />
      <Skeleton {...args} className='h-4 w-[200px]' />
      <Skeleton {...args} className='h-4 w-[150px]' />
    </div>
  ),
};

export const Paragraph: Story = {
  render: (args) => (
    <div className='space-y-2'>
      <Skeleton {...args} className='h-3 w-full' />
      <Skeleton {...args} className='h-3 w-full' />
      <Skeleton {...args} className='h-3 w-3/4' />
      <Skeleton {...args} className='h-3 w-1/2' />
    </div>
  ),
};

export const Profile: Story = {
  render: (args) => (
    <div className='flex items-center space-x-4'>
      <Skeleton {...args} className='h-12 w-12 rounded-full' />
      <div className='space-y-2'>
        <Skeleton {...args} className='h-4 w-[250px]' />
        <Skeleton {...args} className='h-4 w-[200px]' />
      </div>
    </div>
  ),
};

export const List: Story = {
  render: (args) => (
    <div className='space-y-4'>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={`skeleton-${i + 1}`} className='flex items-center space-x-4'>
          <Skeleton {...args} className='h-8 w-8 rounded-full' />
          <div className='space-y-2 flex-1'>
            <Skeleton {...args} className='h-3 w-3/4' />
            <Skeleton {...args} className='h-3 w-1/2' />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const CustomSizes: Story = {
  render: (args) => (
    <div className='space-y-4'>
      <Skeleton {...args} className='h-2 w-full' />
      <Skeleton {...args} className='h-4 w-full' />
      <Skeleton {...args} className='h-6 w-full' />
      <Skeleton {...args} className='h-8 w-full' />
      <Skeleton {...args} className='h-12 w-full' />
    </div>
  ),
};

export const CustomRounded: Story = {
  render: (args) => (
    <div className='space-y-4'>
      <Skeleton {...args} className='h-8 w-40 rounded-none' />
      <Skeleton {...args} className='h-8 w-40 rounded-sm' />
      <Skeleton {...args} className='h-8 w-40 rounded-md' />
      <Skeleton {...args} className='h-8 w-40 rounded-lg' />
      <Skeleton {...args} className='h-8 w-40 rounded-xl' />
      <Skeleton {...args} className='h-8 w-40 rounded-full' />
    </div>
  ),
};
