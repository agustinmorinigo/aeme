import { createClient, isAuthApiError } from '@supabase/supabase-js';
import type { Database } from './types/database.types.ts';

// Function to create Supabase client with provided credentials
export function createSupabaseClient(supabaseUrl: string, supabaseAnonKey: string) {
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}

export { isAuthApiError };
