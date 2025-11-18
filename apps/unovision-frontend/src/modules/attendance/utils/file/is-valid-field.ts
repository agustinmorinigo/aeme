// TO DO: Add testing and JSDoc.
export default function isValidField(field: unknown): boolean {
  if (typeof field === 'string') {
    return field.trim().length > 0;
  } else if (typeof field === 'number') {
    return !Number.isNaN(field);
  } else {
    return field !== null && field !== undefined;
  }
}