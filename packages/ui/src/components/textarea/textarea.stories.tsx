import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Label } from '../../components';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the textarea is read-only',
    },
    required: {
      control: 'boolean',
      description: 'Whether the textarea is required',
    },
    isError: {
      control: 'boolean',
      description: 'Whether the textarea should show error styling',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
    },
    rows: {
      control: 'number',
      description: 'Number of visible text lines',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className='space-y-2'>
      <Label htmlFor='textarea-with-label'>Description</Label>
      <Textarea {...args} id='textarea-with-label' placeholder='Enter your description' />
    </div>
  ),
};

export const WithRows: Story = {
  args: {
    placeholder: 'Enter text...',
    rows: 8,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    disabled: true,
    value: 'This textarea is disabled',
  },
};

export const ReadOnly: Story = {
  args: {
    value: 'Read-only value that cannot be edited',
    readOnly: true,
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter valid text',
    isError: true,
    value: 'This text has an error',
  },
};

export const Required: Story = {
  render: (args) => (
    <div className='space-y-2'>
      <Label htmlFor='required-textarea'>
        Comments <span className='text-destructive'>*</span>
      </Label>
      <Textarea {...args} id='required-textarea' placeholder='Enter your comments' required />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      description: '',
      comments: '',
    });

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    return (
      <div className='space-y-4 max-w-md'>
        <h3 className='text-lg font-semibold'>Feedback Form</h3>

        <div className='space-y-2'>
          <Label htmlFor='description'>Description</Label>
          <Textarea
            id='description'
            placeholder='Describe your issue...'
            value={formData.description}
            onChange={handleChange('description')}
            rows={4}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='comments'>Additional Comments</Label>
          <Textarea
            id='comments'
            placeholder='Any additional information...'
            value={formData.comments}
            onChange={handleChange('comments')}
            rows={3}
          />
        </div>
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
        <Textarea
          value='This is a valid comment with enough detail.'
          className='border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/20'
        />
        <p className='text-sm text-green-600'>Comment is valid</p>
      </div>

      <div className='space-y-2'>
        <Label>Invalid Input</Label>
        <Textarea value='Too short' isError />
        <p className='text-sm text-destructive'>Please provide more detail</p>
      </div>

      <div className='space-y-2'>
        <Label>Required Field</Label>
        <Textarea placeholder='This field is required' required />
        <p className='text-sm text-muted-foreground'>This field is required</p>
      </div>
    </div>
  ),
};

export const WithCharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const maxLength = 200;

    return (
      <div className='space-y-2 max-w-md'>
        <Label htmlFor='char-count'>Bio</Label>
        <Textarea
          id='char-count'
          placeholder='Tell us about yourself...'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLength}
          rows={4}
        />
        <p className='text-sm text-muted-foreground text-right'>
          {value.length} / {maxLength} characters
        </p>
      </div>
    );
  },
};

export const Resizable: Story = {
  args: {
    placeholder: 'This textarea can be resized',
    className: 'resize',
  },
};

export const WithCustomStyling: Story = {
  render: () => (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Custom Styling</h3>

      <div className='space-y-2'>
        <Label>Rounded</Label>
        <Textarea placeholder='Rounded textarea' className='rounded-xl' />
      </div>

      <div className='space-y-2'>
        <Label>No Border</Label>
        <Textarea placeholder='No border textarea' className='border-0 bg-muted' />
      </div>

      <div className='space-y-2'>
        <Label>Custom Colors</Label>
        <Textarea
          placeholder='Custom colored textarea'
          className='border-blue-300 focus-visible:border-blue-500 focus-visible:ring-blue-500/20'
        />
      </div>
    </div>
  ),
};
