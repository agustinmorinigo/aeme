export const genderValues = ['male', 'female', 'other'] as const;
export type Gender = (typeof genderValues)[number];

export const documentTypeValues = ['dni', 'le', 'lc', 'ci', 'passport', 'other'] as const;
export type DocumentType = (typeof documentTypeValues)[number];

export interface Profile {
  id: string;
  name: string;
  lastName: string;
  searchText: string | null;
  documentType: DocumentType;
  documentValue: string;
  gender: Gender;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
}
