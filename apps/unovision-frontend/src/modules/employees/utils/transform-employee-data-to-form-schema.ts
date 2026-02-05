import type { GetUserByIdResponse } from '@aeme/contracts';
import type { HandleEmployeeFormSchema } from '@/modules/employees/schemas/handle-employee-form-schema';
import { formatTime } from '@/shared/date-time/utils/format-time';

/**
 * Transforms user data from API response to form schema values for employee form.
 */
export default function transformEmployeeDataToFormSchema(userData: GetUserByIdResponse): HandleEmployeeFormSchema {
  const { organizations, profile, employees } = userData;
  const organizationIds = organizations.map((org) => org.id);

  const { name, lastName, email, phone, address, birthDate, documentValue, gender, documentType } = profile;

  const employeeData = employees
    ? {
        startDate: employees.startDate,
        cuil: employees.cuil,
        contractType: employees.contractType,
        netSalary: employees.netSalary,
        schedules: employees.employeeSchedules.map((schedule) => ({
          weekday: schedule.weekday,
          startTime: formatTime(schedule.startTime),
          endTime: formatTime(schedule.endTime),
          isRemote: schedule.isRemote,
          isActive: true,
        })),
      }
    : undefined;

  return {
    profile: {
      name,
      lastName,
      email,
      phone,
      address,
      birthDate,
      documentValue,
      gender,
      documentType,
    },
    organizationIds,
    employeeData: employeeData,
  };
}
