import type { ContractType } from './enums/index.ts';

export interface Employee {
  id: string;
  profileId: string;
  startDate: string;
  exitDate?: string; // VER ESTO BIEN, PQ DEVUELVE NULL EN REALIDAD. ENTONCES, DEBERÍA NO SER OPCIONAL, SINO QUE SER NULLABLE.
  cuil: string;
  contractType: ContractType;
  netSalary: number;
}
