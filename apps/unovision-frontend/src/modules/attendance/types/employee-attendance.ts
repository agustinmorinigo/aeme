import type { AttendanceType } from '@/modules/attendance/types/attendance';

export interface AttendanceEntry {
  time: string;
  type: AttendanceType;
  isOriginal: boolean;
}

export interface EmployeeInfo {
  fullName: string;
  documentValue: string;
}

export interface EmployeeAttendanceInfo {
  employee: EmployeeInfo;
  attendancesInfo: Record<string, AttendanceEntry[]>;
}

export type FormattedAttendancesInfo = Record<string, EmployeeAttendanceInfo>;