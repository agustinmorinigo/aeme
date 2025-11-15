import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Label } from '../../components';
import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'The controlled checked state of the checkbox',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'The default checked state when uncontrolled',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required',
    },
    name: {
      control: 'text',
      description: 'The name of the checkbox input',
    },
    value: {
      control: 'text',
      description: 'The value of the checkbox input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    checked: false,
  },
};

export const DefaultChecked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className='flex items-center space-x-2'>
      <Checkbox {...args} id='terms' />
      <Label htmlFor='terms'>Accept terms and conditions</Label>
    </div>
  ),
};

export const WithLabelChecked: Story = {
  args: {
    checked: true,
  },
  render: (args) => (
    <div className='flex items-center space-x-2'>
      <Checkbox {...args} id='newsletter' />
      <Label htmlFor='newsletter'>Subscribe to newsletter</Label>
    </div>
  ),
};

export const WithLabelDisabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className='flex items-center space-x-2'>
      <Checkbox {...args} id='disabled-option' />
      <Label htmlFor='disabled-option' className='text-muted-foreground'>
        This option is disabled
      </Label>
    </div>
  ),
};

export const Interactive: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <div className='flex items-center space-x-2'>
        <Checkbox {...args} id='interactive' checked={checked} onCheckedChange={(value) => setChecked(!!value)} />
        <Label htmlFor='interactive'>{checked ? 'Checked' : 'Unchecked'} - Click to toggle</Label>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [preferences, setPreferences] = useState({
      notifications: false,
      marketing: true,
      analytics: false,
    });

    const handlePreferenceChange = (key: keyof typeof preferences) => (checked: boolean | 'indeterminate') => {
      setPreferences((prev) => ({ ...prev, [key]: !!checked }));
    };

    return (
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Preferences</h3>
        <div className='space-y-3'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='notifications'
              checked={preferences.notifications}
              onCheckedChange={handlePreferenceChange('notifications')}
            />
            <Label htmlFor='notifications'>Email notifications</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='marketing'
              checked={preferences.marketing}
              onCheckedChange={handlePreferenceChange('marketing')}
            />
            <Label htmlFor='marketing'>Marketing communications</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='analytics'
              checked={preferences.analytics}
              onCheckedChange={handlePreferenceChange('analytics')}
            />
            <Label htmlFor='analytics'>Analytics and performance</Label>
          </div>
        </div>
      </div>
    );
  },
};

export const CheckboxList: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>(['item2']);

    const items = [
      { id: 'item1', label: 'Item 1', description: 'First item description' },
      { id: 'item2', label: 'Item 2', description: 'Second item description' },
      { id: 'item3', label: 'Item 3', description: 'Third item description' },
      { id: 'item4', label: 'Item 4', description: 'Fourth item description', disabled: true },
    ];

    const handleItemChange = (itemId: string) => (checked: boolean | 'indeterminate') => {
      setSelectedItems((prev) => (checked ? [...prev, itemId] : prev.filter((id) => id !== itemId)));
    };

    return (
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Select Items</h3>
        <div className='space-y-3'>
          {items.map((item) => (
            <div key={item.id} className='flex items-start space-x-3'>
              <Checkbox
                id={item.id}
                checked={selectedItems.includes(item.id)}
                onCheckedChange={handleItemChange(item.id)}
                disabled={item.disabled}
                className='mt-0.5'
              />
              <div className='flex flex-col'>
                <Label htmlFor={item.id} className={item.disabled ? 'text-muted-foreground' : ''}>
                  {item.label}
                </Label>
                <span className='text-sm text-muted-foreground'>{item.description}</span>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-4 p-3 bg-muted rounded-md'>
          <p className='text-sm'>Selected: {selectedItems.length > 0 ? selectedItems.join(', ') : 'None'}</p>
        </div>
      </div>
    );
  },
};

export const IndeterminateExample: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: '1', label: 'Item 1', checked: true },
      { id: '2', label: 'Item 2', checked: false },
      { id: '3', label: 'Item 3', checked: true },
    ]);

    const checkedItems = items.filter((item) => item.checked).length;
    const isIndeterminate = checkedItems > 0 && checkedItems < items.length;
    const isAllChecked = checkedItems === items.length;

    const handleSelectAll = (checked: boolean | 'indeterminate') => {
      setItems((prev) => prev.map((item) => ({ ...item, checked: !!checked })));
    };

    const handleItemChange = (id: string) => (checked: boolean | 'indeterminate') => {
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, checked: !!checked } : item)));
    };

    return (
      <div className='space-y-4'>
        <div className='flex items-center space-x-2 pb-2 border-b'>
          <Checkbox
            id='select-all'
            checked={isIndeterminate ? 'indeterminate' : isAllChecked}
            onCheckedChange={handleSelectAll}
          />
          <Label htmlFor='select-all' className='font-medium'>
            Select All ({checkedItems}/{items.length})
          </Label>
        </div>
        <div className='space-y-2 pl-6'>
          {items.map((item) => (
            <div key={item.id} className='flex items-center space-x-2'>
              <Checkbox id={item.id} checked={item.checked} onCheckedChange={handleItemChange(item.id)} />
              <Label htmlFor={item.id}>{item.label}</Label>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex items-center space-x-2'>
        <Checkbox id='custom1' className='border-blue-500 data-[state=checked]:bg-blue-500' />
        <Label htmlFor='custom1'>Custom blue checkbox</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <Checkbox id='custom2' className='border-green-500 data-[state=checked]:bg-green-500' />
        <Label htmlFor='custom2'>Custom green checkbox</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <Checkbox id='custom3' className='rounded-full border-purple-500 data-[state=checked]:bg-purple-500' />
        <Label htmlFor='custom3'>Round purple checkbox</Label>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex items-center space-x-2'>
        <Checkbox id='small' className='h-3 w-3' />
        <Label htmlFor='small' className='text-sm'>
          Small checkbox
        </Label>
      </div>
      <div className='flex items-center space-x-2'>
        <Checkbox id='default-size' />
        <Label htmlFor='default-size'>Default checkbox</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <Checkbox id='large' className='h-5 w-5' />
        <Label htmlFor='large' className='text-lg'>
          Large checkbox
        </Label>
      </div>
    </div>
  ),
};
