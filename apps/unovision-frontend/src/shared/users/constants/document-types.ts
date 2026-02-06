import type { DocumentType } from '@aeme/supabase-client/entities';
import type { Option } from '@/shared/types';

const documentTypes: Option<DocumentType>[] = [
  { value: 'dni', label: 'DNI' },
  { value: 'le', label: 'LE' },
  { value: 'lc', label: 'LC' },
  { value: 'ci', label: 'CI' },
  { value: 'passport', label: 'Pasaporte' },
  { value: 'other', label: 'Otro' },
];

export default documentTypes;
