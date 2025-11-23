import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Bell, Calendar, HelpCircle, Info, Mail, Plus, Search, Settings, User } from '../../icons';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { Label } from '../label/label';
import { Separator } from '../separator/separator';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the popover is open by default',
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
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant='outline'>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className='space-y-2'>
          <h4 className='font-medium'>Popover Title</h4>
          <p className='text-sm text-muted-foreground'>This is a simple popover with some content inside.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button>Account Settings</Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>Account Settings</h4>
            <p className='text-sm text-muted-foreground'>Update your profile information.</p>
          </div>
          <div className='grid gap-2'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' defaultValue='John Doe' className='col-span-2 h-8' />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' defaultValue='john@example.com' className='col-span-2 h-8' />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='username'>Username</Label>
              <Input id='username' defaultValue='@johndoe' className='col-span-2 h-8' />
            </div>
          </div>
          <div className='flex justify-end space-x-2'>
            <Button variant='outline' size='sm'>
              Cancel
            </Button>
            <Button size='sm'>Save</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const DifferentPositions: Story = {
  render: (args) => (
    <div className='flex items-center justify-center space-x-4'>
      <Popover {...args}>
        <PopoverTrigger asChild>
          <Button variant='outline'>Top</Button>
        </PopoverTrigger>
        <PopoverContent side='top'>
          <p className='text-sm'>Popover positioned on top</p>
        </PopoverContent>
      </Popover>

      <Popover {...args}>
        <PopoverTrigger asChild>
          <Button variant='outline'>Right</Button>
        </PopoverTrigger>
        <PopoverContent side='right'>
          <p className='text-sm'>Popover positioned on right</p>
        </PopoverContent>
      </Popover>

      <Popover {...args}>
        <PopoverTrigger asChild>
          <Button variant='outline'>Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side='bottom'>
          <p className='text-sm'>Popover positioned on bottom</p>
        </PopoverContent>
      </Popover>

      <Popover {...args}>
        <PopoverTrigger asChild>
          <Button variant='outline'>Left</Button>
        </PopoverTrigger>
        <PopoverContent side='left'>
          <p className='text-sm'>Popover positioned on left</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='icon'>
          <Settings className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className='flex items-center space-x-2'>
          <Settings className='h-4 w-4' />
          <div>
            <h4 className='font-medium'>Settings</h4>
            <p className='text-sm text-muted-foreground'>Configure your preferences</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const UserProfile: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <User className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-56' align='end'>
        <div className='flex items-center space-x-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-muted'>
            <User className='h-4 w-4' />
          </div>
          <div className='space-y-1'>
            <p className='text-sm font-medium'>John Doe</p>
            <p className='text-xs text-muted-foreground'>john@example.com</p>
          </div>
        </div>
        <Separator className='my-2' />
        <div className='space-y-1'>
          <Button variant='ghost' className='w-full justify-start h-8'>
            <User className='mr-2 h-4 w-4' />
            Profile
          </Button>
          <Button variant='ghost' className='w-full justify-start h-8'>
            <Settings className='mr-2 h-4 w-4' />
            Settings
          </Button>
          <Button variant='ghost' className='w-full justify-start h-8'>
            <HelpCircle className='mr-2 h-4 w-4' />
            Help
          </Button>
        </div>
        <Separator className='my-2' />
        <Button variant='ghost' className='w-full justify-start h-8 text-red-600'>
          Log out
        </Button>
      </PopoverContent>
    </Popover>
  ),
};

