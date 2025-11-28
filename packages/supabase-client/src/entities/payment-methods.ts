import type { PaymentMethodType } from './enums/index.ts';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  name: string;
}
