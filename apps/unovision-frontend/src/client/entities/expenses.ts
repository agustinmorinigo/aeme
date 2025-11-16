import type { ExpenseStatus } from '@/client/entities';

export interface Expense {
  id: string;
  organizationId: string;
  categoryId: number;
  status: ExpenseStatus;
  title: string;
  description?: string;
  amount: number;
  paymentMethodId?: number;
  datePaid?: string;
  invoiceLink: string;
  paymentReceiptLink?: string;
  expirationDate: string;
  createdBy: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}
