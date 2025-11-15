import type { Meta, StoryObj } from '@storybook/react';
import { AlertTriangle, Asterisk, Info } from 'lucide-react';
import { Button } from '../button/button';
import { Checkbox } from '../checkbox/checkbox';
import { Input } from '../input/input';
import { RadioGroup, RadioGroupItem } from '../radio-group/radio-group';
import { Label } from './label';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The label text',
    },
    htmlFor: {
      control: 'text',
      description: 'Associates the label with a form control',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  args: {
    children: 'Label text',
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Default Label',
  },
};

export const WithInput: Story = {
  render: (args) => (
    <div className='space-y-2'>
      <Label {...args} htmlFor='input-example'>
        Email Address
      </Label>
      <Input id='input-example' type='email' placeholder='Enter your email' />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: (args) => (
    <div className='flex items-center space-x-2'>
      <Checkbox id='checkbox-example' />
      <Label {...args} htmlFor='checkbox-example'>
        Accept terms and conditions
      </Label>
    </div>
  ),
};

export const WithRadioGroup: Story = {
  render: (args) => (
    <div className='space-y-3'>
      <Label {...args}>Choose your preference</Label>
      <RadioGroup defaultValue='option1'>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='option1' id='option1' />
          <Label htmlFor='option1'>Option 1</Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='option2' id='option2' />
          <Label htmlFor='option2'>Option 2</Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='option3' id='option3' />
          <Label htmlFor='option3'>Option 3</Label>
        </div>
      </RadioGroup>
    </div>
  ),
};

export const Required: Story = {
  render: (args) => (
    <div className='space-y-2'>
      <Label {...args} htmlFor='required-input' className='flex items-center gap-1'>
        Full Name
        <Asterisk className='h-3 w-3 text-red-500' />
      </Label>
      <Input id='required-input' placeholder='Enter your full name' required />
    </div>
  ),
};

export const WithHelpText: Story = {
  render: (args) => (
    <div className='space-y-2'>
      <Label {...args} htmlFor='help-input' className='flex items-center gap-2'>
        Password
        <Info className='h-4 w-4 text-muted-foreground' />
      </Label>
      <Input id='help-input' type='password' placeholder='Enter password' />
      <p className='text-xs text-muted-foreground'>Must be at least 8 characters with numbers and symbols</p>
    </div>
  ),
};

export const ErrorState: Story = {
  render: (args) => (
    <div className='space-y-2'>
      <Label {...args} htmlFor='error-input' className='flex items-center gap-2 text-red-600'>
        Email Address
        <AlertTriangle className='h-4 w-4' />
      </Label>
      <Input id='error-input' type='email' placeholder='Enter email' className='border-red-500' />
      <p className='text-xs text-red-600'>Please enter a valid email address</p>
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className='space-y-2' data-disabled='true'>
      <Label {...args} htmlFor='disabled-input' className='opacity-50'>
        Disabled Field
      </Label>
      <Input id='disabled-input' placeholder='This field is disabled' disabled />
    </div>
  ),
};

export const CustomStyling: Story = {
  render: (args) => (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label {...args} className='text-lg font-bold text-blue-600'>
          Large Bold Label
        </Label>
        <Input placeholder='Input with large label' />
      </div>

      <div className='space-y-2'>
        <Label {...args} className='text-xs uppercase tracking-wide text-gray-500'>
          Small Uppercase Label
        </Label>
        <Input placeholder='Input with small label' />
      </div>

      <div className='space-y-2'>
        <Label {...args} className='text-sm italic text-purple-600'>
          Italic Colored Label
        </Label>
        <Input placeholder='Input with styled label' />
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  render: (args) => (
    <form className='space-y-6 max-w-md'>
      <div className='space-y-2'>
        <Label {...args} htmlFor='form-name' className='flex items-center gap-1'>
          Full Name
          <Asterisk className='h-3 w-3 text-red-500' />
        </Label>
        <Input id='form-name' placeholder='Enter your full name' required />
      </div>

      <div className='space-y-2'>
        <Label {...args} htmlFor='form-email' className='flex items-center gap-1'>
          Email Address
          <Asterisk className='h-3 w-3 text-red-500' />
        </Label>
        <Input id='form-email' type='email' placeholder='Enter your email' required />
      </div>

      <div className='space-y-2'>
        <Label {...args} htmlFor='form-phone'>
          Phone Number
        </Label>
        <Input id='form-phone' type='tel' placeholder='Enter your phone number' />
      </div>

      <div className='flex items-center space-x-2'>
        <Checkbox id='form-newsletter' />
        <Label {...args} htmlFor='form-newsletter'>
          Subscribe to our newsletter
        </Label>
      </div>

      <div className='space-y-3'>
        <Label {...args}>Communication Preference</Label>
        <RadioGroup defaultValue='email'>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='email' id='comm-email' />
            <Label htmlFor='comm-email'>Email</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='sms' id='comm-sms' />
            <Label htmlFor='comm-sms'>SMS</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='both' id='comm-both' />
            <Label htmlFor='comm-both'>Both</Label>
          </div>
        </RadioGroup>
      </div>

      <Button type='submit' className='w-full'>
        Submit Form
      </Button>
    </form>
  ),
};

export const MultipleLabels: Story = {
  render: (args) => (
    <div className='space-y-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label {...args} htmlFor='first-name'>
            First Name
          </Label>
          <Input id='first-name' placeholder='John' />
        </div>

        <div className='space-y-2'>
          <Label {...args} htmlFor='last-name'>
            Last Name
          </Label>
          <Input id='last-name' placeholder='Doe' />
        </div>
      </div>

      <div className='space-y-2'>
        <Label {...args} htmlFor='address'>
          Street Address
        </Label>
        <Input id='address' placeholder='123 Main Street' />
      </div>

      <div className='grid grid-cols-3 gap-4'>
        <div className='space-y-2'>
          <Label {...args} htmlFor='city'>
            City
          </Label>
          <Input id='city' placeholder='New York' />
        </div>

        <div className='space-y-2'>
          <Label {...args} htmlFor='state'>
            State
          </Label>
          <Input id='state' placeholder='NY' />
        </div>

        <div className='space-y-2'>
          <Label {...args} htmlFor='zip'>
            ZIP Code
          </Label>
          <Input id='zip' placeholder='10001' />
        </div>
      </div>
    </div>
  ),
};
