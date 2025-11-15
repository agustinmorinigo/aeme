import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './sheet';

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the sheet is open by default',
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback when open state changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Right: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button>Open Sheet (Right)</Button>
      </SheetTrigger>
      <SheetContent side='right'>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>This is a sheet sliding from the right side.</SheetDescription>
        </SheetHeader>
        <div className='flex-1 p-4'>
          <p>Sheet content goes here.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button>Open Sheet (Left)</Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>Left Sheet</SheetTitle>
          <SheetDescription>This sheet slides from the left side.</SheetDescription>
        </SheetHeader>
        <div className='flex-1 p-4'>
          <p>Content in left sheet.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const Top: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button>Open Sheet (Top)</Button>
      </SheetTrigger>
      <SheetContent side='top'>
        <SheetHeader>
          <SheetTitle>Top Sheet</SheetTitle>
          <SheetDescription>This sheet slides from the top.</SheetDescription>
        </SheetHeader>
        <div className='p-4'>
          <p>Content in top sheet.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button>Open Sheet (Bottom)</Button>
      </SheetTrigger>
      <SheetContent side='bottom'>
        <SheetHeader>
          <SheetTitle>Bottom Sheet</SheetTitle>
          <SheetDescription>This sheet slides from the bottom.</SheetDescription>
        </SheetHeader>
        <div className='p-4'>
          <p>Content in bottom sheet.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button>Open Sheet with Footer</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet with Footer</SheetTitle>
          <SheetDescription>This sheet includes a footer section.</SheetDescription>
        </SheetHeader>
        <div className='flex-1 p-4'>
          <p>Main content area.</p>
        </div>
        <SheetFooter>
          <Button variant='outline'>Cancel</Button>
          <Button>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const NoHeader: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button>Open Simple Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <div className='p-4'>
          <h2 className='text-lg font-semibold mb-2'>Custom Header</h2>
          <p>This sheet doesn't use SheetHeader component.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const LongContent: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button>Open Long Content Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Long Content</SheetTitle>
          <SheetDescription>Sheet with scrollable content.</SheetDescription>
        </SheetHeader>
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={`content-${i + 1}`} className='p-4 border rounded'>
              <h3 className='font-medium'>Section {i + 1}</h3>
              <p className='text-sm text-muted-foreground'>
                This is content section {i + 1}. The sheet should be scrollable when content overflows.
              </p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const CustomWidth: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button>Open Wide Sheet</Button>
      </SheetTrigger>
      <SheetContent className='w-[600px] sm:max-w-[600px]'>
        <SheetHeader>
          <SheetTitle>Wide Sheet</SheetTitle>
          <SheetDescription>This sheet has a custom width.</SheetDescription>
        </SheetHeader>
        <div className='flex-1 p-4'>
          <p>This sheet is wider than the default.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};
