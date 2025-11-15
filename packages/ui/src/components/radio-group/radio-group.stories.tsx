import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import { Card, CardContent, CardHeader, CardTitle } from '../card/card';
import { Label } from '../label/label';
import { Separator } from '../separator/separator';
import { RadioGroup, RadioGroupItem } from './radio-group';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
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
      description: 'Disable the entire radio group',
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'The orientation of the radio group',
    },
  },
  args: {
    defaultValue: 'option1',
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
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
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <RadioGroup {...args} className='flex space-x-6'>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='small' id='small' />
        <Label htmlFor='small'>Small</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='medium' id='medium' />
        <Label htmlFor='medium'>Medium</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='large' id='large' />
        <Label htmlFor='large'>Large</Label>
      </div>
    </RadioGroup>
  ),
  args: {
    defaultValue: 'medium',
  },
};

export const WithDescriptions: Story = {
  render: (args) => (
    <RadioGroup {...args} className='space-y-4'>
      <div className='flex items-start space-x-3'>
        <RadioGroupItem value='free' id='free' className='mt-1' />
        <div className='space-y-1'>
          <Label htmlFor='free' className='font-medium'>
            Free Plan
          </Label>
          <p className='text-sm text-muted-foreground'>Basic features with limited usage</p>
        </div>
      </div>
      <div className='flex items-start space-x-3'>
        <RadioGroupItem value='pro' id='pro' className='mt-1' />
        <div className='space-y-1'>
          <Label htmlFor='pro' className='font-medium'>
            Pro Plan
          </Label>
          <p className='text-sm text-muted-foreground'>Advanced features with unlimited usage</p>
        </div>
      </div>
      <div className='flex items-start space-x-3'>
        <RadioGroupItem value='enterprise' id='enterprise' className='mt-1' />
        <div className='space-y-1'>
          <Label htmlFor='enterprise' className='font-medium'>
            Enterprise Plan
          </Label>
          <p className='text-sm text-muted-foreground'>Full features with premium support</p>
        </div>
      </div>
    </RadioGroup>
  ),
  args: {
    defaultValue: 'pro',
  },
};

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup {...args} disabled>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='option1' id='disabled1' />
        <Label htmlFor='disabled1'>Disabled Option 1</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='option2' id='disabled2' />
        <Label htmlFor='disabled2'>Disabled Option 2</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='option3' id='disabled3' />
        <Label htmlFor='disabled3'>Disabled Option 3</Label>
      </div>
    </RadioGroup>
  ),
  args: {
    defaultValue: 'option2',
  },
};

export const IndividualDisabled: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='available' id='available' />
        <Label htmlFor='available'>Available Option</Label>
      </div>
      <div className='flex items-center space-x-2 opacity-50'>
        <RadioGroupItem value='disabled' id='individual-disabled' disabled />
        <Label htmlFor='individual-disabled'>Disabled Option</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='another' id='another' />
        <Label htmlFor='another'>Another Available Option</Label>
      </div>
    </RadioGroup>
  ),
  args: {
    defaultValue: 'available',
  },
};

export const WithBadges: Story = {
  render: (args) => (
    <RadioGroup {...args} className='space-y-3'>
      <div className='flex items-center justify-between p-3 border rounded-lg'>
        <div className='flex items-center space-x-3'>
          <RadioGroupItem value='starter' id='starter' />
          <div>
            <Label htmlFor='starter' className='font-medium'>
              Starter
            </Label>
            <p className='text-sm text-muted-foreground'>Perfect for beginners</p>
          </div>
        </div>
        <Badge variant='secondary'>Free</Badge>
      </div>

      <div className='flex items-center justify-between p-3 border rounded-lg'>
        <div className='flex items-center space-x-3'>
          <RadioGroupItem value='professional' id='professional' />
          <div>
            <Label htmlFor='professional' className='font-medium'>
              Professional
            </Label>
            <p className='text-sm text-muted-foreground'>For growing businesses</p>
          </div>
        </div>
        <Badge>Popular</Badge>
      </div>

      <div className='flex items-center justify-between p-3 border rounded-lg'>
        <div className='flex items-center space-x-3'>
          <RadioGroupItem value='enterprise' id='enterprise-badge' />
          <div>
            <Label htmlFor='enterprise-badge' className='font-medium'>
              Enterprise
            </Label>
            <p className='text-sm text-muted-foreground'>For large organizations</p>
          </div>
        </div>
        <Badge variant='outline'>Custom</Badge>
      </div>
    </RadioGroup>
  ),
  args: {
    defaultValue: 'professional',
  },
};

