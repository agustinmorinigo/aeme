import { createClient } from 'jsr:@supabase/supabase-js@2';
import type { Database } from './common.ts';

// For admin operations (bypasses RLS)
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing required environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
}

const supabaseAdmin = createClient<Database>(supabaseUrl, serviceRoleKey);
export { supabaseAdmin };
