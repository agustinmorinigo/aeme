import supabase from '@/client';
import type { Pagination } from '@/shared/api/types';

export async function getAllWithPagination(pagination: Pagination) {
  const { offset, limit } = pagination;
  const from = offset;
  const to = offset + limit - 1;
  
  const { data, error, count } = await supabase
    .from('profiles')
    .select(
      `
        *,
        roles:profilesRoles!profileId(roles(*))
      `,
      { count: 'exact' },
    )
    .neq('email', 'agustinmorinigo1999@gmail.com') // 👈 SACAR ESTO CON SQL.
    .range(from, to);

  if (error) throw error;
  
  return {
    data,
    count,
    hasMore: pagination.offset + pagination.limit < (count || 0),
  };
}