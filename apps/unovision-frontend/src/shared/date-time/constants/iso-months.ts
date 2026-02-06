import type { MonthName } from '@/shared/date-time/types/months';

const ISOMonths: { value: number; name: MonthName; label: string }[] = [
  { value: 1, name: 'january', label: 'Enero' },
  { value: 2, name: 'february', label: 'Febrero' },
  { value: 3, name: 'march', label: 'Marzo' },
  { value: 4, name: 'april', label: 'Abril' },
  { value: 5, name: 'may', label: 'Mayo' },
  { value: 6, name: 'june', label: 'Junio' },
  { value: 7, name: 'july', label: 'Julio' },
  { value: 8, name: 'august', label: 'Agosto' },
  { value: 9, name: 'september', label: 'Septiembre' },
  { value: 10, name: 'october', label: 'Octubre' },
  { value: 11, name: 'november', label: 'Noviembre' },
  { value: 12, name: 'december', label: 'Diciembre' },
];

export default ISOMonths;
