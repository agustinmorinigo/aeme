import { createClient } from '@supabase/supabase-js';

// import type { Database } from './types/database.types';

// CAMBIAR LAS ENVS X LAS LOCALES, ESTÁN APUNTANDO A PROD!!!!!!!
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // Si necesitas diferentes configuraciones para server/client
// export const createSupabaseClient = (url?: string, key?: string) => {
//   return createClient<Database>(url || supabaseUrl, key || supabaseAnonKey);
// };
