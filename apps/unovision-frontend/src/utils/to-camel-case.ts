import camelcaseKeys from 'camelcase-keys';

/**
 * Converts the keys of an object (or array of objects) to camelCase.
 *
 * @param data - Object or array of objects with keys in snake_case.
 * @returns A version of the object with keys in camelCase, with inferred typing.
 */
export default function toCamelCase<T>(data: Record<string, unknown> | readonly Record<string, unknown>[]): T {
  return camelcaseKeys(data, { deep: true }) as T;
}
