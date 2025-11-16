import { SSF } from 'xlsx';
import validLibDateTimeFormat from '@/shared/files/csv/constants/valid-lib-date-time-format';

export default function getDateTimeFormatFromDateCell(value: string): string {
  return SSF.format(validLibDateTimeFormat, value);
}
