import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Controls whether one or multiple items can be opened at the same time',
    },
    collapsible: {
      control: 'boolean',
      description: 'When type is "single", allows closing content when clicking trigger for an open item',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the accordion',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// Story básica con un solo item
export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className='w-full max-w-md'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Story con múltiples items (tipo single)
export const Single: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className='w-full max-w-md'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Yes. It&apos;s animated by default, but you can disable it if you prefer.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Story con múltiples items que pueden abrirse al mismo tiempo
export const Multiple: Story = {
  args: {
    type: 'multiple',
  },
  render: (args) => (
    <Accordion {...args} className='w-full max-w-md'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Can multiple items be open?</AccordionTrigger>
        <AccordionContent>
          Yes! When type is set to &quot;multiple&quot;, you can have multiple accordion items open simultaneously.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>What about animations?</AccordionTrigger>
        <AccordionContent>All items animate independently when opening and closing.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>How does it work?</AccordionTrigger>
        <AccordionContent>Each item can be toggled independently without affecting others.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Story con contenido más complejo
export const ComplexContent: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className='w-full max-w-lg'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Getting Started</AccordionTrigger>
        <AccordionContent>
          <div className='space-y-2'>
            <p>Welcome to our platform! Here&apos;s how to get started:</p>
            <ol className='list-decimal list-inside space-y-1'>
              <li>Create your account</li>
              <li>Complete your profile</li>
              <li>Explore the features</li>
              <li>Start your first project</li>
            </ol>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Account Settings</AccordionTrigger>
        <AccordionContent>
          <div className='space-y-3'>
            <p>Manage your account preferences:</p>
            <div className='grid grid-cols-2 gap-2 text-sm'>
              <div className='p-2 bg-gray-50 rounded'>Profile Settings</div>
              <div className='p-2 bg-gray-50 rounded'>Privacy Settings</div>
              <div className='p-2 bg-gray-50 rounded'>Notifications</div>
              <div className='p-2 bg-gray-50 rounded'>Security</div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Support & Help</AccordionTrigger>
        <AccordionContent>
          <div className='space-y-2'>
            <p>Need help? We&apos;re here for you:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>📧 Email: support@example.com</li>
              <li>💬 Live Chat: Available 24/7</li>
              <li>📚 Documentation: Comprehensive guides</li>
              <li>🎥 Video Tutorials: Step-by-step walkthroughs</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Story sin collapsible (para tipo single)
export const NonCollapsible: Story = {
  args: {
    type: 'single',
    collapsible: false,
    defaultValue: 'item-1',
  },
  render: (args) => (
    <Accordion {...args} className='w-full max-w-md'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Always one item open</AccordionTrigger>
        <AccordionContent>With collapsible set to false, at least one item will always remain open.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Click to switch</AccordionTrigger>
        <AccordionContent>Clicking this will close the other item and open this one.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Third option</AccordionTrigger>
        <AccordionContent>This demonstrates how non-collapsible accordions work.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Story con valor por defecto
export const WithDefaultValue: Story = {
  args: {
    type: 'single',
    collapsible: true,
    defaultValue: 'item-2',
  },
  render: (args) => (
    <Accordion {...args} className='w-full max-w-md'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>First Item</AccordionTrigger>
        <AccordionContent>This is the first item, but it&apos;s not opened by default.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Second Item (Default Open)</AccordionTrigger>
        <AccordionContent>
          This item is opened by default because its value matches the defaultValue prop.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Third Item</AccordionTrigger>
        <AccordionContent>This is the third item.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Story con estilos personalizados
export const Styled: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className='w-full max-w-md border rounded-lg overflow-hidden'>
      <AccordionItem value='item-1' className='border-b-0'>
        <AccordionTrigger className='px-6 py-4 hover:bg-gray-50'>Custom Styled Item 1</AccordionTrigger>
        <AccordionContent className='px-6 py-4 bg-gray-50'>
          This accordion has custom styling applied to demonstrate flexibility.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2' className='border-b-0'>
        <AccordionTrigger className='px-6 py-4 hover:bg-gray-50'>Custom Styled Item 2</AccordionTrigger>
        <AccordionContent className='px-6 py-4 bg-gray-50'>
          You can customize the appearance by adding classes to the individual components.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3' className='border-b-0'>
        <AccordionTrigger className='px-6 py-4 hover:bg-gray-50'>Custom Styled Item 3</AccordionTrigger>
        <AccordionContent className='px-6 py-4 bg-gray-50'>
          The styling system is very flexible and customizable.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
