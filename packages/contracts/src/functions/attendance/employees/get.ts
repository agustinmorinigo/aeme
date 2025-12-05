import type { QueryParams } from '../../../api/index.ts';
import type { Employee, EmployeeSchedule, Profile } from '../../../entities.ts';

export interface GetEmployeesParams extends QueryParams {
  organizationId: string;
}

export type GetEmployeesRawResponse = Employee & {
  profile: Profile;
  employeeSchedules: EmployeeSchedule[];
};

export interface AttendanceEmployee {
  id: string;
  netSalary: number;
  schedules: EmployeeSchedule[];
  profile: Profile;
}

export type GetEmployeesResponse = {
  employees: AttendanceEmployee[];
};
