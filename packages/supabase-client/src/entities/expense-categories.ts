import type { ExpenseCategoryType } from './enums/index.ts';

export interface ExpenseCategory {
  id: string;
  type: ExpenseCategoryType;
  name: string;
}
