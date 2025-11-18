import type { AttendanceEntry } from '@/modules/attendance/types/employee-attendance';

export default function hasCorrectInRecord(dailyRecords: AttendanceEntry[]): boolean {
  return dailyRecords[0] && dailyRecords[0].type === 'in';
}
