export default function isValidId(value: unknown): boolean {
  const trimmedValue = String(value).trim();
  const idRegex = /^\d+$/; // Only numbers, no dots, commas, spaces or anything else.
  return idRegex.test(trimmedValue);
}
