import type { Attendance, AttendanceType } from '@/modules/attendance/types/attendance';
import type { FileRow } from '@/shared/files/csv/types';
import getDateTimeFormatFromDateCell from '@/shared/files/csv/utils/get-date-time-format-from-date-cell';

// TO DO: Add testing and JSDoc.
export default function transformToAttendanceInfo(row: FileRow): Attendance {
  return {
    timestamp: getDateTimeFormatFromDateCell(row['Fecha/Hora'] as string),
    fullName: (row.Nombre as string).trim(),
    type: (row['Tipo de registro'] as string).toLowerCase() as AttendanceType,
    documentValue: String(row['Usuario Nro.']).trim(),
  };
}