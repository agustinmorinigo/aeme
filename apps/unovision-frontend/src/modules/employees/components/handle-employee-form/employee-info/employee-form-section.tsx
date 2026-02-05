import { useFormContext } from 'react-hook-form';
import { FormField } from '@/components/common/form-field';
import ContractTypeEmployeeForm from '@/modules/employees/components/handle-employee-form/employee-info/contract-type-employee-form';
import EmployeeSchedulesFormField from '@/modules/employees/components/handle-employee-form/employee-info/employee-schedules-form-field';
import FormSectionLayout from '@/modules/employees/components/handle-employee-form/form-section-layout';
import type { HandleEmployeeFormSchema } from '@/modules/employees/schemas/handle-employee-form-schema';
import useHandleEmployeeModalStore from '@/modules/employees/stores/handle-employee-modal-store';

export default function EmployeeFormSection() {
  const { isDetails } = useHandleEmployeeModalStore();
  const required = !isDetails;

  const {
    register,
    formState: { errors },
  } = useFormContext<HandleEmployeeFormSchema>();

  return (
    <FormSectionLayout
      title='Informacion del empleado'
      description={isDetails ? '' : 'Proporcione la informacion especifica del empleado'}
      hasErrors={!!errors.employeeData}
    >
      <FormField
        id='employeeData.startDate'
        label='Fecha de ingreso'
        type='date'
        required={required}
        register={register('employeeData.startDate')}
        error={errors.employeeData?.startDate}
      />

      <FormField
        id='employeeData.cuil'
        label='CUIL'
        type='text'
        required={required}
        register={register('employeeData.cuil')}
        error={errors.employeeData?.cuil}
      />

      <ContractTypeEmployeeForm required={required} />

      <FormField
        id='employeeData.netSalary'
        label='Salario neto'
        type='number'
        required={required}
        register={register('employeeData.netSalary', { valueAsNumber: true })}
        error={errors.employeeData?.netSalary}
      />

      <EmployeeSchedulesFormField isDetails={isDetails} />
    </FormSectionLayout>
  );
}
