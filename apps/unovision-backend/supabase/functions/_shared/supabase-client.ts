import { createClient } from 'jsr:@supabase/supabase-js@2';
import type { Database } from './common.ts';

// For user-facing operations (respects RLS)
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required environment variables: SUPABASE_URL and SUPABASE_ANON_KEY');
}

const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
export { supabaseClient };
