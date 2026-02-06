export const justificationTypeValues = [
  'medical',
  'illness',
  'procedure',
  'education',
  'training',
  'workAccident',
  'bloodDonation',
  'personal',
  'other',
  'vacation',
] as const;
export type JustificationType = (typeof justificationTypeValues)[number];

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
