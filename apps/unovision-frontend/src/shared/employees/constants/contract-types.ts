import { ContractType } from '@aeme/supabase-client/entities';
import type { Option } from '@/shared/types';

const contractTypes: Option<ContractType>[] = [
  { value: ContractType.dependent, label: 'Relación de dependencia' },
  { value: ContractType.singleTax, label: 'Monotributo' },
];

export default contractTypes;
