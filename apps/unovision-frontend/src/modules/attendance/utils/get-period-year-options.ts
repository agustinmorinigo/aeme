/**
 * Generates an array of year options for use in dropdowns or selectors.
 *
 * Each option is an object containing a `value` (the year as a number)
 * and a `label` (the year as a string).
 *
 * @param startYear - The first year to include in the options.
 * @param endYear - The last year to include in the options.
 * @returns An array of objects representing year options.
 *
 * @example
 * // Returns options for years 2020 to 2022:
 * generateYearOptions(2020, 2022);
 * // [
 * //   { value: 2020, label: "2020" },
 * //   { value: 2021, label: "2021" },
 * //   { value: 2022, label: "2022" }
 * // ]
 */
function generateYearOptions(startYear: number, endYear: number): { value: number; label: string }[] {
  const years: { value: number; label: string }[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({ value: year, label: year.toString() });
  }
  return years;
}

const today = new Date();
const currentYear = today.getFullYear();
const prevYear = currentYear - 1;
const periodYearsOptions = generateYearOptions(prevYear, currentYear).reverse();

export default periodYearsOptions;
