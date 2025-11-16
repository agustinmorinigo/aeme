import type { PaymentMethodType } from '@/client/entities';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  name: string;
}
