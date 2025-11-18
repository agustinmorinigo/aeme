import type { ContractType } from '@/client/entities';

export interface Employee {
  id: string;
  profileId: string;
  startDate: string;
  exitDate?: string;
  cuil: string;
  contractType: ContractType;
  netSalary: number;
}
