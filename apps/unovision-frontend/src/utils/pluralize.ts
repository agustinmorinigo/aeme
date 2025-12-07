interface PluralizeParams {
  count: number;
  singular: string;
  plural?: string;
  showCount?: boolean;
}

/**
 * Pluralizes a word based on the specified count.
 *
 * This function generates the correct form (singular or plural) of a word
 * based on a numeric value. It's useful for displaying dynamic messages like
 * "1 día" or "5 días".
 *
 * @param options - Configuration object with the following properties:
 * @param options.count - Numeric quantity that determines whether to use singular (1) or plural (≠1).
 * @param options.singular - The singular form of the word (e.g., "día", "mes", "hora").
 * @param options.plural - (Optional) The plural form of the word. If not provided,
 *                         an "s" is automatically added to the end of the singular form.
 *                         Useful for irregular words like "mes" → "meses".
 * @param options.showCount - (Optional, default: `false`) Determines whether to include
 *                            the number in the result. If `true`, returns '{count} {word}'.
 *
 * @returns String with the pluralized form. Can be:
 *          - With number: "1 día", "0 días", "20 días"
 *          - Without number: "día", "días"
 *
 * @example
 * pluralize({ count: 0, singular: 'día' }) // "días"
 *
 * pluralize({ count: 1, singular: 'día' }) // "día"
 *
 * pluralize({ count: 20, singular: 'día' }) // "días"
 *
 * pluralize({ count: 0, singular: 'día', showCount: true }) // "0 días"
 *
 * pluralize({ count: 1, singular: 'día', showCount: true }) // "1 día"
 *
 * pluralize({ count: 20, singular: 'día', showCount: true }) // "20 días"
 *
 * pluralize({ count: 1, singular: 'mes', plural: 'meses' }) // "mes"
 *
 * pluralize({ count: 3, singular: 'mes', plural: 'meses' }) // "meses"
 *
 * pluralize({ count: 1, singular: 'vez', plural: 'veces', showCount: true }) // "1 vez"
 *
 * pluralize({ count: 10, singular: 'vez', plural: 'veces', showCount: true }) // "10 veces"
 *
 * pluralize({ count: 0, singular: 'producto', showCount: true }) // "0 productos"
 *
 */
export function pluralize(params: PluralizeParams): string {
  const { count, singular, plural, showCount = false } = params;
  const pluralForm = plural || `${singular}s`;
  const word = count === 1 ? singular : pluralForm;
  return showCount ? `${count} ${word}` : word;
}
