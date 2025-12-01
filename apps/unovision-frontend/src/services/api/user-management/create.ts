import type { CreateUserBody, CreateUserResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function create(body: CreateUserBody) {
  return invokeSupabaseFunction<CreateUserResponse>('user-management', {
    method: 'POST',
    body,
  });
}
