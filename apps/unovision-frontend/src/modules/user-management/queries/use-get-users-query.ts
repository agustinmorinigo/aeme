import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import type { DocumentType, Gender, Role } from '@/client/entities';
import api from '@/services/api';
import type { Pagination } from '@/shared/api/types';
import type { User } from '@/shared/users/types';

export type UseGetUsersQueryResponse = UseQueryResult<User, Error>;

export default function useGetUsersQuery(pagination: Pagination) {
  const { offset, limit } = pagination;
  
  const query = useQuery({
    queryKey: ['get-users', offset, limit],
    queryFn: () => api.user.getAllWithPagination({ offset, limit }),
    select(data) {
      const { data: usersData, count, hasMore } = data;

      const formattedData = usersData.map((item) => {
        const rolesParsed = item.roles.map((role) => role.roles);
        const { roles: __, documentType, gender, ...rest } = item;
        return {
          profile: {
            documentType: documentType as unknown as DocumentType,
            gender: gender as unknown as Gender,
            ...rest,
          },
          roles: rolesParsed as Role[],
        };
      });
      
      return {
        data: formattedData,
        count,
        hasMore,
      };
    },
  })

  return query;
}
