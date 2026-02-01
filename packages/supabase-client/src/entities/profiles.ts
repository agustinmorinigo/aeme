import type { DocumentType, Gender } from './enums/index.ts';

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
