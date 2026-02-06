import ISOMonths from '@/shared/date-time/constants/iso-months';
import type { MonthName } from '@/shared/date-time/types/months';
import getISOMonth from '@/shared/date-time/utils/get-iso-month';

// TO DO: Add tests and JS DOC.
export default function getISOMonthNumber(monthNameParam: MonthName | 'current'): number {
  if (monthNameParam === 'current') {
    return getISOMonth(new Date());
  }

  const isoMonth = ISOMonths.find((month) => month.name === monthNameParam);

  if (!isoMonth) {
    throw new Error(`Month name "${monthNameParam}" is not valid.`);
  }

  return isoMonth.value;
}
