import type { AttendanceType } from '@/modules/attendance/types/attendance';
import type { AttendancesInfo2 } from '@/modules/attendance/types/basic-report-info';

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
  attendancesInfo: AttendancesInfo2;
}

export type FormattedAttendancesInfo = Record<string, EmployeeAttendanceInfo>;