import { createSupabaseClient, type FunctionInvokeOptions } from '@aeme/supabase-client';
import type { ApiErrorResponse, ApiSuccessResponse } from '@/client/types';
import { buildQueryString, type QueryParams } from '@/utils/url';

export const supabase = createSupabaseClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export function isApiError(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === 'object' &&
    error !== null &&
    'success' in error &&
    error.success === false &&
    'error' in error &&
    typeof error.error === 'object' &&
    error.error !== null &&
    'message' in error.error &&
    typeof error.error.message === 'string'
  );
}

interface SupabaseFunctionOptions extends FunctionInvokeOptions {
  params?: QueryParams;
}

export async function invokeSupabaseFunction<TSuccess = unknown>(
  functionName: string,
  options?: SupabaseFunctionOptions,
) {
  const queryString = buildQueryString(options?.params);
  const url = `${functionName}${queryString}`;

  const { data, error } = await supabase.functions.invoke(url, {
    method: options?.method || 'GET',
    body: options?.body,
  });

  if (error) {
    throw error as unknown as ApiErrorResponse;
  }

  return data as unknown as ApiSuccessResponse<TSuccess>;
}
