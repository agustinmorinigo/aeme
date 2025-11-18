import { Gender } from '@/client/entities';
import type { Option } from '@/shared/types';

const genders: Option<Gender>[] = [
  { value: Gender.male, label: 'Masculino' },
  { value: Gender.female, label: 'Femenino' },
  { value: Gender.other, label: 'Otro' },
];

export default genders;
