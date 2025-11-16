import { DocumentType } from '@/client/entities';
import type { Option } from '@/shared/types';

const documentTypes: Option<DocumentType>[] = [
  { value: DocumentType.dni, label: 'DNI' },
  { value: DocumentType.le, label: 'LE' },
  { value: DocumentType.lc, label: 'LC' },
  { value: DocumentType.ci, label: 'CI' },
  { value: DocumentType.passport, label: 'Pasaporte' },
  { value: DocumentType.other, label: 'Otro' },
];

export default documentTypes;
