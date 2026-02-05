import { Controller, useFormContext } from 'react-hook-form';
import FormCheckboxGroup from '@/components/common/form-checkbox-group';
import FormSectionLayout from '@/modules/employees/components/handle-employee-form/form-section-layout';
import type { HandleEmployeeFormSchema } from '@/modules/employees/schemas/handle-employee-form-schema';
import useHandleEmployeeModalStore from '@/modules/employees/stores/handle-employee-modal-store';
import useGetOrganizationsQuery from '@/shared/organizations/queries/use-get-organizations-query';

export default function OrganizationsFormSection() {
  const { isDetails } = useHandleEmployeeModalStore();
  const { data } = useGetOrganizationsQuery();
  const organizations = data || [];

  const options = organizations.map((org) => ({
    value: org.id,
    label: org.businessName,
  }));

  const {
    formState: { errors },
    control,
  } = useFormContext<HandleEmployeeFormSchema>();

  return (
    <FormSectionLayout
      title='Organizaciones'
      description={isDetails ? '' : 'Selecciona las organizaciones a las que pertenece el empleado'}
      hasErrors={!!errors.organizationIds}
    >
      <Controller
        name='organizationIds'
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <FormCheckboxGroup
            id='organizationIds'
            error={errors.organizationIds?.message}
            options={options}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </FormSectionLayout>
  );
}
