/**
 * Formats a document number by adding dots every 3 digits from right to left
 * @param docValue - String with the document number (may contain dots or other characters)
 * @returns Formatted string with dots every 3 digits
 *
 * @example
 * formatDoc('42101813') // "42.101.813"
 * formatDoc('1232123') // "1.232.123"
 * formatDoc('1.232.123') // "1.232.123"
 * formatDoc('123') // "123"
 * formatDoc('1234567890') // "1.234.567.890"
 */
export function formatDoc(docValue: string): string {
  const cleanValue = docValue.replace(/\D/g, '');
  if (!cleanValue) return '';
  return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}