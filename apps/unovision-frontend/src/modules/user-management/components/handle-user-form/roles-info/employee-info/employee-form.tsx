import { useFormContext } from 'react-hook-form';
import { FormField } from '@/components/common/form-field';
import FormSectionLayout from '@/modules/user-management/components/handle-user-form/form-section-layout';
import ContractTypeEmployeeForm from '@/modules/user-management/components/handle-user-form/roles-info/employee-info/contract-type-employee-form';
import EmployeeSchedulesFormField from '@/modules/user-management/components/handle-user-form/roles-info/employee-info/employee-schedules-form-field';
import type { HandleUserFormSchema } from '@/modules/user-management/schemas/handle-user-form-schema';
import useHandleUserModalStore from '@/modules/user-management/stores/handle-user-modal-store';

export default function EmployeeForm() {
  const { isDetails } = useHandleUserModalStore();
  const required = !isDetails;
  
  const {
    register,
    formState: { errors },
  } = useFormContext<HandleUserFormSchema>();

  return (
    <FormSectionLayout
      title="Información del empleado"
      description={isDetails ? "" : "Proporcione la información específica del empleado"}
      hasErrors={!!errors.employeeInfo}
    >
      <FormField
        id="employeeInfo.startDate"
        label="Fecha de ingreso"
        type="date"
        required={required}
        register={register('employeeInfo.startDate')}
        error={errors.employeeInfo?.startDate}
      />

      <FormField
        id="employeeInfo.cuil"
        label="CUIL"
        type="text"
        required={required}
        register={register('employeeInfo.cuil')}
        error={errors.employeeInfo?.cuil}
      />

      <ContractTypeEmployeeForm required={required} />

      <FormField
        id="employeeInfo.netSalary"
        label="Salario neto"
        type="number"
        required={required}
        register={register('employeeInfo.netSalary', { valueAsNumber: true })}
        error={errors.employeeInfo?.netSalary}
      />

      <EmployeeSchedulesFormField isDetails={isDetails} />
    </FormSectionLayout>
  );
}
