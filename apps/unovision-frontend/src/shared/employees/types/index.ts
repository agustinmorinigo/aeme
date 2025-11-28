import type { Employee, EmployeeSchedule } from '@aeme/supabase-client/entities';

export type Schedule = Omit<EmployeeSchedule, 'id' | 'employeeId'>;

export type EmployeeWithSchedule = Omit<Employee, 'exitDate'> & {
  exitDate: string | null;
  employeeSchedules: EmployeeSchedule[];
};
