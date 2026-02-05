export interface EmployeeSchedule {
  id: string;
  employeeId: string;
  weekday: number;
  startTime: string;
  endTime: string;
  isRemote: boolean;
}

export type Schedule = Omit<EmployeeSchedule, 'id' | 'employeeId'>;
