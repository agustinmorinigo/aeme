import type { DeleteUserResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function remove(userId: string) {
  return invokeSupabaseFunction<DeleteUserResponse>(`user-management/${userId}`, {
    method: 'DELETE',
  });
}
