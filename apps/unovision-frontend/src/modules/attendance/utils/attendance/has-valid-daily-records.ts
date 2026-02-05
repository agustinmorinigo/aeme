import { isBefore, parse } from 'date-fns';
import type { AttendanceEntry } from '@/modules/attendance/types/employee-attendance';
import hasCorrectBreakInRecord from '@/modules/attendance/utils/attendance/has-correct-break-in-record';
import hasCorrectBreakOutRecord from '@/modules/attendance/utils/attendance/has-correct-break-out-record';
import hasCorrectInRecord from '@/modules/attendance/utils/attendance/has-correct-in-record';
import hasCorrectOutRecord from '@/modules/attendance/utils/attendance/has-correct-out-record';
import isoFormats from '@/shared/date-time/constants/iso-formats';

/**
 * Checks if the provided daily attendance records are valid.
 *
 * A valid daily attendance consists of exactly 4 records, in the following order:
 * 1. 'in'  - Clock-in
 * 2. 'break' - Start of break
 * 3. 'break' - End of break
 * 4. 'out' - Clock-out
 *
 * Additionally, the records must be in chronological order based on their time values.
 *
 * @param dailyRecords - An array of `AttendanceEntry` objects representing the daily attendance records.
 * @returns `true` if the records are valid according to the rules; otherwise, `false`.
 *
 * @example
 * ```typescript
 * const records = [
 *   { type: 'in', time: '08:00:00' },
 *   { type: 'break', time: '12:00:00' },
 *   { type: 'break', time: '12:30:00' },
 *   { type: 'out', time: '17:00:00' }
 * ];
 * const isValid = hasValidDailyRecords(records); // true
 * ```
 *
 * @example
 * ```typescript
 * const invalidRecords = [
 *   { type: 'in', time: '08:00:00' },
 *   { type: 'break', time: '12:00:00' },
 *   { type: 'out', time: '17:00:00' }
 * ];
 * const isValid = hasValidDailyRecords(invalidRecords); // false (only 3 records)
 * ```
 */
export default function hasValidDailyRecords(dailyRecords: AttendanceEntry[]): boolean {
  const has4Records = dailyRecords.length === 4;

  if (!has4Records) return false;

  const hasRequiredRecordsInOrder =
    hasCorrectInRecord(dailyRecords) &&
    hasCorrectBreakInRecord(dailyRecords) &&
    hasCorrectBreakOutRecord(dailyRecords) &&
    hasCorrectOutRecord(dailyRecords);

  if (!hasRequiredRecordsInOrder) return false;

  const format = isoFormats.times.fullTime;
  const [r1, r2, r3, r4] = dailyRecords.map((r) => parse(r.time, format, new Date()));
  const hasTimesInChronologicalOrder = isBefore(r1, r2) && isBefore(r2, r3) && isBefore(r3, r4);

  if (!hasTimesInChronologicalOrder) return false;

  const isValidDailyAttendance = has4Records && hasRequiredRecordsInOrder && hasTimesInChronologicalOrder;
  return isValidDailyAttendance;
}
