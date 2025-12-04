import type { GetUsersParams, GetUsersResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function get(params: GetUsersParams) {
  return invokeSupabaseFunction<GetUsersResponse>('user-management', {
    method: 'GET',
    params,
  });
}
