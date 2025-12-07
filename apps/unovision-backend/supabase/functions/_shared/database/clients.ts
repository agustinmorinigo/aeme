import type { SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { ApiError } from '../core/errors.ts';
import type { Database } from '../core/types.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing required environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
}

export const supabaseAdmin = createClient<Database>(supabaseUrl, serviceRoleKey);

export function getAuthenticatedClient(authHeader: string): SupabaseClient<Database> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw ApiError.unauthorized('Authorization token required');
  }

  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

  if (!supabaseUrl || !supabaseAnonKey) {
    throw ApiError.internal('Missing required environment variables');
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });
}
