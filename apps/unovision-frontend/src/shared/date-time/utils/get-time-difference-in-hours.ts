import { differenceInMinutes, parseISO } from 'date-fns';

/**
 * Calculates the time difference in hours (with decimals) between two time strings
 * @param startTime - Start time string "HH:mm:ss"
 * @param endTime - End time string "HH:mm:ss"
 * @returns Difference in hours with decimals
 *
 * @example
 * getTimeDifferenceInHours("09:00:00", "18:00:00") // 9
 * getTimeDifferenceInHours("09:00:00", "13:30:00") // 4.5
 * getTimeDifferenceInHours("09:00:00", "09:45:00") // 0.75
 */
const getTimeDifferenceInHours = (startTime: string, endTime: string): number => {
  const start = parseISO(`2000-01-01T${startTime}`);
  const end = parseISO(`2000-01-01T${endTime}`);

  const minutes = differenceInMinutes(end, start);
  return minutes / 60;
};

export default getTimeDifferenceInHours;
