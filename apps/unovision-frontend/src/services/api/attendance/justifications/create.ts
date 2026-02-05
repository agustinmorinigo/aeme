import type { CreateJustificationBody, CreateJustificationResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function create(body: CreateJustificationBody) {
  return await invokeSupabaseFunction<CreateJustificationResponse>('attendance/justifications', {
    method: 'POST',
    body,
  });
}
