import type { GetUserByIdResponse } from '@aeme/contracts';
import type { HandleUserFormSchema } from '@/modules/user-management/schemas/handle-user-form-schema';

export default function transformUserDataToFormSchema(userData: GetUserByIdResponse): HandleUserFormSchema {
  const { roles: userRoles, organizations, profile, employees, patients, doctors } = userData;
  const roles = userRoles.map((role) => ({ value: role.name, id: role.id }));
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
          startTime: schedule.startTime,
          endTime: schedule.endTime,
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
    roles,
    organizationIds,
    patientData: patients || undefined,
    doctorData: doctors || { isResident: false },
    employeeData: employeeData,
  };
}
