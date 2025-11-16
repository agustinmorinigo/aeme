import { Checkbox } from '@aeme/ui';
import { lazy, Suspense, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { RoleName } from '@/client/entities';
import Loader from '@/components/common/loader';
import FormSectionLayout from '@/modules/user-management/components/handle-user-form/form-section-layout';
import { initialEmployeeInfo } from '@/modules/user-management/constants/employee-info';
import type { HandleUserFormSchema } from '@/modules/user-management/schemas/handle-user-form-schema';
import useHandleUserModalStore from '@/modules/user-management/stores/handle-user-modal-store';
import { rolesAsOptions } from '@/shared/users/constants/roles';

const EmployeeForm = lazy(
  () => import('@/modules/user-management/components/handle-user-form/roles-info/employee-info/employee-form'),
);
const PatientForm = lazy(() => import('@/modules/user-management/components/handle-user-form/roles-info/patient-form'));
const DoctorForm = lazy(() => import('@/modules/user-management/components/handle-user-form/roles-info/doctor-form'));

const roleOptions = rolesAsOptions.map((role) => {
  let FormComponent: React.LazyExoticComponent<React.FC> | null = null;

  if (role.value === RoleName.Employee) {
    FormComponent = EmployeeForm;
  } else if (role.value === RoleName.Patient) {
    FormComponent = PatientForm;
  } else if (role.value === RoleName.Doctor) {
    FormComponent = DoctorForm;
  }

  return {
    ...role,
    FormComponent,
  };
});

export default function RolesFormSection() {
  const { isDetails } = useHandleUserModalStore();

  const {
    control,
    formState: { errors },
    unregister,
    watch,
    setValue,
  } = useFormContext<HandleUserFormSchema>();

  const watchRoles = watch('roles');

  useEffect(() => {
    if (watchRoles?.includes(RoleName.Employee) && !watch('employeeInfo')) {
      setValue('employeeInfo', initialEmployeeInfo);
    }
  }, [watchRoles, setValue, watch]);

  return (
    <FormSectionLayout
      title='Roles'
      description={isDetails ? '' : 'Seleccioná los roles que tendrá el usuario'}
      hasErrors={!!errors.roles}
    >
      <Controller
        name='roles'
        control={control}
        render={({ field }) => (
          <>
            {roleOptions.map((roleInfo) => {
              const isChecked = field.value?.includes(roleInfo.value);

              return (
                <div className='flex flex-col gap-6' key={roleInfo.value}>
                  <div className='flex items-start gap-3'>
                    <div className='shrink-0'>
                      <Checkbox
                        id={roleInfo.value}
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...field.value, roleInfo.value]);
                          } else {
                            field.onChange(field.value.filter((r) => r !== roleInfo.value));

                            if (roleInfo.value === RoleName.Patient) unregister('patientInfo');
                            if (roleInfo.value === RoleName.Doctor) unregister('doctorInfo');
                            if (roleInfo.value === RoleName.Employee) unregister('employeeInfo');
                          }
                        }}
                      />
                    </div>
                    <div className='w-full flex flex-col items-start select-none'>
                      <label htmlFor={roleInfo.value} className='text-sm cursor-pointer'>
                        <p>{roleInfo.label}</p>
                        {!isDetails && <p className='text-gray-500'>{roleInfo.description}</p>}
                      </label>
                    </div>
                  </div>
                  {isChecked && roleInfo.FormComponent && (
                    <div className='my-3'>
                      <Suspense fallback={<Loader />}>
                        <roleInfo.FormComponent />
                      </Suspense>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      />

      {errors.roles && <span className='text-destructive text-xs'>{errors.roles.message}</span>}
    </FormSectionLayout>
  );
}
