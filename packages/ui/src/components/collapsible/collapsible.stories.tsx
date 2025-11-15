import type { Meta, StoryObj } from '@storybook/react';
import { ChevronDown, ChevronRight, HelpCircle, Minus, Plus, Settings, Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../components';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  argTypes: {
    open: {
      control: 'boolean',
      description: 'The controlled open state of the collapsible',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'The default open state when uncontrolled',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the collapsible is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: (args) => (
    <Collapsible {...args} className='w-full max-w-md'>
      <CollapsibleTrigger asChild>
        <Button variant='ghost' className='flex w-full justify-between p-4'>
          <span>Click to expand</span>
          <ChevronDown className='h-4 w-4 transition-transform duration-200 [&[data-state=open]>svg]:rotate-180' />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
        <div className='p-4 pt-0'>
          <p className='text-sm text-muted-foreground'>
            This is the collapsible content. It can contain any elements you need.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Collapsible {...args} className='w-full max-w-md'>
      <CollapsibleTrigger asChild>
        <Button variant='outline' className='flex w-full justify-between p-4'>
          <span>Initially Open</span>
          <ChevronDown className='h-4 w-4 transition-transform duration-200 [&[data-state=open]>svg]:rotate-180' />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
        <div className='p-4 pt-0'>
          <p className='text-sm text-muted-foreground'>This collapsible starts in an open state by default.</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Controlled: Story = {
  args: {
    open: false,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.open || false);

    return (
      <div className='w-full max-w-md space-y-4'>
        <div className='flex items-center gap-2'>
          <Button onClick={() => setIsOpen(!isOpen)} size='sm'>
            {isOpen ? 'Close' : 'Open'} Externally
          </Button>
          <span className='text-sm text-muted-foreground'>State: {isOpen ? 'Open' : 'Closed'}</span>
        </div>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant='outline' className='flex w-full justify-between p-4'>
              <span>Controlled Collapsible</span>
              <ChevronDown className='h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180' />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
            <div className='p-4 pt-0'>
              <p className='text-sm text-muted-foreground'>
                This collapsible can be controlled both internally and externally.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

export const WithDifferentIcons: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className='w-full max-w-md'>
        <CollapsibleTrigger asChild>
          <Button variant='ghost' className='flex w-full justify-between p-4'>
            <span>Custom Icons</span>
            {isOpen ? <Minus className='h-4 w-4' /> : <Plus className='h-4 w-4' />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
          <div className='p-4 pt-0'>
            <p className='text-sm text-muted-foreground'>This example uses plus/minus icons instead of chevrons.</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const NavigationStyle: Story = {
  render: () => {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

    const toggleSection = (section: string) => {
      setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    return (
      <div className='w-full max-w-md space-y-2'>
        <h3 className='text-lg font-semibold mb-4'>Navigation Menu</h3>

        <Collapsible open={openSections.settings} onOpenChange={() => toggleSection('settings')}>
          <CollapsibleTrigger asChild>
            <Button variant='ghost' className='flex w-full justify-between p-3 h-auto'>
              <div className='flex items-center gap-2'>
                <Settings className='h-4 w-4' />
                <span>Settings</span>
              </div>
              <ChevronRight
                className={`h-4 w-4 transition-transform duration-200 ${openSections.settings ? 'rotate-90' : ''}`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
            <div className='pl-6 py-2 space-y-1'>
              <Button variant='ghost' size='sm' className='w-full justify-start'>
                Profile Settings
              </Button>
              <Button variant='ghost' size='sm' className='w-full justify-start'>
                Privacy
              </Button>
              <Button variant='ghost' size='sm' className='w-full justify-start'>
                Notifications
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={openSections.help} onOpenChange={() => toggleSection('help')}>
          <CollapsibleTrigger asChild>
            <Button variant='ghost' className='flex w-full justify-between p-3 h-auto'>
              <div className='flex items-center gap-2'>
                <HelpCircle className='h-4 w-4' />
                <span>Help & Support</span>
              </div>
              <ChevronRight
                className={`h-4 w-4 transition-transform duration-200 ${openSections.help ? 'rotate-90' : ''}`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
            <div className='pl-6 py-2 space-y-1'>
              <Button variant='ghost' size='sm' className='w-full justify-start'>
                FAQ
              </Button>
              <Button variant='ghost' size='sm' className='w-full justify-start'>
                Contact Support
              </Button>
              <Button variant='ghost' size='sm' className='w-full justify-start'>
                Documentation
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

export const FAQ: Story = {
  render: () => {
    const faqs = [
      {
        id: 'q1',
        question: 'What is this component?',
        answer:
          "This is a collapsible component that allows you to show and hide content. It's perfect for FAQs, navigation menus, and content organization.",
      },
      {
        id: 'q2',
        question: 'How do I customize the animations?',
        answer:
          'You can customize the animations by modifying the CSS classes on the CollapsibleContent component. The component supports data attributes for styling different states.',
      },
      {
        id: 'q3',
        question: 'Can I have multiple sections open?',
        answer:
          'Yes! Each Collapsible component manages its own state independently, so you can have multiple sections open at the same time.',
      },
    ];

    return (
      <div className='w-full max-w-2xl space-y-4'>
        <h3 className='text-xl font-semibold mb-6'>Frequently Asked Questions</h3>
        {faqs.map((faq) => (
          <Collapsible key={faq.id} className='border rounded-lg'>
            <CollapsibleTrigger asChild>
              <Button variant='ghost' className='flex w-full justify-between p-4 h-auto text-left'>
                <span className='font-medium'>{faq.question}</span>
                <ChevronDown className='h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180' />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
              <div className='px-4 pb-4'>
                <p className='text-sm text-muted-foreground leading-relaxed'>{faq.answer}</p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    );
  },
};

export const NestedCollapsibles: Story = {
  render: () => (
    <div className='w-full max-w-md'>
      <Collapsible className='border rounded-lg'>
        <CollapsibleTrigger asChild>
          <Button variant='ghost' className='flex w-full justify-between p-4'>
            <span>Parent Section</span>
            <ChevronDown className='h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180' />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
          <div className='p-4 pt-0 space-y-2'>
            <p className='text-sm text-muted-foreground mb-4'>This parent section contains nested collapsibles:</p>

            <Collapsible className='border rounded-md'>
              <CollapsibleTrigger asChild>
                <Button variant='ghost' size='sm' className='flex w-full justify-between p-3'>
                  <span>Child Section 1</span>
                  <ChevronDown className='h-3 w-3 transition-transform duration-200 data-[state=open]:rotate-180' />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
                <div className='p-3 pt-0'>
                  <p className='text-xs text-muted-foreground'>Nested content for child section 1.</p>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className='border rounded-md'>
              <CollapsibleTrigger asChild>
                <Button variant='ghost' size='sm' className='flex w-full justify-between p-3'>
                  <span>Child Section 2</span>
                  <ChevronDown className='h-3 w-3 transition-transform duration-200 data-[state=open]:rotate-180' />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
                <div className='p-3 pt-0'>
                  <p className='text-xs text-muted-foreground'>Nested content for child section 2.</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <Collapsible className='w-full max-w-lg border rounded-lg'>
      <CollapsibleTrigger asChild>
        <Button variant='ghost' className='flex w-full justify-between p-4'>
          <div className='flex items-center gap-2'>
            <Star className='h-4 w-4 text-yellow-500' />
            <span>Project Details</span>
          </div>
          <ChevronDown className='h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180' />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
        <div className='p-4 pt-0 space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <h4 className='text-sm font-medium mb-1'>Status</h4>
              <div className='flex items-center gap-1'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <span className='text-sm text-muted-foreground'>Active</span>
              </div>
            </div>
            <div>
              <h4 className='text-sm font-medium mb-1'>Priority</h4>
              <span className='text-sm text-muted-foreground'>High</span>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-medium mb-2'>Description</h4>
            <p className='text-sm text-muted-foreground leading-relaxed'>
              This project involves building a modern web application with React, TypeScript, and Tailwind CSS. The
              application will include user authentication, data visualization, and real-time updates.
            </p>
          </div>

          <div className='flex gap-2'>
            <Button size='sm' variant='outline'>
              View Details
            </Button>
            <Button size='sm'>Edit Project</Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const MinimalStyling: Story = {
  render: () => (
    <Collapsible className='w-full max-w-md'>
      <CollapsibleTrigger className='flex w-full items-center justify-between py-2 text-sm font-medium hover:underline [&[data-state=open]>svg]:rotate-180'>
        <span>Simple Collapsible</span>
        <ChevronDown className='h-4 w-4 transition-transform duration-200' />
      </CollapsibleTrigger>
      <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
        <div className='pt-2 pb-4'>
          <p className='text-sm text-muted-foreground'>A minimal collapsible without borders or fancy styling.</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
