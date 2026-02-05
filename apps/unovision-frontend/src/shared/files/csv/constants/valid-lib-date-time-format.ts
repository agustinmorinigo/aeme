import isoFormats from '@/shared/date-time/constants/iso-formats';

// Format used by the xlsx library for date cells that have a date and time.
// Example: 2023-10-05T14:30:00
// See more at: https://docs.sheetjs.com/docs/csf/features/dates#date-formats
const validLibDateTimeFormat = `${isoFormats.dates.fullDate}"T"${isoFormats.times.fullTime}`;
export default validLibDateTimeFormat;
