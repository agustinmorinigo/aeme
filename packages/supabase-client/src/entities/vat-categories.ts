import type { VatCategoryType } from './enums/index.ts';

export interface VatCategory {
  id: string;
  type: VatCategoryType;
  name: string;
}
