import type { CreateUserBody } from '@aeme/contracts';
import type { HandleUserFormSchema } from '@/modules/user-management/schemas/handle-user-form-schema';

export default function parseFormValuesToCreateUserBody(formValues: HandleUserFormSchema): CreateUserBody {
  return {
    profile: formValues.profile,
    organizationIds: formValues.organizationIds,
    roleIds: formValues.roles
      .filter((role) => role.value === 'admin' || role.value === 'accountant')
      .map((role) => role.id),
    employeeData: formValues.employeeData
      ? {
          ...formValues.employeeData,
          profileId: '', // TO DO: Revise this!
          exitDate: null,
        }
      : undefined,
    patientData: formValues.patientData,
    doctorData: formValues.doctorData,
  };
}
