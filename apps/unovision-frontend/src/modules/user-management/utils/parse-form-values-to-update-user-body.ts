import type { UpdateUserBody } from '@aeme/contracts';
import type { HandleUserFormSchema } from '@/modules/user-management/schemas/handle-user-form-schema';
import parseFormValuesToCreateUserBody from '@/modules/user-management/utils/parse-form-values-to-create-user-body';

export default function parseFormValuesToUpdateUserBody(
  userId: string,
  formValues: HandleUserFormSchema,
): UpdateUserBody {
  const newData = parseFormValuesToCreateUserBody(formValues);

  return {
    userId,
    ...newData,
  };
}
