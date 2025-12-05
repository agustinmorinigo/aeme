import type { SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import type { Database } from './common.ts';
import { ApiError } from './errors.ts';

export async function requireAuth(supabase: SupabaseClient<Database>) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw ApiError.unauthorized('Unauthorized');
  }

  return user;
}

// Helper function to create authenticated supabase client from Authorization header
export function getAuthenticatedClient(authHeader: string): SupabaseClient<Database> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw ApiError.unauthorized('Authorization token required');
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

  if (!supabaseUrl || !supabaseAnonKey) {
    throw ApiError.internal('Missing required environment variables');
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });
}

// TO DO: Esto se puede hacer con RLS directamente, sin esto... Cambiarlo luego.
export async function requireRole(supabase: SupabaseClient<Database>, roleName: string) {
  const user = await requireAuth(supabase);

  // Verificar que el usuario tenga el rol requerido
  // Nota: Usar profileId en lugar de user_id ya que la relación es con profiles, no con auth.users
  const { data: userRoles, error } = await supabase
    .from('profilesRoles')
    .select('role:roles(name)')
    .eq('profileId', user.id);

  if (error) {
    throw ApiError.internal('Error verifying permissions');
  }

  const hasRole = userRoles?.some((ur) => ur.role?.name === roleName);

  if (!hasRole) {
    throw ApiError.forbidden(`Requires role: ${roleName}`);
  }

  return user;
}

// Specific function to require admin role (roleId = 1)
export async function requireAdmin(supabase: SupabaseClient<Database>) {
  const user = await requireAuth(supabase);

  // Verificar que el usuario tenga rol de admin (roleId = 1)
  const { data: adminRole, error } = await supabase
    .from('profilesRoles')
    .select('id')
    .eq('profileId', user.id)
    .eq('roleId', 1)
    .single();

  if (error || !adminRole) {
    throw ApiError.forbidden('Requires admin role');
  }

  return user;
}

// Complete authentication and authorization helper
export async function requireAuthWithRole(authHeader: string, roleName: string) {
  const supabase = getAuthenticatedClient(authHeader);
  return await requireRole(supabase, roleName);
}

// Complete authentication helper - only checks if user is authenticated
export async function requireAuthOnly(req: Request) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader) {
    throw ApiError.unauthorized('Authorization token required');
  }

  const supabase = getAuthenticatedClient(authHeader);
  const user = await requireAuth(supabase);

  return { user, supabase };
}

// Complete authentication and admin authorization helper
export async function requireAuthWithAdmin(req: Request) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader) {
    throw ApiError.unauthorized('Authorization token required');
  }

  const supabase = getAuthenticatedClient(authHeader);
  return await requireAdmin(supabase);
}