export const DatePicker: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant='outline' className='w-60 justify-start text-left font-normal'>
          <Calendar className='mr-2 h-4 w-4' />
          Pick a date
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <div className='p-4'>
          <div className='space-y-2'>
            <h4 className='font-medium'>Select Date</h4>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <Button variant='ghost' size='sm'>
                  Previous
                </Button>
                <span className='font-medium'>November 2025</span>
                <Button variant='ghost' size='sm'>
                  Next
                </Button>
              </div>
              <div className='text-sm text-muted-foreground'>
                Select a date from the calendar widget. This is a simplified calendar picker for demonstration purposes.
              </div>
              <div className='flex space-x-2'>
                <Button size='sm'>Today</Button>
                <Button variant='outline' size='sm'>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const NotificationPanel: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='icon' className='relative'>
          <Bell className='h-4 w-4' />
          <span className='absolute -top-2 -right-2 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center'>
            3
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h4 className='font-medium'>Notifications</h4>
            <span className='text-xs text-muted-foreground'>3 new</span>
          </div>
          <div className='space-y-2'>
            <div className='flex items-start space-x-2 p-2 rounded-md hover:bg-muted'>
              <Mail className='h-4 w-4 mt-0.5 text-blue-500' />
              <div className='space-y-1'>
                <p className='text-sm font-medium'>New message</p>
                <p className='text-xs text-muted-foreground'>You have received a new message from Sarah.</p>
                <p className='text-xs text-muted-foreground'>2 minutes ago</p>
              </div>
            </div>
            <div className='flex items-start space-x-2 p-2 rounded-md hover:bg-muted'>
              <User className='h-4 w-4 mt-0.5 text-green-500' />
              <div className='space-y-1'>
                <p className='text-sm font-medium'>New follower</p>
                <p className='text-xs text-muted-foreground'>John started following you.</p>
                <p className='text-xs text-muted-foreground'>1 hour ago</p>
              </div>
            </div>
            <div className='flex items-start space-x-2 p-2 rounded-md hover:bg-muted'>
              <Settings className='h-4 w-4 mt-0.5 text-orange-500' />
              <div className='space-y-1'>
                <p className='text-sm font-medium'>System update</p>
                <p className='text-xs text-muted-foreground'>New features are now available.</p>
                <p className='text-xs text-muted-foreground'>3 hours ago</p>
              </div>
            </div>
          </div>
          <Separator />
          <Button variant='ghost' className='w-full text-sm'>
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const QuickActions: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button size='icon'>
          <Plus className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-48'>
        <div className='space-y-1'>
          <h4 className='font-medium mb-2'>Quick Actions</h4>
          <Button variant='ghost' className='w-full justify-start'>
            <User className='mr-2 h-4 w-4' />
            New Contact
          </Button>
          <Button variant='ghost' className='w-full justify-start'>
            <Mail className='mr-2 h-4 w-4' />
            Send Message
          </Button>
          <Button variant='ghost' className='w-full justify-start'>
            <Calendar className='mr-2 h-4 w-4' />
            Schedule Event
          </Button>
          <Separator className='my-2' />
          <Button variant='ghost' className='w-full justify-start'>
            <Settings className='mr-2 h-4 w-4' />
            More Options
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const SearchPopover: Story = {
  render: (args) => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
      <Popover {...args}>
        <PopoverTrigger asChild>
          <Button variant='outline' className='w-[300px] justify-start text-muted-foreground'>
            <Search className='mr-2 h-4 w-4' />
            Search...
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[300px] p-0'>
          <div className='p-2'>
            <Input
              placeholder='Type to search...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='border-0 focus-visible:ring-0'
            />
          </div>
          <Separator />
          <div className='p-2'>
            {searchQuery ? (
              <div className='space-y-1'>
                <div className='text-xs text-muted-foreground mb-2'>Results for "{searchQuery}"</div>
                <Button variant='ghost' className='w-full justify-start h-8'>
                  <Search className='mr-2 h-3 w-3' />
                  Search result 1
                </Button>
                <Button variant='ghost' className='w-full justify-start h-8'>
                  <Search className='mr-2 h-3 w-3' />
                  Search result 2
                </Button>
              </div>
            ) : (
              <div className='text-xs text-muted-foreground text-center py-4'>Start typing to search...</div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

export const InfoPopover: Story = {
  render: (args) => (
    <div className='flex items-center space-x-2'>
      <span>Hover for more information</span>
      <Popover {...args}>
        <PopoverTrigger asChild>
          <Button variant='ghost' size='icon' className='h-6 w-6'>
            <Info className='h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent side='top' className='w-64'>
          <div className='space-y-2'>
            <h4 className='font-medium'>Additional Information</h4>
            <p className='text-sm text-muted-foreground'>
              This feature allows you to perform advanced operations with enhanced security and better performance.
              Click to learn more about the benefits and how to get started.
            </p>
            <Button size='sm' className='w-full'>
              Learn More
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const ControlledPopover: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <div className='space-y-4'>
        <div className='flex items-center space-x-2'>
          <span>Popover is {open ? 'open' : 'closed'}</span>
          <Button variant='outline' size='sm' onClick={() => setOpen(!open)}>
            {open ? 'Close' : 'Open'} Popover
          </Button>
        </div>

        <Popover {...args} open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button>Controlled Trigger</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className='space-y-2'>
              <h4 className='font-medium'>Controlled Popover</h4>
              <p className='text-sm text-muted-foreground'>This popover's state is controlled externally.</p>
              <Button size='sm' onClick={() => setOpen(false)}>
                Close Popover
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};
