import type { GetUserByIdResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function getById(userId: string) {
  return invokeSupabaseFunction<GetUserByIdResponse>(`user-management/${userId}`, {
    method: 'GET',
  });
}
