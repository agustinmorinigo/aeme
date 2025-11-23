import { createClient } from 'jsr:@supabase/supabase-js@2';

// For user-facing operations (respects RLS)
// TO DO: ADD SCHEMA HERE FROM "@AEME-SOMETING."
const supabaseClient = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!);
export { supabaseClient };
