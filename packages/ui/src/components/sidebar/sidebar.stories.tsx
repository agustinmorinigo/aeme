import type { Meta, StoryObj } from '@storybook/react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from './sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['left', 'right'],
      description: 'The side of the sidebar',
    },
    variant: {
      control: 'select',
      options: ['sidebar', 'floating', 'inset'],
      description: 'The variant of the sidebar',
    },
    collapsible: {
      control: 'select',
      options: ['offcanvas', 'icon', 'none'],
      description: 'The collapsible behavior',
    },
  },
  args: {
    side: 'left',
    variant: 'sidebar',
    collapsible: 'offcanvas',
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: (args) => (
    <SidebarProvider>
      <div className='flex h-screen'>
        <Sidebar {...args}>
          <SidebarHeader>
            <h2 className='text-lg font-semibold p-4'>Sidebar Header</h2>
          </SidebarHeader>
          <SidebarContent>
            <div className='p-4 space-y-2'>
              <div>Navigation Item 1</div>
              <div>Navigation Item 2</div>
              <div>Navigation Item 3</div>
            </div>
          </SidebarContent>
          <SidebarFooter>
            <div className='p-4'>Footer Content</div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className='p-6'>
            <SidebarTrigger />
            <h1 className='text-2xl font-bold mb-4'>Main Content</h1>
            <p>This is the main content area.</p>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  ),
};

export const RightSide: Story = {
  render: (args) => (
    <SidebarProvider>
      <div className='flex h-screen'>
        <SidebarInset>
          <div className='p-6'>
            <SidebarTrigger />
            <h1 className='text-2xl font-bold mb-4'>Main Content</h1>
            <p>Sidebar is on the right side.</p>
          </div>
        </SidebarInset>
        <Sidebar {...args} side='right'>
          <SidebarHeader>
            <h2 className='text-lg font-semibold p-4'>Right Sidebar</h2>
          </SidebarHeader>
          <SidebarContent>
            <div className='p-4 space-y-2'>
              <div>Right Item 1</div>
              <div>Right Item 2</div>
              <div>Right Item 3</div>
            </div>
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  ),
};

export const FloatingVariant: Story = {
  render: (args) => (
    <SidebarProvider>
      <div className='flex h-screen'>
        <Sidebar {...args} variant='floating'>
          <SidebarHeader>
            <h2 className='text-lg font-semibold p-4'>Floating Sidebar</h2>
          </SidebarHeader>
          <SidebarContent>
            <div className='p-4 space-y-2'>
              <div>Floating Item 1</div>
              <div>Floating Item 2</div>
              <div>Floating Item 3</div>
            </div>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className='p-6'>
            <SidebarTrigger />
            <h1 className='text-2xl font-bold mb-4'>Main Content</h1>
            <p>Sidebar has floating variant.</p>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  ),
};

export const InsetVariant: Story = {
  render: (args) => (
    <SidebarProvider>
      <div className='flex h-screen'>
        <Sidebar {...args} variant='inset'>
          <SidebarHeader>
            <h2 className='text-lg font-semibold p-4'>Inset Sidebar</h2>
          </SidebarHeader>
          <SidebarContent>
            <div className='p-4 space-y-2'>
              <div>Inset Item 1</div>
              <div>Inset Item 2</div>
              <div>Inset Item 3</div>
            </div>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className='p-6'>
            <SidebarTrigger />
            <h1 className='text-2xl font-bold mb-4'>Main Content</h1>
            <p>Sidebar has inset variant.</p>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  ),
};

export const IconCollapsible: Story = {
  render: (args) => (
    <SidebarProvider>
      <div className='flex h-screen'>
        <Sidebar {...args} collapsible='icon'>
          <SidebarHeader>
            <h2 className='text-lg font-semibold p-4'>Icon Sidebar</h2>
          </SidebarHeader>
          <SidebarContent>
            <div className='p-4 space-y-2'>
              <div>🏠 Home</div>
              <div>📊 Dashboard</div>
              <div>⚙️ Settings</div>
            </div>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className='p-6'>
            <SidebarTrigger />
            <h1 className='text-2xl font-bold mb-4'>Main Content</h1>
            <p>Sidebar collapses to icon mode.</p>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  ),
};

export const NonCollapsible: Story = {
  render: (args) => (
    <SidebarProvider>
      <div className='flex h-screen'>
        <Sidebar {...args} collapsible='none'>
          <SidebarHeader>
            <h2 className='text-lg font-semibold p-4'>Fixed Sidebar</h2>
          </SidebarHeader>
          <SidebarContent>
            <div className='p-4 space-y-2'>
              <div>Fixed Item 1</div>
              <div>Fixed Item 2</div>
              <div>Fixed Item 3</div>
            </div>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className='p-6'>
            <h1 className='text-2xl font-bold mb-4'>Main Content</h1>
            <p>Sidebar cannot be collapsed.</p>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  ),
};

export const ControlledState: Story = {
  render: (args) => (
    <SidebarProvider defaultOpen={true}>
      <div className='flex h-screen'>
        <Sidebar {...args}>
          <SidebarHeader>
            <h2 className='text-lg font-semibold p-4'>Controlled Sidebar</h2>
          </SidebarHeader>
          <SidebarContent>
            <div className='p-4 space-y-2'>
              <div>Controlled Item 1</div>
              <div>Controlled Item 2</div>
              <div>Controlled Item 3</div>
            </div>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className='p-6'>
            <SidebarTrigger />
            <h1 className='text-2xl font-bold mb-4'>Main Content</h1>
            <p>Sidebar state is controlled (opens by default).</p>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  ),
};
