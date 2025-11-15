import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from './stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    defaultValue: {
      control: 'number',
      description: 'Default active step',
    },
    value: {
      control: 'number',
      description: 'Controlled active step',
    },
    onValueChange: {
      action: 'onValueChange',
      description: 'Callback when step changes',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the stepper',
    },
  },
  args: {
    defaultValue: 0,
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Horizontal: Story = {
  render: (args) => (
    <Stepper {...args} className='w-full max-w-md'>
      <StepperItem step={0}>
        <StepperTrigger>
          <StepperIndicator />
          <div>
            <StepperTitle>Step 1</StepperTitle>
            <StepperDescription>First step</StepperDescription>
          </div>
        </StepperTrigger>
        <StepperSeparator />
      </StepperItem>

      <StepperItem step={1}>
        <StepperTrigger>
          <StepperIndicator />
          <div>
            <StepperTitle>Step 2</StepperTitle>
            <StepperDescription>Second step</StepperDescription>
          </div>
        </StepperTrigger>
        <StepperSeparator />
      </StepperItem>

      <StepperItem step={2}>
        <StepperTrigger>
          <StepperIndicator />
          <div>
            <StepperTitle>Step 3</StepperTitle>
            <StepperDescription>Final step</StepperDescription>
          </div>
        </StepperTrigger>
      </StepperItem>
    </Stepper>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <Stepper {...args} orientation='vertical' className='h-64'>
      <StepperItem step={0}>
        <StepperTrigger>
          <StepperIndicator />
          <div>
            <StepperTitle>Step 1</StepperTitle>
            <StepperDescription>First step</StepperDescription>
          </div>
        </StepperTrigger>
        <StepperSeparator />
      </StepperItem>

      <StepperItem step={1}>
        <StepperTrigger>
          <StepperIndicator />
          <div>
            <StepperTitle>Step 2</StepperTitle>
            <StepperDescription>Second step</StepperDescription>
          </div>
        </StepperTrigger>
        <StepperSeparator />
      </StepperItem>

      <StepperItem step={2}>
        <StepperTrigger>
          <StepperIndicator />
          <div>
            <StepperTitle>Step 3</StepperTitle>
            <StepperDescription>Final step</StepperDescription>
          </div>
        </StepperTrigger>
      </StepperItem>
    </Stepper>
  ),
};

export const WithCompletedSteps: Story = {
  render: (args) => (
    <Stepper {...args} defaultValue={2} className='w-full max-w-md'>
      <StepperItem step={0} completed>
        <StepperTrigger>
          <StepperIndicator />
          <div>
            <StepperTitle>Completed</StepperTitle>
            <StepperDescription>This step is done</StepperDescription>
          </div>
        </StepperTrigger>
        <StepperSeparator />
      </StepperItem>

      <StepperItem step={1} completed>
        <StepperTrigger>
          <StepperIndicator />
          <div>
            <StepperTitle>Also Completed</StepperTitle>
            <StepperDescription>This is also done</StepperDescription>
          </div>
        </StepperTrigger>
        <StepperSeparator />
      </StepperItem>

      <StepperItem step={2}>
        <StepperTrigger>
          <StepperIndicator />
          <div>
            <StepperTitle>Current</StepperTitle>
            <StepperDescription>Currently active</StepperDescription>
          </div>
        </StepperTrigger>
      </StepperItem>
    </Stepper>
  ),
};

export const WithDisabledSteps: Story = {
  render: (args) => (
    <Stepper {...args} className='w-full max-w-md'>
      <StepperItem step={0}>
        <StepperTrigger>
          <StepperIndicator />
          <div>
            <StepperTitle>Available</StepperTitle>
            <StepperDescription>This step is clickable</StepperDescription>
          </div>
        </StepperTrigger>
        <StepperSeparator />
      </StepperItem>

      <StepperItem step={1} disabled>
        <StepperTrigger>
          <StepperIndicator />
          <div>
            <StepperTitle>Disabled</StepperTitle>
            <StepperDescription>This step is disabled</StepperDescription>
          </div>
        </StepperTrigger>
        <StepperSeparator />
      </StepperItem>

      <StepperItem step={2}>
        <StepperTrigger>
          <StepperIndicator />
          <div>
            <StepperTitle>Available</StepperTitle>
            <StepperDescription>This step is clickable</StepperDescription>
          </div>
        </StepperTrigger>
      </StepperItem>
    </Stepper>
  ),
};

export const WithLoadingStep: Story = {
  render: (args) => (
    <Stepper {...args} defaultValue={1} className='w-full max-w-md'>
      <StepperItem step={0} completed>
        <StepperTrigger>
          <StepperIndicator />
          <div>
            <StepperTitle>Completed</StepperTitle>
            <StepperDescription>This step is done</StepperDescription>
          </div>
        </StepperTrigger>
        <StepperSeparator />
      </StepperItem>

      <StepperItem step={1} loading>
        <StepperTrigger>
          <StepperIndicator />
          <div>
            <StepperTitle>Loading</StepperTitle>
            <StepperDescription>This step is loading</StepperDescription>
          </div>
        </StepperTrigger>
        <StepperSeparator />
      </StepperItem>

      <StepperItem step={2}>
        <StepperTrigger>
          <StepperIndicator />
          <div>
            <StepperTitle>Pending</StepperTitle>
            <StepperDescription>This step is pending</StepperDescription>
          </div>
        </StepperTrigger>
      </StepperItem>
    </Stepper>
  ),
};

export const SimpleIndicators: Story = {
  render: (args) => (
    <Stepper {...args} defaultValue={1} className='w-full max-w-xs'>
      <StepperItem step={0} completed>
        <StepperTrigger>
          <StepperIndicator />
        </StepperTrigger>
        <StepperSeparator />
      </StepperItem>

      <StepperItem step={1}>
        <StepperTrigger>
          <StepperIndicator />
        </StepperTrigger>
        <StepperSeparator />
      </StepperItem>

      <StepperItem step={2}>
        <StepperTrigger>
          <StepperIndicator />
        </StepperTrigger>
        <StepperSeparator />
      </StepperItem>

      <StepperItem step={3}>
        <StepperTrigger>
          <StepperIndicator />
        </StepperTrigger>
      </StepperItem>
    </Stepper>
  ),
};

export const ControlledStepper: Story = {
  render: (args) => {
    const [activeStep, setActiveStep] = useState(0);

    return (
      <Stepper {...args} value={activeStep} onValueChange={setActiveStep} className='w-full max-w-md'>
        <StepperItem step={0}>
          <StepperTrigger>
            <StepperIndicator />
            <div>
              <StepperTitle>Step 1</StepperTitle>
              <StepperDescription>Controlled step 1</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>

        <StepperItem step={1}>
          <StepperTrigger>
            <StepperIndicator />
            <div>
              <StepperTitle>Step 2</StepperTitle>
              <StepperDescription>Controlled step 2</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>

        <StepperItem step={2}>
          <StepperTrigger>
            <StepperIndicator />
            <div>
              <StepperTitle>Step 3</StepperTitle>
              <StepperDescription>Controlled step 3</StepperDescription>
            </div>
          </StepperTrigger>
        </StepperItem>
      </Stepper>
    );
  },
};
