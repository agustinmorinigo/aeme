import type { GetEmployeesParams, GetEmployeesResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function get(params: GetEmployeesParams) {
  return invokeSupabaseFunction<GetEmployeesResponse>('attendance/employees', {
    method: 'GET',
    params,
  });
}
