import type { JustificationType } from './enums/index.ts';

export interface JustificationDay {
  id: string;
  justificationId: string;
  date: string;
}

export interface Justification {
  id: string;
  employeeId: string;
  type: JustificationType;
  documentLink: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface JustificationWithDays extends Justification {
  days: JustificationDay[];
}
