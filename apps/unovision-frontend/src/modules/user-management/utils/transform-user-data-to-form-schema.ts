import type { HandleUserFormSchema } from '@/modules/user-management/schemas/handle-user-form-schema';
import type { UserWithDetails } from '@/shared/users/types';

export default function transformUserDataToFormSchema(userData: UserWithDetails): HandleUserFormSchema {
  const { roles: userRoles, organizations, profile } = userData;
  const roles = userRoles.map((role) => ({ value: role.name, id: role.id }));
  const organizationIds = organizations.map((org) => org.id);

  const { name, lastName, email, phone, address, birthDate, documentValue, gender, documentType } = profile;

  const employeeData = profile.employees
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
    patientData: profile.patients || undefined,
    doctorData: profile.doctors || { isResident: false },
    employeeData: employeeData,
  };
}
