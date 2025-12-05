import type { ContractType } from './enums/index.ts';

export interface Employee {
  id: string;
  profileId: string;
  startDate: string;
  exitDate: string | null;
  cuil: string;
  contractType: ContractType;
  netSalary: number;
}
