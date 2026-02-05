import type { UpdateUserBody } from '@aeme/contracts';
import type { HandleEmployeeFormSchema } from '@/modules/employees/schemas/handle-employee-form-schema';
import parseFormValuesToCreateEmployeeBody from '@/modules/employees/utils/parse-form-values-to-create-employee-body';

/**
 * Parses form values to update a user body for employee update.
 */
export default function parseFormValuesToUpdateEmployeeBody(
  userId: string,
  formValues: HandleEmployeeFormSchema,
): UpdateUserBody {
  const newData = parseFormValuesToCreateEmployeeBody(formValues);

  return {
    userId,
    ...newData,
  };
}
