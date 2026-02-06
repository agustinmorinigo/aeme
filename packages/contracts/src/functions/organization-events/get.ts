import type { QueryParams } from '../../api/index.ts';
import type { OrganizationEvent } from '../../entities.ts';

export interface GetOrganizationEventsParams extends QueryParams {
  offset?: number;
  limit?: number;
  sortBy?: 'updatedAt' | 'createdAt' | 'startDate';
  sortOrder?: 'asc' | 'desc';
  organizationId?: string;
  monthNumber?: number;
  yearNumber?: number;
}

export type GetOrganizationEventsResponse = {
  organizationEvents: OrganizationEvent[];
  count: number;
  hasMore: boolean;
};
