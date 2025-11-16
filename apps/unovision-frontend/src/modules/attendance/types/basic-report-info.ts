import type { Attendance } from '@/modules/attendance/types/attendance';

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

export type AttendancesInfo = Record<string, Attendance[]>;