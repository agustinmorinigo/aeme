export const contractTypeValues = ['singleTax', 'dependent'] as const;
export type ContractType = (typeof contractTypeValues)[number];

export interface Employee {
  id: string;
  profileId: string;
  startDate: string;
  exitDate: string | null;
  cuil: string;
  contractType: ContractType;
  netSalary: number;
}
