import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './table';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>Inactive</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithCaption: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>A list of users and their information.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alice Wilson</TableCell>
          <TableCell>alice@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Charlie Brown</TableCell>
          <TableCell>charlie@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Diana Prince</TableCell>
          <TableCell>diana@example.com</TableCell>
          <TableCell>Moderator</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Widget A</TableCell>
          <TableCell>10</TableCell>
          <TableCell>$100.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Widget B</TableCell>
          <TableCell>5</TableCell>
          <TableCell>$75.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Widget C</TableCell>
          <TableCell>8</TableCell>
          <TableCell>$120.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>23</TableCell>
          <TableCell>$295.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const EmptyTable: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Column 1</TableHead>
          <TableHead>Column 2</TableHead>
          <TableHead>Column 3</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className='text-center text-muted-foreground'>
            No data available
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const SelectedRows: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Department</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow data-state='selected'>
          <TableCell>001</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>Engineering</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>002</TableCell>
          <TableCell>Jane Smith</TableCell>
          <TableCell>Marketing</TableCell>
        </TableRow>
        <TableRow data-state='selected'>
          <TableCell>003</TableCell>
          <TableCell>Bob Wilson</TableCell>
          <TableCell>Sales</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const LargeTable: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Salary</TableHead>
          <TableHead>Start Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }, (_, i) => (
          <TableRow key={`row-${i + 1}`}>
            <TableCell>{(i + 1).toString().padStart(3, '0')}</TableCell>
            <TableCell>Employee {i + 1}</TableCell>
            <TableCell>Last {i + 1}</TableCell>
            <TableCell>employee{i + 1}@company.com</TableCell>
            <TableCell>{i % 3 === 0 ? 'Engineering' : i % 3 === 1 ? 'Marketing' : 'Sales'}</TableCell>
            <TableCell>${(50000 + i * 5000).toLocaleString()}</TableCell>
            <TableCell>2024-0{((i % 12) + 1).toString().padStart(2, '0')}-01</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const MinimalTable: Story = {
  render: (args) => (
    <Table {...args}>
      <TableBody>
        <TableRow>
          <TableCell>Simple</TableCell>
          <TableCell>Table</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Without</TableCell>
          <TableCell>Header</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const CustomStyling: Story = {
  render: (args) => (
    <Table {...args} className='border-2 border-blue-200'>
      <TableHeader>
        <TableRow className='bg-blue-50'>
          <TableHead className='font-bold text-blue-900'>Column A</TableHead>
          <TableHead className='font-bold text-blue-900'>Column B</TableHead>
          <TableHead className='font-bold text-blue-900'>Column C</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className='hover:bg-blue-25'>
          <TableCell className='text-blue-800'>Data 1</TableCell>
          <TableCell className='text-blue-800'>Data 2</TableCell>
          <TableCell className='text-blue-800'>Data 3</TableCell>
        </TableRow>
        <TableRow className='hover:bg-blue-25'>
          <TableCell className='text-blue-800'>More 1</TableCell>
          <TableCell className='text-blue-800'>More 2</TableCell>
          <TableCell className='text-blue-800'>More 3</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
