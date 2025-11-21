import type { ExpenseCategoryType } from '@/client/entities';

export interface ExpenseCategory {
  id: string;
  type: ExpenseCategoryType;
  name: string;
}
