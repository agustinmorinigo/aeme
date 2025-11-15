import type { Meta, StoryObj } from '@storybook/react';
import { AlertTriangle, Info, Save, Settings, Trash2, Upload, User } from 'lucide-react';
import { useState } from 'react';
import { Button, Input, Label } from '@/components';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'The controlled open state of the dialog',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'The default open state when uncontrolled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a basic dialog with a title and description. You can use it to display information or collect user
            input.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <User className='w-4 h-4 mr-2' />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input id='name' defaultValue='John Doe' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='email' className='text-right'>
              Email
            </Label>
            <Input id='email' defaultValue='john@example.com' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='bio' className='text-right'>
              Bio
            </Label>
            <Input id='bio' placeholder='Tell us about yourself' className='col-span-3' />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button>
            <Save className='w-4 h-4 mr-2' />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Confirmation: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant='destructive'>
          <Trash2 className='w-4 h-4 mr-2' />
          Delete Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <AlertTriangle className='w-5 h-5 text-destructive' />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item? This action cannot be undone and will permanently remove the item
            from your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button variant='destructive'>
            <Trash2 className='w-4 h-4 mr-2' />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Information: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant='ghost'>
          <Info className='w-4 h-4 mr-2' />
          Show Info
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Info className='w-5 h-5 text-blue-500' />
            Information
          </DialogTitle>
          <DialogDescription>
            This is an informational dialog. It displays important information to the user without requiring any action
            other than acknowledgment.
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-sm'>
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              <span>System is operational</span>
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
              <span>Last updated: 2 minutes ago</span>
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
              <span>Maintenance scheduled for tonight</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Got it</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const LargeContent: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant='outline'>Terms & Conditions</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-2xl max-h-[80vh]'>
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>Please read our terms and conditions carefully before proceeding.</DialogDescription>
        </DialogHeader>
        <div className='overflow-y-auto max-h-96 pr-4'>
          <div className='space-y-4 text-sm'>
            <section>
              <h3 className='font-semibold mb-2'>1. Acceptance of Terms</h3>
              <p className='text-muted-foreground leading-relaxed'>
                By accessing and using this service, you accept and agree to be bound by the terms and provision of this
                agreement.
              </p>
            </section>
            <section>
              <h3 className='font-semibold mb-2'>2. Use License</h3>
              <p className='text-muted-foreground leading-relaxed'>
                Permission is granted to temporarily download one copy of the materials on our website for personal,
                non-commercial transitory viewing only.
              </p>
            </section>
            <section>
              <h3 className='font-semibold mb-2'>3. Disclaimer</h3>
              <p className='text-muted-foreground leading-relaxed'>
                The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or
                implied, and hereby disclaim and negate all other warranties including without limitation, implied
                warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
                intellectual property or other violation of rights.
              </p>
            </section>
            <section>
              <h3 className='font-semibold mb-2'>4. Limitations</h3>
              <p className='text-muted-foreground leading-relaxed'>
                In no event shall our company or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on our website, even if we or our authorized representative has been notified
                orally or in writing of the possibility of such damage.
              </p>
            </section>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Decline</Button>
          </DialogClose>
          <Button>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithoutCloseButton: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant='outline'>No Close Button</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Important Notice</DialogTitle>
          <DialogDescription>
            This dialog doesn't have a close button in the top right corner. You must use the action buttons below.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Dismiss</Button>
          </DialogClose>
          <Button>Acknowledge</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Controlled: Story = {
  args: {
    open: false,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.open || false);

    return (
      <div className='space-y-4'>
        <div className='flex items-center gap-2'>
          <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
          <span className='text-sm text-muted-foreground'>State: {isOpen ? 'Open' : 'Closed'}</span>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>
                This dialog's state is controlled externally. You can open it with the button above.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant='outline' onClick={() => setIsOpen(false)}>
                Close Programmatically
              </Button>
              <DialogClose asChild>
                <Button>Close Normally</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

export const FileUpload: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>
          <Upload className='w-4 h-4 mr-2' />
          Upload File
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>Select a file to upload. Supported formats: PDF, DOC, DOCX, TXT</DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <div className='border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center'>
            <Upload className='w-8 h-8 mx-auto mb-2 text-muted-foreground' />
            <p className='text-sm text-muted-foreground mb-2'>Drag and drop your file here, or click to browse</p>
            <Button variant='outline' size='sm'>
              Choose File
            </Button>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const SettingsDialog: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Settings className='w-4 h-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Settings className='w-5 h-5' />
            Settings
          </DialogTitle>
          <DialogDescription>Configure your application preferences and settings.</DialogDescription>
        </DialogHeader>
        <div className='py-4 space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label>Notifications</Label>
              <p className='text-sm text-muted-foreground'>Receive email notifications</p>
            </div>
            <Button variant='outline' size='sm'>
              Toggle
            </Button>
          </div>
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label>Dark Mode</Label>
              <p className='text-sm text-muted-foreground'>Use dark theme</p>
            </div>
            <Button variant='outline' size='sm'>
              Toggle
            </Button>
          </div>
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label>Auto Save</Label>
              <p className='text-sm text-muted-foreground'>Automatically save changes</p>
            </div>
            <Button variant='outline' size='sm'>
              Toggle
            </Button>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const CustomSizing: Story = {
  render: () => (
    <div className='flex gap-2'>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline' size='sm'>
            Small
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-sm'>
          <DialogHeader>
            <DialogTitle>Small Dialog</DialogTitle>
            <DialogDescription>This is a small dialog with limited width.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button size='sm'>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>Large</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-4xl'>
          <DialogHeader>
            <DialogTitle>Large Dialog</DialogTitle>
            <DialogDescription>This is a large dialog with extended width for more content.</DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <h4 className='font-medium'>Left Column</h4>
                <p className='text-sm text-muted-foreground'>Content in the left column of this large dialog.</p>
              </div>
              <div className='space-y-2'>
                <h4 className='font-medium'>Right Column</h4>
                <p className='text-sm text-muted-foreground'>Content in the right column of this large dialog.</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};
