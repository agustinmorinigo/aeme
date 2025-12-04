import { createClient, type FunctionInvokeOptions, isAuthApiError } from '@supabase/supabase-js';
import type { Database } from './types/database.types.ts';

// Function to create Supabase client with provided credentials
function createSupabaseClient(supabaseUrl: string, supabaseAnonKey: string) {
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}

export { isAuthApiError, type FunctionInvokeOptions, createSupabaseClient };
