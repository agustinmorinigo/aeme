import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, Label } from '../../components';
import { Calendar, CreditCard, Eye, EyeOff, Lock, Mail, Phone, Search as SearchIcon, User } from '../../icons';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date', 'time', 'file'],
      description: 'The type of input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the input is read-only',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    isError: {
      control: 'boolean',
      description: 'Whether the input should show error styling',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className='space-y-2'>
      <Label htmlFor='input-with-label'>Name</Label>
      <Input {...args} id='input-with-label' placeholder='Enter your name' />
    </div>
  ),
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email address',
  },
};

export const NumberInput: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter number',
    min: 0,
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
  },
};

export const DateInput: Story = {
  args: {
    type: 'date',
  },
};

export const File: Story = {
  args: {
    type: 'file',
    accept: '.pdf,.doc,.docx,.txt',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    value: 'Read-only value',
    readOnly: true,
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter valid email',
    isError: true,
    value: 'invalid-email',
  },
};

export const Required: Story = {
  render: (args) => (
    <div className='space-y-2'>
      <Label htmlFor='required-input'>
        Email <span className='text-destructive'>*</span>
      </Label>
      <Input {...args} id='required-input' type='email' placeholder='Enter your email' required />
    </div>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label>Email</Label>
        <div className='relative'>
          <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
          <Input {...args} type='email' placeholder='Enter email' className='pl-10' />
        </div>
      </div>

      <div className='space-y-2'>
        <Label>Search</Label>
        <div className='relative'>
          <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
          <Input {...args} type='search' placeholder='Search...' className='pl-10' />
        </div>
      </div>
    </div>
  ),
};

export const PasswordWithToggle: Story = {
  render: (args) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className='space-y-2'>
        <Label>Password</Label>
        <div className='relative'>
          <Input {...args} type={showPassword ? 'text' : 'password'} placeholder='Enter password' className='pr-10' />
          <Button
            type='button'
            variant='ghost'
            size='sm'
            className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className='h-4 w-4 text-muted-foreground' />
            ) : (
              <Eye className='h-4 w-4 text-muted-foreground' />
            )}
          </Button>
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    });

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    return (
      <div className='space-y-4 max-w-md'>
        <h3 className='text-lg font-semibold'>Registration Form</h3>

        <div className='space-y-2'>
          <Label htmlFor='name'>Full Name</Label>
          <div className='relative'>
            <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
            <Input
              id='name'
              type='text'
              placeholder='Enter your full name'
              className='pl-10'
              value={formData.name}
              onChange={handleChange('name')}
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <div className='relative'>
            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
            <Input
              id='email'
              type='email'
              placeholder='Enter your email'
              className='pl-10'
              value={formData.email}
              onChange={handleChange('email')}
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='phone'>Phone Number</Label>
          <div className='relative'>
            <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
            <Input
              id='phone'
              type='tel'
              placeholder='Enter your phone number'
              className='pl-10'
              value={formData.phone}
              onChange={handleChange('phone')}
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='password'>Password</Label>
          <div className='relative'>
            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
            <Input
              id='password'
              type='password'
              placeholder='Create a password'
              className='pl-10'
              value={formData.password}
              onChange={handleChange('password')}
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='confirmPassword'>Confirm Password</Label>
          <div className='relative'>
            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
            <Input
              id='confirmPassword'
              type='password'
              placeholder='Confirm your password'
              className='pl-10'
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              isError={formData.confirmPassword !== '' && formData.confirmPassword !== formData.password}
            />
          </div>
          {formData.confirmPassword !== '' && formData.confirmPassword !== formData.password && (
            <p className='text-sm text-destructive'>Passwords do not match</p>
          )}
        </div>

        <Button className='w-full'>Register</Button>
      </div>
    );
  },
};

export const ValidationStates: Story = {
  render: () => (
    <div className='space-y-4 max-w-md'>
      <h3 className='text-lg font-semibold'>Validation States</h3>

      <div className='space-y-2'>
        <Label>Valid Input</Label>
        <Input
          value='john@example.com'
          className='border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/20'
        />
        <p className='text-sm text-green-600'>Email is valid</p>
      </div>

      <div className='space-y-2'>
        <Label>Invalid Input</Label>
        <Input value='invalid-email' isError />
        <p className='text-sm text-destructive'>Please enter a valid email address</p>
      </div>

      <div className='space-y-2'>
        <Label>Required Field</Label>
        <Input placeholder='This field is required' required />
        <p className='text-sm text-muted-foreground'>This field is required</p>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Input Sizes</h3>

      <div className='space-y-2'>
        <Label>Small</Label>
        <Input placeholder='Small input' className='h-8 text-sm' />
      </div>

      <div className='space-y-2'>
        <Label>Default</Label>
        <Input placeholder='Default input' />
      </div>

      <div className='space-y-2'>
        <Label>Large</Label>
        <Input placeholder='Large input' className='h-12 text-base' />
      </div>
    </div>
  ),
};

export const SpecialTypes: Story = {
  render: () => (
    <div className='space-y-4 max-w-md'>
      <h3 className='text-lg font-semibold'>Special Input Types</h3>

      <div className='space-y-2'>
        <Label>Date</Label>
        <div className='relative'>
          <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
          <Input type='date' className='pl-10' />
        </div>
      </div>

      <div className='space-y-2'>
        <Label>Time</Label>
        <Input type='time' />
      </div>

      <div className='space-y-2'>
        <Label>Color</Label>
        <Input type='color' className='w-20 h-10 p-1' />
      </div>

      <div className='space-y-2'>
        <Label>Range</Label>
        <Input type='range' min='0' max='100' defaultValue='50' />
      </div>

      <div className='space-y-2'>
        <Label>Credit Card</Label>
        <div className='relative'>
          <CreditCard className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
          <Input type='text' placeholder='1234 5678 9012 3456' className='pl-10' maxLength={19} />
        </div>
      </div>
    </div>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Custom Styling</h3>

      <div className='space-y-2'>
        <Label>Rounded</Label>
        <Input placeholder='Rounded input' className='rounded-full' />
      </div>

      <div className='space-y-2'>
        <Label>No Border</Label>
        <Input placeholder='No border input' className='border-0 bg-muted' />
      </div>

      <div className='space-y-2'>
        <Label>Custom Colors</Label>
        <Input
          placeholder='Custom colored input'
          className='border-blue-300 focus-visible:border-blue-500 focus-visible:ring-blue-500/20'
        />
      </div>

      <div className='space-y-2'>
        <Label>Large Text</Label>
        <Input placeholder='Large text input' className='text-lg h-12' />
      </div>
    </div>
  ),
};
