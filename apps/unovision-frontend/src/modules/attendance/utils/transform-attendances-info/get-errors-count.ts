import type { FormattedAttendancesInfo } from '@/modules/attendance/types/employee-attendance';
import getInvalidAttendancesCount from '@/modules/attendance/utils/attendance/get-invalid-attendances-count';
import getValidAttendancesCount from '@/modules/attendance/utils/attendance/get-valid-attendances-count';

export const getErrorsCount = (modifiedAttendancesInfo: FormattedAttendancesInfo): number => {
  let count = 0;
  const attendancesInfoValues = Object.values(modifiedAttendancesInfo)

  attendancesInfoValues.forEach(({ attendancesInfo }) => {
    const daysProcessedCount = Object.keys(attendancesInfo).length;
    const validAttendancesCount = getValidAttendancesCount(attendancesInfo);
    const invalidAttendancesCount = getInvalidAttendancesCount(daysProcessedCount, validAttendancesCount);
    count += invalidAttendancesCount;
  });

  return count;
};