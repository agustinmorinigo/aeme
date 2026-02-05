import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker, DateRangePicker } from './date-picker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className='w-[280px]'>
        <DatePicker value={date} onChange={setDate} placeholder='Seleccionar fecha' />
      </div>
    );
  },
};

export const WithPreselectedDate: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date(2026, 0, 15));

    return (
      <div className='w-[280px]'>
        <DatePicker value={date} onChange={setDate} placeholder='Seleccionar fecha' />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className='w-[280px]'>
        <DatePicker value={date} onChange={setDate} placeholder='Seleccionar fecha' disabled />
      </div>
    );
  },
};

export const WithDisabledDates: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className='w-[280px]'>
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder='Seleccionar fecha'
          disabled={(date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today;
          }}
        />
      </div>
    );
  },
};

export const RangePicker: Story = {
  render: function Render() {
    const [range, setRange] = useState<{ from: Date | undefined; to?: Date | undefined } | undefined>();

    return (
      <div className='w-[280px]'>
        <DateRangePicker value={range} onChange={setRange} placeholder='Seleccionar rango de fechas' />
      </div>
    );
  },
};

export const RangePickerWithPreselectedRange: Story = {
  render: function Render() {
    const [range, setRange] = useState<{ from: Date | undefined; to?: Date | undefined } | undefined>({
      from: new Date(2026, 0, 15),
      to: new Date(2026, 0, 20),
    });

    return (
      <div className='w-[280px]'>
        <DateRangePicker value={range} onChange={setRange} placeholder='Seleccionar rango de fechas' />
      </div>
    );
  },
};

export const RangePickerDisabled: Story = {
  render: function Render() {
    const [range, setRange] = useState<{ from: Date | undefined; to?: Date | undefined } | undefined>();

    return (
      <div className='w-[280px]'>
        <DateRangePicker value={range} onChange={setRange} placeholder='Seleccionar rango de fechas' disabled />
      </div>
    );
  },
};

export const WithMonthYearDropdown: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className='w-[280px]'>
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder='Seleccionar fecha de nacimiento'
          captionLayout='dropdown'
          fromYear={1950}
          toYear={new Date().getFullYear()}
        />
      </div>
    );
  },
};

export const WithMonthYearDropdownPreselected: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date(1990, 5, 15)); // 15 de junio de 1990

    return (
      <div className='w-[280px]'>
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder='Seleccionar fecha de nacimiento'
          captionLayout='dropdown'
          fromYear={1950}
          toYear={new Date().getFullYear()}
        />
      </div>
    );
  },
};

export const WithDisabledFutureDates: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className='w-[280px]'>
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder='Seleccionar fecha pasada'
          disabled={(date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
          }}
        />
      </div>
    );
  },
};

export const WithDisabledWeekends: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className='w-[280px]'>
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder='Solo días laborables'
          disabled={(date) => {
            const day = date.getDay();
            return day === 0 || day === 6; // Deshabilita domingos (0) y sábados (6)
          }}
        />
      </div>
    );
  },
};

export const WithDisabledDateRange: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className='w-[280px]'>
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder='Seleccionar fecha disponible'
          disabled={(date) => {
            // Deshabilita fechas entre el 1 y 15 de febrero de 2026
            const start = new Date(2026, 1, 1);
            const end = new Date(2026, 1, 15);
            return date >= start && date <= end;
          }}
        />
      </div>
    );
  },
};

export const RangePickerWithMonthYearDropdown: Story = {
  render: function Render() {
    const [range, setRange] = useState<{ from: Date | undefined; to?: Date | undefined } | undefined>();

    return (
      <div className='w-[560px]'>
        <DateRangePicker
          value={range}
          onChange={setRange}
          placeholder='Seleccionar rango de fechas'
          captionLayout='dropdown'
          fromYear={2020}
          toYear={2030}
        />
      </div>
    );
  },
};

export const RangePickerWithDisabledDates: Story = {
  render: function Render() {
    const [range, setRange] = useState<{ from: Date | undefined; to?: Date | undefined } | undefined>();

    return (
      <div className='w-[560px]'>
        <DateRangePicker
          value={range}
          onChange={setRange}
          placeholder='Seleccionar rango (solo futuro)'
          disabled={(date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today;
          }}
        />
      </div>
    );
  },
};

export const RangePickerWithPreselectedAndDropdown: Story = {
  render: function Render() {
    const [range, setRange] = useState<{ from: Date | undefined; to?: Date | undefined } | undefined>({
      from: new Date(2025, 0, 1),
      to: new Date(2025, 11, 31),
    });

    return (
      <div className='w-[560px]'>
        <DateRangePicker
          value={range}
          onChange={setRange}
          placeholder='Seleccionar año fiscal'
          captionLayout='dropdown'
          fromYear={2020}
          toYear={2030}
        />
      </div>
    );
  },
};
