import type { QueryParams } from '../../api/index.ts';
import type { Justification as BaseJustification, Employee, Profile } from '../../entities.ts';

export interface GetJustificationsParams extends QueryParams {
  offset?: number;
  limit?: number;
  search?: string;
  sortBy?: 'updatedAt' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  organizationId?: string;
  monthNumber?: number;
  yearNumber?: number;
}

export interface JustificationEmployee extends Employee {
  profile: Profile;
}

export interface Justification extends BaseJustification {
  employee: JustificationEmployee;
}

export type GetJustificationsRawResponse = BaseJustification & {
  employees: JustificationEmployee;
};

export type GetJustificationsResponse = {
  justifications: Justification[];
  count: number;
  hasMore: boolean;
};
