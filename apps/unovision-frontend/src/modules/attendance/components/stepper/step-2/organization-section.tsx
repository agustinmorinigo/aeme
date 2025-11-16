import { Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@aeme/ui';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Loader from '@/components/common/loader';
import { FormField } from '@/modules/attendance/components/stepper/form-field';
import type { BasicReportInfoSchema } from '@/modules/attendance/schemas/basic-report-info-schema';
import useBasicReportInfoStore from '@/modules/attendance/stores/use-basic-report-info-store';
import useGetOrganizationsQuery from '@/shared/organizations/queries/use-get-organizations-query';

export default function OrganizationSection() {
  const { organizationId, setOrganizationId } = useBasicReportInfoStore();
  const { data, isPending, isError } = useGetOrganizationsQuery();
  const organizations = data ?? [];

  const {
    formState: { errors },
    control,
    setValue,
  } = useFormContext<BasicReportInfoSchema>();

  useEffect(() => {
    if (organizationId) {
      setValue('organizationId', organizationId);
    }
  }, [organizationId, setValue]);

  return (
    <Card className='w-full flex flex-col gap-4'>
      <div className='w-full flex flex-col gap-1'>
        <p>Organización</p>
        <p className='text-sm text-muted-foreground'>
          Selecciona la organización a la que pertenece el reporte de asistencia que deseas generar.
        </p>
      </div>

      {isPending ? (
        <Loader />
      ) : isError ? (
        <p className='text-sm text-red-600'>Error al cargar las organizaciones</p>
      ) : (
        <FormField name='organizationId' label='Seleccionar organización' error={errors.organizationId?.message}>
          <Controller
            name='organizationId'
            control={control}
            render={({ field }) => (
              <Select
                value={field.value ? field.value.toString() : undefined}
                onValueChange={(value) => {
                  if (!value) return;
                  field.onChange(value);
                  setOrganizationId(value);
                }}
              >
                <SelectTrigger
                  className='w-full max-w-[250px]'
                  {...(errors.organizationId ? { 'aria-invalid': true } : {})}
                >
                  <SelectValue placeholder='Seleccionar' />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((organization) => (
                    <SelectItem key={organization.id} value={organization.id}>
                      {organization.businessName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
      )}
    </Card>
  );
}
