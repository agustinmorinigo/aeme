import type { UpdateUserBody, UpdateUserResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function update(body: UpdateUserBody) {
  return invokeSupabaseFunction<UpdateUserResponse>(`user-management/${body.userId}`, {
    method: 'PUT',
    body,
  });
}
