import type { AttendanceEntry } from '@/modules/attendance/types/employee-attendance';

export default function hasCorrectOutRecord(dailyRecords: AttendanceEntry[]): boolean {
  return dailyRecords[3] && dailyRecords[3].type === 'out';
}
