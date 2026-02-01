import type { UpdateJustificationSchema } from '../../schemas/justifications/index.ts';

export type UpdateJustificationBody = UpdateJustificationSchema;

export interface UpdateJustificationResponse {
  message: string;
  justificationId: string;
}
