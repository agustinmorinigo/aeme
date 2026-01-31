import type { GetJustificationsParams, GetJustificationsResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function get(params: GetJustificationsParams) {
  return invokeSupabaseFunction<GetJustificationsResponse>('attendance/justifications', {
    method: 'GET',
    params,
  });
}
