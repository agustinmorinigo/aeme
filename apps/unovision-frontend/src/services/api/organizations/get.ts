import type { GetOrganizationsResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function get() {
  return invokeSupabaseFunction<GetOrganizationsResponse>('organizations', {
    method: 'GET',
  });
}
