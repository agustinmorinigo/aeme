import { pluralize } from '@/utils/pluralize';

/**
 * Pluralizes and formats with the included number
 * @param count - Number to display
 * @param singular - Singular form
 * @param plural - Plural form (optional)
 * @returns Formatted string with number and word
 *
 * @example
 * pluralizeWithCount(1, 'day') // "1 day"
 * pluralizeWithCount(5, 'file', 'files') // "5 files"
 * pluralizeWithCount(0, 'user', 'users') // "0 users"
 */
export function pluralizeWithCount(count: number, singular: string, plural?: string): string {
  return `${count} ${pluralize(count, singular, plural)}`;
}