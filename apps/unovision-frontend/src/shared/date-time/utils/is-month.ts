import ISOMonths from '@/shared/date-time/constants/iso-months';
import type { MonthName } from '@/shared/date-time/types/months';

// TO DO: Add tests and JS DOC.
export default function isMonth(dateRef: Date | number, monthName: MonthName): boolean {
  const monthNumber = typeof dateRef === 'number' ? dateRef : dateRef.getMonth() + 1;

  if (monthNumber < 1 || monthNumber > 12) {
    return false;
  }

  const correctMonth = ISOMonths.find((month) => month.name === monthName);

  if (!correctMonth) {
    return false;
  }

  return monthNumber === correctMonth.value;
}
