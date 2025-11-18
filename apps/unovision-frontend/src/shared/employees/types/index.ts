import type { Employee, EmployeeSchedule } from '@/client/entities';

export type Schedule = Omit<EmployeeSchedule, 'id' | 'employeeId'>;

export type EmployeeWithSchedule = Omit<Employee, 'exitDate'> & {
  exitDate: string | null;
  employeeSchedules: EmployeeSchedule[];
};