export const expenseCategoryTypeValues = [
  'operating',
  'service',
  'supply',
  'miscellaneous',
  'extraordinary',
  'salary',
  'daily',
  'fuel',
  'perception',
  'stationery',
  'cleaning',
  'maintenance',
  'capture',
] as const;
export type ExpenseCategoryType = (typeof expenseCategoryTypeValues)[number];

export interface ExpenseCategory {
  id: string;
  type: ExpenseCategoryType;
  name: string;
}
