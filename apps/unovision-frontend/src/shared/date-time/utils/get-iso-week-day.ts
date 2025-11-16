import { getISODay, parseISO } from 'date-fns';

/**
 * Gets the day of the week (1 = Monday, 7 = Sunday)
 * @param dateString - Date in ISO format "YYYY-MM-DD"
 * @returns Day of week (1-7, Monday-Sunday)
 *
 * @example
 * getISOWeekDay('2025-07-25') // 5 (Friday)
 * getISOWeekDay('2025-07-27') // 7 (Sunday)
 * getISOWeekDay('2025-07-28') // 1 (Monday)
 */
export default function getISOWeekDay(dateString: string): number {
  const weekDay = getISODay(parseISO(dateString));
  return weekDay;
}