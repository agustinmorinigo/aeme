import type { DocumentType, Gender } from '@/client/entities';

export interface Profile {
  id: string;
  name: string;
  lastName: string;
  documentType: DocumentType;
  documentValue: string;
  gender: Gender;
  email: string;
  phone: string | null;
  address: string | null;
  birthDate: string;
}
