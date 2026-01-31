import type { QueryParams } from '../../api/index.ts';
import type { Employee, JustificationDay, JustificationType, Profile } from '../../entities.ts';

export interface GetJustificationsParams extends QueryParams {
  offset?: number;
  limit?: number;
  search?: string;
  sortBy?: 'updatedAt' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface JustificationEmployee extends Employee {
  profile: Profile;
}

// ESTO DEBERÍA VENIR DE ENTITIES ENTIENDO, PERO NO ESTOY SEGURO.
export interface JustificationItem {
  id: string;
  employeeId: string;
  type: JustificationType;
  documentLink: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  employee: JustificationEmployee;
  days: JustificationDay[];
}

export type GetJustificationsRawResponse = {
  id: string;
  employeeId: string;
  type: JustificationType;
  documentLink: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  // ESTO DEBE VENIR DE Employee.!!!!!!!!!!!!!!!!!!!!!!
  employees: {
    id: string;
    profileId: string;
    startDate: string;
    exitDate: string | null;
    cuil: string;
    contractType: string;
    netSalary: number;
    profiles: Profile;
  };
  justificationDays: JustificationDay[];
};

export type GetJustificationsResponse = {
  justifications: JustificationItem[];
  count: number;
  hasMore: boolean;
};
