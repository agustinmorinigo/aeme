import type { DeleteJustificationResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function deleteJustification(justificationId: string) {
  return await invokeSupabaseFunction<DeleteJustificationResponse>(`attendance/justifications/${justificationId}`, {
    method: 'DELETE',
  });
}
