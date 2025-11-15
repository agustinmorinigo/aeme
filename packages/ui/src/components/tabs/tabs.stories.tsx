import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The default active tab',
    },
    value: {
      control: 'text',
      description: 'Controlled active tab',
    },
    onValueChange: {
      action: 'onValueChange',
      description: 'Callback when tab changes',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the tabs',
    },
  },
  args: {
    defaultValue: 'tab1',
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args} className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='tab1'>Tab 1</TabsTrigger>
        <TabsTrigger value='tab2'>Tab 2</TabsTrigger>
        <TabsTrigger value='tab3'>Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value='tab1'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Tab 1 Content</h3>
          <p>This is the content for the first tab.</p>
        </div>
      </TabsContent>
      <TabsContent value='tab2'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Tab 2 Content</h3>
          <p>This is the content for the second tab.</p>
        </div>
      </TabsContent>
      <TabsContent value='tab3'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Tab 3 Content</h3>
          <p>This is the content for the third tab.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const TwoTabs: Story = {
  render: (args) => (
    <Tabs {...args} className='w-[300px]' defaultValue='overview'>
      <TabsList>
        <TabsTrigger value='overview'>Overview</TabsTrigger>
        <TabsTrigger value='details'>Details</TabsTrigger>
      </TabsList>
      <TabsContent value='overview'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Overview</h3>
          <p>General information and summary.</p>
        </div>
      </TabsContent>
      <TabsContent value='details'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Details</h3>
          <p>Detailed information and specifications.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const ManyTabs: Story = {
  render: (args) => (
    <Tabs {...args} className='w-[600px]' defaultValue='home'>
      <TabsList>
        <TabsTrigger value='home'>Home</TabsTrigger>
        <TabsTrigger value='about'>About</TabsTrigger>
        <TabsTrigger value='services'>Services</TabsTrigger>
        <TabsTrigger value='portfolio'>Portfolio</TabsTrigger>
        <TabsTrigger value='contact'>Contact</TabsTrigger>
      </TabsList>
      <TabsContent value='home'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Home</h3>
          <p>Welcome to our homepage.</p>
        </div>
      </TabsContent>
      <TabsContent value='about'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>About</h3>
          <p>Learn more about us.</p>
        </div>
      </TabsContent>
      <TabsContent value='services'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Services</h3>
          <p>Our services and offerings.</p>
        </div>
      </TabsContent>
      <TabsContent value='portfolio'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Portfolio</h3>
          <p>View our work and projects.</p>
        </div>
      </TabsContent>
      <TabsContent value='contact'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Contact</h3>
          <p>Get in touch with us.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  render: (args) => (
    <Tabs {...args} className='w-[400px]' defaultValue='active1'>
      <TabsList>
        <TabsTrigger value='active1'>Active 1</TabsTrigger>
        <TabsTrigger value='disabled' disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value='active2'>Active 2</TabsTrigger>
      </TabsList>
      <TabsContent value='active1'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Active Tab 1</h3>
          <p>This tab is active and clickable.</p>
        </div>
      </TabsContent>
      <TabsContent value='disabled'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Disabled Tab</h3>
          <p>This tab is disabled and cannot be accessed.</p>
        </div>
      </TabsContent>
      <TabsContent value='active2'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Active Tab 2</h3>
          <p>This tab is also active and clickable.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const VerticalTabs: Story = {
  render: (args) => (
    <Tabs {...args} orientation='vertical' className='w-[500px] flex-row'>
      <TabsList className='flex-col h-auto w-fit'>
        <TabsTrigger value='general' className='w-full justify-start'>
          General
        </TabsTrigger>
        <TabsTrigger value='security' className='w-full justify-start'>
          Security
        </TabsTrigger>
        <TabsTrigger value='privacy' className='w-full justify-start'>
          Privacy
        </TabsTrigger>
      </TabsList>
      <TabsContent value='general' className='ml-4'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>General Settings</h3>
          <p>Configure general application settings.</p>
        </div>
      </TabsContent>
      <TabsContent value='security' className='ml-4'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Security Settings</h3>
          <p>Manage your security preferences.</p>
        </div>
      </TabsContent>
      <TabsContent value='privacy' className='ml-4'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Privacy Settings</h3>
          <p>Control your privacy options.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: 'general',
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <Tabs {...args} className='w-full'>
      <TabsList className='w-full'>
        <TabsTrigger value='tab1' className='flex-1'>
          First Tab
        </TabsTrigger>
        <TabsTrigger value='tab2' className='flex-1'>
          Second Tab
        </TabsTrigger>
        <TabsTrigger value='tab3' className='flex-1'>
          Third Tab
        </TabsTrigger>
      </TabsList>
      <TabsContent value='tab1'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>First Tab</h3>
          <p>Content spans the full width of the container.</p>
        </div>
      </TabsContent>
      <TabsContent value='tab2'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Second Tab</h3>
          <p>All tabs have equal width distribution.</p>
        </div>
      </TabsContent>
      <TabsContent value='tab3'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Third Tab</h3>
          <p>Responsive design that works on all screen sizes.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const MinimalContent: Story = {
  render: (args) => (
    <Tabs {...args} className='w-[300px]'>
      <TabsList>
        <TabsTrigger value='simple'>Simple</TabsTrigger>
        <TabsTrigger value='basic'>Basic</TabsTrigger>
      </TabsList>
      <TabsContent value='simple'>
        <p>Simple content without extra styling.</p>
      </TabsContent>
      <TabsContent value='basic'>
        <p>Basic content for the second tab.</p>
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: 'simple',
  },
};

export const CustomSpacing: Story = {
  render: (args) => (
    <Tabs {...args} className='w-[400px] gap-6'>
      <TabsList className='mb-4'>
        <TabsTrigger value='first'>First</TabsTrigger>
        <TabsTrigger value='second'>Second</TabsTrigger>
      </TabsList>
      <TabsContent value='first' className='mt-6'>
        <div className='p-6 border rounded-lg'>
          <h3 className='font-semibold mb-4'>First Content</h3>
          <p>Content with custom spacing between tabs and content.</p>
        </div>
      </TabsContent>
      <TabsContent value='second' className='mt-6'>
        <div className='p-6 border rounded-lg'>
          <h3 className='font-semibold mb-4'>Second Content</h3>
          <p>Increased padding and margins for better visual separation.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: 'first',
  },
};
