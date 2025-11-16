import { getYear, isValid } from 'date-fns';
import type { SelectedPeriod } from '@/modules/attendance/types/selected-period';
import getISOMonth from '@/shared/date-time/utils/get-iso-month';
import getDateTimeFormatFromDateCell from '@/shared/files/csv/utils/get-date-time-format-from-date-cell';

// TO DO: Add testing and JSDoc.
export default function isValidDate(
  value: unknown,
  selectedPeriod: SelectedPeriod,
): boolean {
  if (!isValid(value)) return false;

  const dateString = getDateTimeFormatFromDateCell(value as string);
  if (!dateString) return false;

  const date = new Date(dateString);
  const month = getISOMonth(date);
  const year = getYear(date);

  const isSameMonth = month === selectedPeriod.monthNumber;
  const isSameYear = year === selectedPeriod.yearNumber;

  return isSameMonth && isSameYear;
}