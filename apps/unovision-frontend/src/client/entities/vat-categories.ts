import type { VatCategoryType } from '@/client/entities';

export interface VatCategory {
  id: string;
  type: VatCategoryType;
  name: string;
}
