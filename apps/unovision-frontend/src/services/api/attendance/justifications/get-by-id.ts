import type { GetJustificationByIdResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function getById(justificationId: string) {
  return await invokeSupabaseFunction<GetJustificationByIdResponse>(`attendance/justifications/${justificationId}`, {
    method: 'GET',
  });
}
