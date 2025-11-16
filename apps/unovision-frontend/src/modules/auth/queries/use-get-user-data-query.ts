import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import type { DocumentType, Gender, Role } from '@/client/entities';
import api from '@/services/api';
import type { UserWithOrganizations } from '@/shared/users/types';

export type UseGetUserDataQueryResponse = UseQueryResult<UserWithOrganizations, Error>;

export default function useGetUserDataQuery(userId: string): UseGetUserDataQueryResponse {
  const query = useQuery({
    queryKey: ['get-user-data', userId],
    queryFn: () => api.user.get(userId),
    enabled: !!userId,
    staleTime: Infinity,
    select(data) {
      const organizationsParsed = data.organizations.map((item) => item.organizations);
      const rolesParsed = data.roles.map((item) => item.roles);
      const { organizations: _, roles: __, documentType, gender, ...rest } = data;

      return {
        profile: {
          documentType: documentType as unknown as DocumentType,
          gender: gender as unknown as Gender,
          ...rest,
        },
        organizations: organizationsParsed,
        roles: rolesParsed as Role[],
      };
    },
  });

  return query;
}
