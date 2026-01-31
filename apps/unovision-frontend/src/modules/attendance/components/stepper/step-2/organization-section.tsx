import { Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@aeme/ui';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Loader from '@/components/common/loader';
import { FormField } from '@/modules/attendance/components/stepper/form-field';
import type { BasicReportInfoSchema } from '@/modules/attendance/schemas/basic-report-info-schema';
import useBasicReportInfoStore from '@/modules/attendance/stores/use-basic-report-info-store';
import useGetOrganizationsQuery from '@/shared/organizations/queries/use-get-organizations-query';

export default function OrganizationSection() {
  const { organization, setOrganization } = useBasicReportInfoStore();
  const { data, isPending, isError } = useGetOrganizationsQuery();
  const organizations = data ?? [];

  const {
    formState: { errors },
    control,
    setValue,
  } = useFormContext<BasicReportInfoSchema>();

  useEffect(() => {
    if (organization) {
      setValue('organization', organization);
    }
  }, [organization, setValue]);

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
        <FormField name='organization' label='Seleccionar organización' error={errors.organization?.message}>
          <Controller
            name='organization'
            control={control}
            render={({ field }) => (
              <Select
                value={field.value?.id ? field.value.id.toString() : undefined}
                onValueChange={(value) => {
                  if (!value) return;
                  field.onChange(value);
                  const selectedOrganization = organizations.find(org => org.id === value) || null;
                  if(!selectedOrganization) return;
                  setOrganization(selectedOrganization);
                }}
              >
                <SelectTrigger
                  className='w-full max-w-[250px]'
                  {...(errors.organization ? { 'aria-invalid': true } : {})}
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
