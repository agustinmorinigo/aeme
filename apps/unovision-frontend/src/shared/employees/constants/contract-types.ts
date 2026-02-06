import type { ContractType } from '@aeme/supabase-client/entities';
import type { Option } from '@/shared/types';

const contractTypes: Option<ContractType>[] = [
  { value: 'dependent', label: 'Relación de dependencia' },
  { value: 'singleTax', label: 'Monotributo' },
];

export default contractTypes;
