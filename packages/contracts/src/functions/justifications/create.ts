import type { CreateJustificationSchema } from '../../schemas/justifications/index.ts';

export type CreateJustificationBody = CreateJustificationSchema;

export interface CreateJustificationResponse {
  message: string;
  justificationId: string;
}
