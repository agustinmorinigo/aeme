import ISOMonths from '@/shared/date-time/constants/iso-months';

export default function getIsoMonthLabel(isoMonthNumber: number): string {
  const isoMonth = ISOMonths.find((month) => month.value === isoMonthNumber);
  return isoMonth ? isoMonth.label : '-';
}
