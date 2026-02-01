import type { JustificationType } from './enums/index.ts';

export interface Justification {
  id: string;
  employeeId: string;
  organizationId: string;
  startDate: string; // ISO date string (YYYY-MM-DD)
  endDate: string | null; // ISO date string (YYYY-MM-DD) - null for single-day justifications
  type: JustificationType;
  documentLink: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}
