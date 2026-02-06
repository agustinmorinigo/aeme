import type { GetOrganizationEventByIdResponse } from '@aeme/contracts';
import { Checkbox, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from '@aeme/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { DatePickerFormField } from '@/components/common/date-picker-form-field';
import FormFieldLayout from '@/components/common/form-field-layout';
import useBasicReportInfoStore from '@/modules/attendance/stores/use-basic-report-info-store';
import { organizationEventTypeOptions } from '@/modules/organization-events/constants/organization-event-type-options';
import {
  type HandleOrganizationEventSchema,
  handleOrganizationEventSchema,
} from '@/modules/organization-events/schemas/handle-organization-event-schema';

interface HandleOrganizationEventFormProps {
  onSubmit: (data: HandleOrganizationEventSchema) => void;
  organizationEventData?: GetOrganizationEventByIdResponse;
}

export default function HandleOrganizationEventForm({
  onSubmit,
  organizationEventData,
}: HandleOrganizationEventFormProps) {
  const { organization, monthNumber, yearNumber } = useBasicReportInfoStore();
  const isEdition = !!organizationEventData;

  // Determine if it's a multi-day event based on endDate
  const isMultiDayInitial = !!organizationEventData?.endDate;

  const methods = useForm<HandleOrganizationEventSchema>({
    resolver: zodResolver(handleOrganizationEventSchema),
    defaultValues: isEdition
      ? {
          organizationEventId: organizationEventData.id,
          organizationId: organizationEventData.organizationId,
          startDate: organizationEventData.startDate,
          endDate: organizationEventData.endDate ?? undefined,
          type: organizationEventData.type,
          description: organizationEventData.description ?? '',
          isMultiDay: isMultiDayInitial,
        }
      : {
          organizationId: organization?.id ?? '',
          isMultiDay: false,
        },
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = methods;

  const isMultiDay = watch('isMultiDay');

  // Calculate the default month for the DatePicker based on the store values
  const defaultMonth = useMemo(() => {
    // monthNumber is 1-indexed (1 = January), but Date constructor expects 0-indexed months
    const monthIndex = (monthNumber ?? 1) - 1;
    const year = yearNumber ?? new Date().getFullYear();
    return new Date(year, monthIndex, 1);
  }, [monthNumber, yearNumber]);

  useEffect(() => {
    if (!isMultiDay) {
      setValue('endDate', undefined);
    }
  }, [isMultiDay, setValue]);

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  const organizations = organization ? [organization] : [];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleFormSubmit}
        className='w-full flex overflow-hidden flex-col gap-5'
        id='handle-organization-event-form'
      >
        <div className='w-full grid grid-cols-2 gap-6'>
          {/* Organization Select (always disabled) */}
          <FormFieldLayout label='Organización' required id='organizationId'>
            <Select value={organization?.id ?? ''} disabled>
              <SelectTrigger className='w-full min-w-0' title={organization?.businessName}>
                <SelectValue placeholder={organization?.businessName ?? 'Sin organización'} />
              </SelectTrigger>
              <SelectContent>
                {organizations.map((organization) => (
                  <SelectItem key={organization.id} value={organization.id}>
                    {organization.businessName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormFieldLayout>

          {/* Event Type Select */}
          <FormFieldLayout label='Tipo de evento' required id='type' error={errors.type}>
            <Controller
              name='type'
              control={control}
              render={({ field }) => {
                const selectedOption = organizationEventTypeOptions.find((type) => type.value === field.value);
                return (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className='w-full' {...(errors.type ? { 'aria-invalid': true } : {})}>
                      <SelectValue placeholder='Seleccionar tipo de evento'>
                        {selectedOption && (
                          <span className='flex items-center gap-2'>
                            <span>{selectedOption.emoji}</span>
                            <span>{selectedOption.label}</span>
                          </span>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {organizationEventTypeOptions.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <span className='flex items-center gap-2'>
                            <span>{type.emoji}</span>
                            <span>{type.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              }}
            />
          </FormFieldLayout>
        </div>

        {/* Dates */}
        <div className='grid gap-4 grid-cols-2'>
          <DatePickerFormField
            id='startDate'
            label='Fecha de inicio'
            required
            control={control}
            name='startDate'
            error={errors.startDate}
            placeholder='Seleccionar fecha'
            datePickerProps={{
              defaultMonth,
            }}
          />
          {isMultiDay && (
            <DatePickerFormField
              id='endDate'
              label='Fecha de fin'
              required
              control={control}
              name='endDate'
              error={errors.endDate}
              placeholder='Seleccionar fecha'
              datePickerProps={{
                defaultMonth,
              }}
            />
          )}
        </div>

        {/* Multi-day Checkbox */}
        <div className='flex items-center space-x-2'>
          <Controller
            name='isMultiDay'
            control={control}
            render={({ field }) => <Checkbox id='isMultiDay' checked={field.value} onCheckedChange={field.onChange} />}
          />
          <Label htmlFor='isMultiDay' className='text-sm font-normal cursor-pointer'>
            El evento abarca más de un día
          </Label>
        </div>

        {/* Description Textarea */}
        <FormFieldLayout label='Detalles' id='description' error={errors.description}>
          <Textarea
            id='description'
            {...register('description')}
            placeholder='Agrega información adicional sobre el evento...'
            isError={!!errors.description}
          />
        </FormFieldLayout>
      </form>
    </FormProvider>
  );
}
