import { Controller, useFormContext } from 'react-hook-form';
import FormCheckboxGroup from '@/components/common/form-checkbox-group';
import FormSectionLayout from '@/modules/user-management/components/handle-user-form/form-section-layout';
import type { HandleUserFormSchema } from '@/modules/user-management/schemas/handle-user-form-schema';
import useGetOrganizationsQuery from '@/shared/organizations/queries/use-get-organizations-query';
import useHandleUserModalStore from '@/modules/user-management/stores/handle-user-modal-store';

export default function OrganizationsFormSection() {
  const { isDetails } = useHandleUserModalStore();
  const { data } = useGetOrganizationsQuery();
  const organizations = data || [];

  const options = organizations.map((org) => ({
    value: org.id,
    label: org.businessName,
  }));

  const {
    formState: { errors },
    control,
  } = useFormContext<HandleUserFormSchema>();

  return (
    <FormSectionLayout
      title="Organizaciones"
      description={isDetails ? "" : "Seleccioná las organizaciones a las que pertenece el usuario"}
      hasErrors={!!errors.organizationIds}
    >
      <Controller
        name="organizationIds"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <FormCheckboxGroup
            id="organizationIds"
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
