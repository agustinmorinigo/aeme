import type { Meta, StoryObj } from '@storybook/react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: 'Visual style variant of the alert',
    },
    canClose: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed by the user',
    },
    open: {
      control: 'boolean',
      description: 'Controlled visibility state of the alert',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert {...args}>
      <Info />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is a default alert with some important information you should know about.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  render: (args) => (
    <Alert {...args}>
      <AlertCircle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong. Please check your input and try again.</AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert {...args}>
      <CheckCircle />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Your changes have been saved successfully.</AlertDescription>
    </Alert>
  ),
};

export const Warning: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert {...args}>
      <AlertTriangle />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>Please review your settings before proceeding with this action.</AlertDescription>
    </Alert>
  ),
};

export const WithoutIcon: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>No Icon Alert</AlertTitle>
      <AlertDescription>
        This alert doesn't have an icon, which is perfectly fine for simpler messages.
      </AlertDescription>
    </Alert>
  ),
};

export const TitleOnly: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert {...args}>
      <Info />
      <AlertTitle>Title Only Alert</AlertTitle>
    </Alert>
  ),
};

export const DescriptionOnly: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert {...args}>
      <Info />
      <AlertDescription>This alert only has a description without a title.</AlertDescription>
    </Alert>
  ),
};

export const LongContent: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Alert {...args}>
      <Info />
      <AlertTitle>Detailed Information</AlertTitle>
      <AlertDescription>
        <p>This alert contains longer content to demonstrate how the component handles more text.</p>
        <p>Multiple paragraphs are supported and will be properly spaced.</p>
        <p>You can include additional information that users need to understand the context of this alert.</p>
      </AlertDescription>
    </Alert>
  ),
};

export const Closable: Story = {
  args: {
    variant: 'default',
    canClose: true,
  },
  render: (args) => (
    <Alert {...args}>
      <Info />
      <AlertTitle>Dismissible Alert</AlertTitle>
      <AlertDescription>This alert can be closed by clicking the X button in the top right corner.</AlertDescription>
    </Alert>
  ),
};

export const ClosableDestructive: Story = {
  args: {
    variant: 'destructive',
    canClose: true,
  },
  render: (args) => (
    <Alert {...args}>
      <AlertCircle />
      <AlertTitle>Dismissible Error</AlertTitle>
      <AlertDescription>
        This error alert can be dismissed once you've read and understood the message.
      </AlertDescription>
    </Alert>
  ),
};

export const ControlledVisibility: Story = {
  args: {
    variant: 'default',
    open: true,
    canClose: true,
  },
  render: (args) => (
    <Alert {...args}>
      <Info />
      <AlertTitle>Controlled Alert</AlertTitle>
      <AlertDescription>
        This alert's visibility is controlled externally. Toggle the "open" control to show/hide it.
      </AlertDescription>
    </Alert>
  ),
};

export const MultipleAlerts: Story = {
  render: () => (
    <div className='space-y-4'>
      <Alert variant='default'>
        <Info />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>General information alert.</AlertDescription>
      </Alert>
      <Alert variant='default'>
        <CheckCircle />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Operation completed successfully.</AlertDescription>
      </Alert>
      <Alert variant='default'>
        <AlertTriangle />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Please proceed with caution.</AlertDescription>
      </Alert>
      <Alert variant='destructive'>
        <AlertCircle />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    </div>
  ),
};
