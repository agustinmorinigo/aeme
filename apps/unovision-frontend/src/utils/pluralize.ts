/**
 * Pluralizes a word based on a count
 * @param count - Number to determine singular/plural
 * @param singular - Singular form of the word
 * @param plural - Plural form of the word (optional, defaults to adding 's')
 * @returns The word in singular or plural according to the count
 *
 * @example
 * pluralize(1, 'day') // "day"
 * pluralize(2, 'day', 'days') // "days"
 * pluralize(0, 'file', 'files') // "files"
 * pluralize(1, 'user', 'users') // "user"
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : plural || `${singular}s`;
}