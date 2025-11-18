export type AttendanceType = 'in' | 'break' | 'out';

export interface Attendance {
  timestamp: string;
  fullName: string;
  type: AttendanceType;
  documentValue: string;
}