import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { Calendar } from './calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      description: 'Layout style for the month/year caption',
    },
    showOutsideDays: {
      control: 'boolean',
      description: 'Show days from previous/next months',
    },
    buttonVariant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'Variant for navigation buttons',
    },
    numberOfMonths: {
      control: 'number',
      description: 'Number of months to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire calendar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    captionLayout: 'label',
    showOutsideDays: true,
  },
};

export const SingleSelection: Story = {
  args: {
    captionLayout: 'label',
    showOutsideDays: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<Date>();
    return <Calendar {...args} mode='single' selected={selected} onSelect={setSelected} />;
  },
};

// export const MultipleSelection: Story = {
//   args: {
//     captionLayout: 'label',
//     showOutsideDays: true,
//   },
//   render: (args) => {
//     const [selected, setSelected] = useState<Date[]>([]);
//     return <Calendar {...args} mode='multiple' selected={selected} onSelect={setSelected} />;
//   },
// };

export const RangeSelection: Story = {
  args: {
    captionLayout: 'label',
    showOutsideDays: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<DateRange>();
    return <Calendar {...args} mode='range' selected={selected} onSelect={setSelected} />;
  },
};

export const WithDropdownNavigation: Story = {
  args: {
    captionLayout: 'dropdown',
    showOutsideDays: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<Date>();
    return (
      <Calendar {...args} mode='single' selected={selected} onSelect={setSelected} fromYear={2020} toYear={2030} />
    );
  },
};

export const MonthsOnlyDropdown: Story = {
  args: {
    captionLayout: 'dropdown-months',
    showOutsideDays: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<Date>();
    return <Calendar {...args} mode='single' selected={selected} onSelect={setSelected} />;
  },
};

export const YearsOnlyDropdown: Story = {
  args: {
    captionLayout: 'dropdown-years',
    showOutsideDays: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<Date>();
    return (
      <Calendar {...args} mode='single' selected={selected} onSelect={setSelected} fromYear={2020} toYear={2030} />
    );
  },
};

export const MultipleMonths: Story = {
  args: {
    captionLayout: 'label',
    showOutsideDays: true,
    numberOfMonths: 2,
  },
  render: (args) => {
    const [selected, setSelected] = useState<DateRange>();
    return <Calendar {...args} mode='range' selected={selected} onSelect={setSelected} />;
  },
};

export const WithoutOutsideDays: Story = {
  args: {
    captionLayout: 'label',
    showOutsideDays: false,
  },
  render: (args) => {
    const [selected, setSelected] = useState<Date>();
    return <Calendar {...args} mode='single' selected={selected} onSelect={setSelected} />;
  },
};

export const WithDisabledDates: Story = {
  args: {
    captionLayout: 'label',
    showOutsideDays: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<Date>();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return (
      <Calendar
        {...args}
        mode='single'
        selected={selected}
        onSelect={setSelected}
        disabled={[{ before: today }, { dayOfWeek: [0, 6] }, tomorrow]}
      />
    );
  },
};

export const WithDefaultMonth: Story = {
  args: {
    captionLayout: 'label',
    showOutsideDays: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<Date>();
    return (
      <Calendar {...args} mode='single' selected={selected} onSelect={setSelected} defaultMonth={new Date(2024, 5)} />
    );
  },
};

export const WithMinMaxDates: Story = {
  args: {
    captionLayout: 'dropdown',
    showOutsideDays: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<Date>();
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    return (
      <Calendar
        {...args}
        mode='single'
        selected={selected}
        onSelect={setSelected}
        fromDate={today}
        toDate={nextMonth}
        fromYear={today.getFullYear()}
        toYear={today.getFullYear()}
      />
    );
  },
};

export const WithWeekNumbers: Story = {
  args: {
    captionLayout: 'label',
    showOutsideDays: true,
    showWeekNumber: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<Date>();
    return <Calendar {...args} mode='single' selected={selected} onSelect={setSelected} />;
  },
};

export const WithCustomStartOfWeek: Story = {
  args: {
    captionLayout: 'label',
    showOutsideDays: true,
    weekStartsOn: 1,
  },
  render: (args) => {
    const [selected, setSelected] = useState<Date>();
    return <Calendar {...args} mode='single' selected={selected} onSelect={setSelected} />;
  },
};

// export const PreselectedDates: Story = {
//   args: {
//     captionLayout: 'label',
//     showOutsideDays: true,
//   },
//   render: (args) => {
//     const today = new Date();
//     const nextWeek = new Date(today);
//     nextWeek.setDate(today.getDate() + 7);
//     const [selected, setSelected] = useState<Date[]>([today, nextWeek]);

//     return <Calendar {...args} mode='multiple' selected={selected} onSelect={setSelected} />;
//   },
// };

export const PreselectedRange: Story = {
  args: {
    captionLayout: 'label',
    showOutsideDays: true,
    numberOfMonths: 2,
  },
  render: (args) => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const [selected, setSelected] = useState<DateRange | undefined>({
      from: today,
      to: nextWeek,
    });

    return <Calendar {...args} mode='range' selected={selected} onSelect={setSelected} />;
  },
};
