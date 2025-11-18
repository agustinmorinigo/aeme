import type { HandleUserFormSchema } from '@/modules/user-management/schemas/handle-user-form-schema';
import type { UserWithDetails } from '@/shared/users/types';

export default function transformUserDataToFormSchema(userData: UserWithDetails): HandleUserFormSchema {

  const { roles: userRoles, organizations, profile } = userData;
  const roles = userRoles.map((role) => role.name);
  const organizationIds = organizations.map((org) => org.id);

  const { name, lastName, email, phone, address, birthDate, documentValue, gender, documentType } = profile;

  const employeeInfo = profile.employees
    ? {
        startDate: profile.employees.startDate,
        cuil: profile.employees.cuil,
        contractType: profile.employees.contractType,
        netSalary: profile.employees.netSalary,
        schedules: profile.employees.employeeSchedules.map((schedule) => ({
          weekday: schedule.weekday,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          isRemote: schedule.isRemote,
          isActive: true,
        })),
      }
    : undefined;

  return {
    name,
    lastName,
    email,
    phone,
    address,
    birthDate,
    documentValue,
    gender,
    documentType,
    roles,
    organizationIds,
    patientInfo: profile.patients || undefined,
    doctorInfo: profile.doctors || { isResident: false },
    employeeInfo: employeeInfo,
  };
}
