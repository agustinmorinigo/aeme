import type { Meta, StoryObj } from '@storybook/react';
import {
  Bell,
  BellOff,
  Copy,
  Download,
  Edit,
  Eye,
  EyeOff,
  Heart,
  LogOut,
  Monitor,
  Moon,
  MoreHorizontal,
  Plus,
  Settings,
  Share,
  Star,
  Sun,
  Trash2,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './dropdown-menu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'The controlled open state of the dropdown menu',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'The default open state when uncontrolled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <User className='mr-2 h-4 w-4' />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className='mr-2 h-4 w-4' />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className='mr-2 h-4 w-4' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithShortcuts: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuItem>
          <Plus className='mr-2 h-4 w-4' />
          New File
          <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className='mr-2 h-4 w-4' />
          Copy
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className='mr-2 h-4 w-4' />
          Edit
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive'>
          <Trash2 className='mr-2 h-4 w-4' />
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithLabelsAndGroups: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className='mr-2 h-4 w-4' />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className='mr-2 h-4 w-4' />
            Settings
            <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Download className='mr-2 h-4 w-4' />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share className='mr-2 h-4 w-4' />
            Share
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className='mr-2 h-4 w-4' />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithCheckboxes: Story = {
  render: (args) => {
    const [showStatusBar, setShowStatusBar] = useState(true);
    const [showActivityBar, setShowActivityBar] = useState(false);
    const [showPanel, setShowPanel] = useState(false);

    return (
      <DropdownMenu {...args}>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>View</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
            <Eye className='mr-2 h-4 w-4' />
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
            <Eye className='mr-2 h-4 w-4' />
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
            <Eye className='mr-2 h-4 w-4' />
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const WithRadioGroup: Story = {
  render: (args) => {
    const [theme, setTheme] = useState('system');

    return (
      <DropdownMenu {...args}>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>Theme</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenuRadioItem value='light'>
              <Sun className='mr-2 h-4 w-4' />
              Light
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='dark'>
              <Moon className='mr-2 h-4 w-4' />
              Dark
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='system'>
              <Monitor className='mr-2 h-4 w-4' />
              System
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const WithSubmenu: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>More Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuItem>
          <Plus className='mr-2 h-4 w-4' />
          New File
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className='mr-2 h-4 w-4' />
          Copy
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Share className='mr-2 h-4 w-4' />
            Share
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <User className='mr-2 h-4 w-4' />
              Share with Team
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className='mr-2 h-4 w-4' />
              Copy Link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Download className='mr-2 h-4 w-4' />
              Export
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Star className='mr-2 h-4 w-4' />
            More Tools
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <Settings className='mr-2 h-4 w-4' />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className='mr-2 h-4 w-4' />
              Extensions
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive'>
          <Trash2 className='mr-2 h-4 w-4' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const ContextMenu: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <Edit className='mr-2 h-4 w-4' />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className='mr-2 h-4 w-4' />
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Heart className='mr-2 h-4 w-4' />
          Favorite
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive'>
          <Trash2 className='mr-2 h-4 w-4' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const NotificationMenu: Story = {
  render: (args) => {
    const [notifications, setNotifications] = useState(true);
    const [sound, setSound] = useState(false);

    return (
      <DropdownMenu {...args}>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <Bell className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked={notifications} onCheckedChange={setNotifications}>
            {notifications ? <Bell className='mr-2 h-4 w-4' /> : <BellOff className='mr-2 h-4 w-4' />}
            Push Notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={sound} onCheckedChange={setSound}>
            Sound
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className='mr-2 h-4 w-4' />
            Notification Settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const UserMenu: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <div className='h-8 w-8 rounded-full bg-muted flex items-center justify-center'>
            <User className='h-4 w-4' />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>John Doe</p>
            <p className='text-xs leading-none text-muted-foreground'>john@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className='mr-2 h-4 w-4' />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className='mr-2 h-4 w-4' />
            Settings
            <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className='mr-2 h-4 w-4' />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const DisabledItems: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>File Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuItem>
          <Edit className='mr-2 h-4 w-4' />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className='mr-2 h-4 w-4' />
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Share className='mr-2 h-4 w-4' />
          Share (Premium Only)
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <Download className='mr-2 h-4 w-4' />
          Download (Not Available)
        </DropdownMenuItem>
        <DropdownMenuItem variant='destructive'>
          <Trash2 className='mr-2 h-4 w-4' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithInsetItems: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>View Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Display</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Eye className='mr-2 h-4 w-4' />
          Show All
        </DropdownMenuItem>
        <DropdownMenuItem inset>Show Hidden Files</DropdownMenuItem>
        <DropdownMenuItem inset>Show Extensions</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <EyeOff className='mr-2 h-4 w-4' />
          Hide All
        </DropdownMenuItem>
        <DropdownMenuItem inset>Hide System Files</DropdownMenuItem>
        <DropdownMenuItem inset>Hide Thumbnails</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
