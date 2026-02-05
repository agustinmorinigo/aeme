import type { UpdateJustificationBody, UpdateJustificationResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function update(body: UpdateJustificationBody) {
  return await invokeSupabaseFunction<UpdateJustificationResponse>(
    `attendance/justifications/${body.justificationId}`,
    {
      method: 'PUT',
      body,
    },
  );
}
