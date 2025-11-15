import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the tooltip is open by default',
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback when open state changes',
    },
    delayDuration: {
      control: 'number',
      description: 'Delay before showing tooltip',
    },
  },
  args: {
    delayDuration: 700,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant='outline'>Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Top: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant='outline'>Top tooltip</Button>
      </TooltipTrigger>
      <TooltipContent side='top'>
        <p>Tooltip positioned on top</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant='outline'>Bottom tooltip</Button>
      </TooltipTrigger>
      <TooltipContent side='bottom'>
        <p>Tooltip positioned on bottom</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Left: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant='outline'>Left tooltip</Button>
      </TooltipTrigger>
      <TooltipContent side='left'>
        <p>Tooltip positioned on left</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Right: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant='outline'>Right tooltip</Button>
      </TooltipTrigger>
      <TooltipContent side='right'>
        <p>Tooltip positioned on right</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const LongText: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant='outline'>Long tooltip</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a longer tooltip message that spans multiple lines to demonstrate text wrapping behavior.</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithOffset: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant='outline'>Tooltip with offset</Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={20}>
        <p>Tooltip with increased offset</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const CustomStyling: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant='outline'>Custom tooltip</Button>
      </TooltipTrigger>
      <TooltipContent className='bg-red-500 text-white border-red-600'>
        <p>Custom styled tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const NoDelay: Story = {
  render: (args) => (
    <Tooltip {...args} delayDuration={0}>
      <TooltipTrigger asChild>
        <Button variant='outline'>Instant tooltip</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Shows immediately on hover</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const LongDelay: Story = {
  render: (args) => (
    <Tooltip {...args} delayDuration={2000}>
      <TooltipTrigger asChild>
        <Button variant='outline'>Delayed tooltip</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Shows after 2 second delay</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const AlwaysOpen: Story = {
  render: (args) => (
    <Tooltip {...args} defaultOpen>
      <TooltipTrigger asChild>
        <Button variant='outline'>Always visible</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This tooltip is always visible</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const OnText: Story = {
  render: (args) => (
    <div className='p-4'>
      <p>
        This is some text with a{' '}
        <Tooltip {...args}>
          <TooltipTrigger asChild>
            <span className='underline cursor-help'>tooltip trigger</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Tooltip on text element</p>
          </TooltipContent>
        </Tooltip>{' '}
        in the middle of a sentence.
      </p>
    </div>
  ),
};
