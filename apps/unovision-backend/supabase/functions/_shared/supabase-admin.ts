import { createClient } from 'jsr:@supabase/supabase-js@2';

// For admin operations (bypasses RLS)
// TO DO: ADD SCHEMA HERE FROM "@AEME-SOMETING."
const supabaseAdmin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
export { supabaseAdmin };
