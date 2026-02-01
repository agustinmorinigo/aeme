import type { Attendance } from '@/modules/attendance/types/attendance';
import type { AttendanceEntry } from '@/modules/attendance/types/employee-attendance';

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  validatedFilePeriod: {
    monthNumber: number | null;
    yearNumber: number | null;
  };
}

// TO DO: Improve this!
export type AttendancesInfo = Record<string, Attendance[]>;
export type AttendancesInfo2 = Record<string, AttendanceEntry[]>;