export const PaymentMethods: Story = {
  render: (args) => (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup {...args} className='space-y-3'>
          <div className='flex items-center space-x-3 p-3 border rounded-lg'>
            <RadioGroupItem value='credit-card' id='credit-card' />
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold'>
                ****
              </div>
              <Label htmlFor='credit-card'>Credit Card ending in 1234</Label>
            </div>
          </div>{' '}
          <div className='flex items-center space-x-3 p-3 border rounded-lg'>
            <RadioGroupItem value='paypal' id='paypal' />
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold'>
                PP
              </div>
              <Label htmlFor='paypal'>PayPal</Label>
            </div>
          </div>
          <div className='flex items-center space-x-3 p-3 border rounded-lg'>
            <RadioGroupItem value='bank-transfer' id='bank-transfer' />
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold'>
                BT
              </div>
              <Label htmlFor='bank-transfer'>Bank Transfer</Label>
            </div>
          </div>
        </RadioGroup>

        <Separator className='my-4' />

        <Button className='w-full'>Proceed to Payment</Button>
      </CardContent>
    </Card>
  ),
  args: {
    defaultValue: 'credit-card',
  },
};

export const NotificationSettings: Story = {
  render: (args) => (
    <div className='space-y-6 max-w-md'>
      <div>
        <h3 className='text-lg font-medium mb-2'>Email Notifications</h3>
        <RadioGroup {...args} className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='all' id='email-all' />
            <Label htmlFor='email-all'>All notifications</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='important' id='email-important' />
            <Label htmlFor='email-important'>Important only</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='none' id='email-none' />
            <Label htmlFor='email-none'>No notifications</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <h3 className='text-lg font-medium mb-2'>Push Notifications</h3>
        <RadioGroup defaultValue='important' className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='all' id='push-all' />
            <Label htmlFor='push-all'>All notifications</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='important' id='push-important' />
            <Label htmlFor='push-important'>Important only</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='none' id='push-none' />
            <Label htmlFor='push-none'>No notifications</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
  args: {
    defaultValue: 'important',
  },
};

export const FormWithValidation: Story = {
  render: (args) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const hasError = submitted && !selectedSize;

    return (
      <form
        className='space-y-4 max-w-md'
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className='space-y-3'>
          <Label className={hasError ? 'text-red-600' : ''}>Select your size *</Label>
          <RadioGroup
            {...args}
            value={selectedSize}
            onValueChange={setSelectedSize}
            className={hasError ? 'border border-red-200 rounded-lg p-3' : ''}
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='xs' id='size-xs' />
              <Label htmlFor='size-xs'>Extra Small (XS)</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='s' id='size-s' />
              <Label htmlFor='size-s'>Small (S)</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='m' id='size-m' />
              <Label htmlFor='size-m'>Medium (M)</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='l' id='size-l' />
              <Label htmlFor='size-l'>Large (L)</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='xl' id='size-xl' />
              <Label htmlFor='size-xl'>Extra Large (XL)</Label>
            </div>
          </RadioGroup>
          {hasError && <p className='text-sm text-red-600'>Please select a size to continue.</p>}
        </div>

        <div className='flex space-x-2'>
          <Button type='submit' variant={hasError ? 'destructive' : 'default'}>
            {submitted && selectedSize ? 'Selected!' : 'Submit'}
          </Button>
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              setSelectedSize('');
              setSubmitted(false);
            }}
          >
            Reset
          </Button>
        </div>

        {selectedSize && (
          <p className='text-sm text-muted-foreground'>
            Selected size: <strong>{selectedSize.toUpperCase()}</strong>
          </p>
        )}
      </form>
    );
  },
};

export const Survey: Story = {
  render: (args) => (
    <Card className='w-full max-w-lg'>
      <CardHeader>
        <CardTitle>Customer Satisfaction Survey</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div>
          <Label className='text-base font-medium'>How satisfied are you with our service?</Label>
          <RadioGroup {...args} className='mt-3 space-y-2'>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='very-satisfied' id='very-satisfied' />
              <Label htmlFor='very-satisfied'>Very Satisfied 😊</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='satisfied' id='satisfied' />
              <Label htmlFor='satisfied'>Satisfied 🙂</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='neutral' id='neutral' />
              <Label htmlFor='neutral'>Neutral 😐</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='dissatisfied' id='dissatisfied' />
              <Label htmlFor='dissatisfied'>Dissatisfied 🙁</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='very-dissatisfied' id='very-dissatisfied' />
              <Label htmlFor='very-dissatisfied'>Very Dissatisfied 😞</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        <div>
          <Label className='text-base font-medium'>Would you recommend us to others?</Label>
          <RadioGroup defaultValue='yes' className='mt-3 flex space-x-6'>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='yes' id='recommend-yes' />
              <Label htmlFor='recommend-yes'>Yes</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='no' id='recommend-no' />
              <Label htmlFor='recommend-no'>No</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='maybe' id='recommend-maybe' />
              <Label htmlFor='recommend-maybe'>Maybe</Label>
            </div>
          </RadioGroup>
        </div>

        <Button className='w-full'>Submit Survey</Button>
      </CardContent>
    </Card>
  ),
  args: {
    defaultValue: 'satisfied',
  },
};
