import type { Attendance } from '@/modules/attendance/types/attendance';
import type { SelectedPeriod } from '@/modules/attendance/types/selected-period';
import isValidFileRow from '@/modules/attendance/utils/file/is-valid-file-row';
import transformToAttendanceInfo from '@/modules/attendance/utils/file/transform-to-attendance-info';
import type { FileRow } from '@/shared/files/csv/types';

interface Params {
  fileRows: FileRow[];
  selectedPeriod: SelectedPeriod
}

export default function validateAndTransformFileRows(params: Params): Attendance[] {
  const { fileRows, selectedPeriod } = params;
  const attendances: Attendance[] = [];

  function validateAndTransformRow(fileRow: FileRow) {
    if (!isValidFileRow(fileRow, selectedPeriod)) throw new Error;

    const attendanceInfo: Attendance = transformToAttendanceInfo(fileRow);
    attendances.push(attendanceInfo);
  }

  fileRows.forEach(validateAndTransformRow);
  return attendances;
}