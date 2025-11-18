/**
 * Validates that the headers of a file contain all the expected ones.
 *
 * @param headers - Headers detected in the file (e.g., ["DNI", "Name", "Month"])
 * @param expected - Required headers that are expected (e.g., ["DNI", "Name", "Surname", "Month", "Year"])
 * @returns {{ isValid: boolean; missings: string[] }}
 * An object with:
 *  - `isValid`: true if all expected headers are present
 *  - `missings`: array of missing headers (in their original form, not normalized)
 */
export default function validateHeadersFile(
  headers: string[],
  expected: string[],
): { isValid: boolean; missings: string[] } {
  const normalizedHeaders = headers.map((h) => h.trim().toLowerCase());
  const missings = expected.filter((h) => !normalizedHeaders.includes(h.trim().toLowerCase()));

  return {
    isValid: missings.length === 0,
    missings,
  };
}
