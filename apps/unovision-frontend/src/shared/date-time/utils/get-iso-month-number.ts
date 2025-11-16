import ISOMonths from '@/shared/date-time/constants/iso-months';
import type { MonthName } from '@/shared/date-time/types/months';
import getISOMonth from '@/shared/date-time/utils/get-iso-month';

// TO DO: Add tests and JS DOC.
export default function getISOMonthNumber(monthName: MonthName | 'current'): number {

  if (monthName === 'current') {
    return getISOMonth(new Date());
  }
  
  const isoMonth = ISOMonths.find((month) => month.name === monthName);

  if (!isoMonth) {
    throw new Error(`Month name "${monthName}" is not valid.`);
  }

  return isoMonth.value;
}
