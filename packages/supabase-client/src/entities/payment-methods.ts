export const paymentMethodTypeValues = ['cash', 'bna', 'mp', 'galicia', 'bbva', 'uala', 'brubank'] as const;
export type PaymentMethodType = (typeof paymentMethodTypeValues)[number];

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  name: string;
}
