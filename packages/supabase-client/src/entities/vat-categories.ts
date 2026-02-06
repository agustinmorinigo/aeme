export const vatCategoryTypeValues = [
  'registeredResponsible',
  'monotax',
  'exempt',
  'notResponsible',
  'finalConsumer',
  'uncategorizedSubject',
  'unregisteredResponsible',
  'subjectToVatWithholding',
  'notSubjectToVat',
  'registeredResponsibleM',
] as const;
export type VatCategoryType = (typeof vatCategoryTypeValues)[number];

export interface VatCategory {
  id: string;
  type: VatCategoryType;
  name: string;
}
