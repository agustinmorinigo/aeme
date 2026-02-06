import type { Gender } from '@aeme/supabase-client/entities';
import type { Option } from '@/shared/types';

const genders: Option<Gender>[] = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Femenino' },
  { value: 'other', label: 'Otro' },
];

export default genders;
