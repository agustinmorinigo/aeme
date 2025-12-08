import type { QueryParams } from '../../api/index.ts';
import type { Profile, Role } from '../../entities.ts';

export interface GetUsersParams extends QueryParams {
  offset?: number;
  limit?: number;
  search?: string;
  sortBy?: 'updatedAt' | 'createdAt' | 'name' | 'lastName' | 'email';
  sortOrder?: 'asc' | 'desc';
}

export type GetUsersRawResponse = Profile & {
  roles: { roles: Role }[];
};

export interface User {
  profile: Profile;
  roles: Role[];
}

export type GetUsersResponse = {
  users: User[];
  count: number;
  hasMore: boolean;
};
