import { type DateArg, getMonth } from 'date-fns';

/**
 * Returns the ISO month number (1-12) for the given date.
 *
 * This function wraps the `getMonth` function from `date-fns`, which returns a zero-based month index (0 for January, 11 for December).
 * By adding 1, it converts the result to the ISO standard, where January is 1 and December is 12.
 *
 * @param date - The date to extract the ISO month from.
 * @returns The ISO month number (1-12).
 *
 * @example
 * ```typescript
 * import getISOMonth from '@/shared/date-time/utils/get-iso-month';
 *
 * const date = new Date('2024-06-15');
 * const isoMonth = getISOMonth(date); // Returns 6
 * ```
 */
export default function getISOMonth(date: DateArg<Date> & {}) {
  return getMonth(date) + 1;
}
