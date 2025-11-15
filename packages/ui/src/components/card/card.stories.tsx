import type { Meta, StoryObj } from '@storybook/react';
import {
  Bell,
  Calendar,
  CheckCircle,
  DollarSign,
  Heart,
  MoreHorizontal,
  Settings,
  Share,
  Star,
  TrendingUp,
  User,
} from 'lucide-react';
import { Button } from '@/components';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the card',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content of the card where you can put any information you need.</p>
      </CardContent>
    </Card>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account preferences</CardDescription>
        <CardAction>
          <Button variant='ghost' size='icon'>
            <MoreHorizontal className='w-4 h-4' />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Configure your account settings and preferences from this panel.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Project Status</CardTitle>
        <CardDescription>Current progress overview</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Your project is making good progress. All milestones are on track.</p>
      </CardContent>
      <CardFooter>
        <Button variant='outline' className='mr-2'>
          Cancel
        </Button>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  ),
};

export const CompleteCard: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Complete Example</CardTitle>
        <CardDescription>A card with all components</CardDescription>
        <CardAction>
          <Button variant='ghost' size='icon'>
            <Settings className='w-4 h-4' />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>This card demonstrates all available components working together.</p>
        <div className='mt-4 space-y-2'>
          <div className='flex items-center gap-2'>
            <CheckCircle className='w-4 h-4 text-green-500' />
            <span className='text-sm'>Feature complete</span>
          </div>
          <div className='flex items-center gap-2'>
            <User className='w-4 h-4 text-blue-500' />
            <span className='text-sm'>Team assigned</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant='outline' size='sm'>
          View Details
        </Button>
        <Button size='sm' className='ml-2'>
          Get Started
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const UserProfile: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <User className='w-5 h-5' />
          John Doe
        </CardTitle>
        <CardDescription>Software Developer</CardDescription>
        <CardAction>
          <Button variant='ghost' size='icon'>
            <MoreHorizontal className='w-4 h-4' />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          <div className='flex items-center gap-2 text-sm'>
            <Calendar className='w-4 h-4 text-muted-foreground' />
            <span>Joined March 2023</span>
          </div>
          <p className='text-sm text-muted-foreground'>
            Passionate full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant='outline' size='sm'>
          <User className='w-4 h-4 mr-2' />
          View Profile
        </Button>
        <Button size='sm' className='ml-2'>
          <Heart className='w-4 h-4 mr-2' />
          Follow
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const StatisticsCard: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <DollarSign className='w-5 h-5 text-green-500' />
          Revenue
        </CardTitle>
        <CardDescription>Total revenue this month</CardDescription>
        <CardAction>
          <TrendingUp className='w-4 h-4 text-green-500' />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <div className='text-2xl font-bold'>$12,345</div>
          <div className='text-sm text-green-600 flex items-center gap-1'>
            <TrendingUp className='w-3 h-3' />
            +12.5% from last month
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const NotificationCard: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Bell className='w-5 h-5 text-blue-500' />
          New Notification
        </CardTitle>
        <CardDescription>2 minutes ago</CardDescription>
        <CardAction>
          <Button variant='ghost' size='sm'>
            Mark as read
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Your deployment has completed successfully. All services are running normally.</p>
      </CardContent>
    </Card>
  ),
};

export const ArticleCard: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Getting Started with React</CardTitle>
        <CardDescription>A comprehensive guide for beginners</CardDescription>
        <CardAction>
          <div className='flex items-center gap-1'>
            <Star className='w-4 h-4 text-yellow-500' />
            <span className='text-sm'>4.8</span>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-muted-foreground mb-4'>
          Learn the fundamentals of React, including components, props, state, and hooks. This tutorial covers
          everything you need to know to start building modern web applications.
        </p>
        <div className='flex items-center gap-4 text-xs text-muted-foreground'>
          <span>15 min read</span>
          <span>•</span>
          <span>Beginner</span>
          <span>•</span>
          <span>React</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant='outline' size='sm'>
          <Share className='w-4 h-4 mr-2' />
          Share
        </Button>
        <Button size='sm' className='ml-2'>
          Read Article
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const MinimalCard: Story = {
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <p>A minimal card with just content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

export const HeaderOnlyCard: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Header Only</CardTitle>
        <CardDescription>This card only has a header section</CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const MultipleCards: Story = {
  render: () => (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>Card 1</CardTitle>
          <CardDescription>First card example</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for the first card.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Card 2</CardTitle>
          <CardDescription>Second card example</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for the second card.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Card 3</CardTitle>
          <CardDescription>Third card example</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for the third card.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: (args) => (
    <div className='space-y-4'>
      <Card {...args} className='border-blue-200 bg-blue-50'>
        <CardHeader>
          <CardTitle className='text-blue-900'>Custom Blue Theme</CardTitle>
          <CardDescription className='text-blue-700'>Card with custom blue styling</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-blue-800'>This card demonstrates custom color theming.</p>
        </CardContent>
      </Card>

      <Card {...args} className='border-green-200 bg-green-50'>
        <CardHeader>
          <CardTitle className='text-green-900'>Success Theme</CardTitle>
          <CardDescription className='text-green-700'>Card with success styling</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-green-800'>Perfect for success messages or positive content.</p>
        </CardContent>
      </Card>
    </div>
  ),
};
