import { Controller, useFormContext } from 'react-hook-form';
import FormFieldLayout from '@/components/common/form-field-layout';
import EmployeeSchedulesFieldContent from '@/modules/employees/components/handle-employee-form/employee-info/employee-schedules-field-content';
import type { HandleEmployeeFormSchema } from '@/modules/employees/schemas/handle-employee-form-schema';

export default function EmployeeSchedulesFormField({ isDetails }: { isDetails: boolean }) {
  const {
    formState: { errors },
    control,
  } = useFormContext<HandleEmployeeFormSchema>();
  const error =
    errors.employeeData?.schedules && errors.employeeData.schedules.type === 'custom'
      ? errors.employeeData.schedules.message
      : '';

  return (
    <FormFieldLayout label={'Horarios de trabajo'} required={true} id={'schedules'} error={error}>
      <div className='w-full overflow-hidden flex flex-col gap-4'>
        {!isDetails && <p className='text-xs'>Configura horarios especificos para cada dia de la semana</p>}

        <div>
          <Controller
            name='employeeData.schedules'
            control={control}
            defaultValue={[]}
            render={({ field }) => <EmployeeSchedulesFieldContent field={field} errors={errors} />}
          />
        </div>
      </div>
    </FormFieldLayout>
  );
}
