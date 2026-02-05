import type { CreateUserBody } from '@aeme/contracts';
import type { HandleEmployeeFormSchema } from '@/modules/employees/schemas/handle-employee-form-schema';

/**
 * Parses form values to create a user body for employee creation.
 * Note: The Employee role is automatically assigned by the backend when employeeData is provided.
 * The roleIds field only accepts Admin (1) or Accountant (5) values per the schema validation.
 */
export default function parseFormValuesToCreateEmployeeBody(formValues: HandleEmployeeFormSchema): CreateUserBody {
  return {
    profile: formValues.profile,
    organizationIds: formValues.organizationIds,
    // roleIds is intentionally omitted - the backend automatically assigns Employee role when employeeData is provided
    employeeData: formValues.employeeData
      ? {
          ...formValues.employeeData,
          schedules: formValues.employeeData.schedules.filter((schedule) => schedule.isActive),
          profileId: '',
          exitDate: null,
        }
      : undefined,
  };
}
