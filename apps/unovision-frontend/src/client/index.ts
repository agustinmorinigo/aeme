import { createSupabaseClient } from '@aeme/supabase-client';

const supabase = createSupabaseClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
export default supabase;
