import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The default selected value',
    },
    value: {
      control: 'text',
      description: 'The controlled selected value',
    },
    onValueChange: {
      action: 'onValueChange',
      description: 'Callback when selection changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a fruit' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='apple'>Apple</SelectItem>
        <SelectItem value='banana'>Banana</SelectItem>
        <SelectItem value='orange'>Orange</SelectItem>
        <SelectItem value='grape'>Grape</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className='w-[200px]'>
        <SelectValue placeholder='Select a theme' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Light Themes</SelectLabel>
          <SelectItem value='light'>Light</SelectItem>
          <SelectItem value='soft'>Soft</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Dark Themes</SelectLabel>
          <SelectItem value='dark'>Dark</SelectItem>
          <SelectItem value='midnight'>Midnight</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const SmallSize: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger size='sm' className='w-[150px]'>
        <SelectValue placeholder='Small select' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='xs'>Extra Small</SelectItem>
        <SelectItem value='sm'>Small</SelectItem>
        <SelectItem value='md'>Medium</SelectItem>
        <SelectItem value='lg'>Large</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Select {...args} disabled>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Disabled select' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='item1'>Item 1</SelectItem>
        <SelectItem value='item2'>Item 2</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithDefaultValue: Story = {
  render: (args) => (
    <Select {...args} defaultValue='orange'>
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='apple'>Apple</SelectItem>
        <SelectItem value='banana'>Banana</SelectItem>
        <SelectItem value='orange'>Orange</SelectItem>
        <SelectItem value='grape'>Grape</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const DisabledItems: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select an option' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='available'>Available</SelectItem>
        <SelectItem value='disabled' disabled>
          Disabled Item
        </SelectItem>
        <SelectItem value='another'>Another Available</SelectItem>
        <SelectItem value='also-disabled' disabled>
          Also Disabled
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const LongList: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className='w-[200px]'>
        <SelectValue placeholder='Select a country' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='argentina'>Argentina</SelectItem>
        <SelectItem value='australia'>Australia</SelectItem>
        <SelectItem value='brazil'>Brazil</SelectItem>
        <SelectItem value='canada'>Canada</SelectItem>
        <SelectItem value='china'>China</SelectItem>
        <SelectItem value='france'>France</SelectItem>
        <SelectItem value='germany'>Germany</SelectItem>
        <SelectItem value='india'>India</SelectItem>
        <SelectItem value='italy'>Italy</SelectItem>
        <SelectItem value='japan'>Japan</SelectItem>
        <SelectItem value='mexico'>Mexico</SelectItem>
        <SelectItem value='spain'>Spain</SelectItem>
        <SelectItem value='uk'>United Kingdom</SelectItem>
        <SelectItem value='usa'>United States</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const MultipleGroups: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className='w-[220px]'>
        <SelectValue placeholder='Select a programming language' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frontend</SelectLabel>
          <SelectItem value='javascript'>JavaScript</SelectItem>
          <SelectItem value='typescript'>TypeScript</SelectItem>
          <SelectItem value='html'>HTML</SelectItem>
          <SelectItem value='css'>CSS</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Backend</SelectLabel>
          <SelectItem value='python'>Python</SelectItem>
          <SelectItem value='java'>Java</SelectItem>
          <SelectItem value='csharp'>C#</SelectItem>
          <SelectItem value='go'>Go</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Database</SelectLabel>
          <SelectItem value='sql'>SQL</SelectItem>
          <SelectItem value='mongodb'>MongoDB</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};
