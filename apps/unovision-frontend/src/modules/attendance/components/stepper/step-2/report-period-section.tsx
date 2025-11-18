import { Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@aeme/ui';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormField } from '@/modules/attendance/components/stepper/form-field';
import type { BasicReportInfoSchema } from '@/modules/attendance/schemas/basic-report-info-schema';
import useBasicReportInfoStore from '@/modules/attendance/stores/use-basic-report-info-store';
import periodYearsOptions from '@/modules/attendance/utils/get-period-year-options';
import ISOMonths from '@/shared/date-time/constants/iso-months';
import { MonthName } from '@/shared/date-time/types/months';
import isMonth from '@/shared/date-time/utils/is-month';

export default function ReportPeriodSection() {
  const today = new Date();
  const {
    formState: { errors },
    control,
    setValue,
    watch,
  } = useFormContext<BasicReportInfoSchema>();
  const { monthNumber, yearNumber, setPeriod } = useBasicReportInfoStore();

  useEffect(() => {
    if (monthNumber) {
      setValue('monthNumber', monthNumber);
    }

    if (yearNumber) {
      setValue('yearNumber', yearNumber);
    }
  }, [monthNumber, yearNumber, setValue]);

  return (
    <Card className='w-full flex flex-col gap-4'>
      <div className='w-full flex flex-col gap-1'>
        <p>Período del reporte</p>
        <p className='text-sm text-muted-foreground'>
          Selecciona el mes y año que corresponde al reporte de asistencia que deseas generar.
        </p>
      </div>

      <div className='w-full flex items-start gap-2'>
        <FormField name='monthNumber' label='Mes' error={errors.monthNumber?.message}>
          <Controller
            name='monthNumber'
            control={control}
            render={({ field }) => (
              <Select
                value={field.value ? field.value.toString() : undefined}
                onValueChange={(value) => {
                  field.onChange(Number(value));
                  setPeriod({ monthNumber: Number(value), yearNumber: watch('yearNumber') });
                }}
              >
                <SelectTrigger
                  className='w-full max-w-[250px]'
                  {...(errors.monthNumber ? { 'aria-invalid': true } : {})}
                >
                  <SelectValue placeholder='Seleccionar' />
                </SelectTrigger>
                <SelectContent>
                  {ISOMonths.map((month) => (
                    <SelectItem key={month.value} value={month.value.toString()}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField name='yearNumber' label='Año' error={errors.yearNumber?.message}>
          <Controller
            name='yearNumber'
            control={control}
            render={({ field }) => (
              <Select
                value={field.value ? field.value.toString() : undefined}
                onValueChange={(value) => {
                  field.onChange(Number(value));
                  setPeriod({ monthNumber: watch('monthNumber'), yearNumber: Number(value) });
                }}
                disabled={!isMonth(today, MonthName.January)}
              >
                <SelectTrigger
                  className='w-full max-w-[250px]'
                  {...(errors.yearNumber ? { 'aria-invalid': true } : {})}
                >
                  <SelectValue placeholder='Seleccionar' />
                </SelectTrigger>
                <SelectContent>
                  {periodYearsOptions.map((year) => (
                    <SelectItem key={year.value} value={year.value.toString()}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
      </div>
    </Card>
  );
}
