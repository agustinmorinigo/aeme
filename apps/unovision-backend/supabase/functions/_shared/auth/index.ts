import type { SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import { ApiError } from '../core/errors.ts';
import type { Database } from '../core/types.ts';
import { getAuthenticatedClient } from '../database/clients.ts';

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

export async function requireRole(supabase: SupabaseClient<Database>, roleName: string) {
  const user = await requireAuth(supabase);

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

export async function requireAdmin(supabase: SupabaseClient<Database>) {
  const user = await requireAuth(supabase);

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

export async function requireAuthWithRole(authHeader: string, roleName: string) {
  const supabase = getAuthenticatedClient(authHeader);
  return await requireRole(supabase, roleName);
}

export async function requireAuthOnly(req: Request) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader) {
    throw ApiError.unauthorized('Authorization token required');
  }

  const supabase = getAuthenticatedClient(authHeader);
  const user = await requireAuth(supabase);

  return { user, supabase };
}

export async function requireAuthWithAdmin(req: Request) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader) {
    throw ApiError.unauthorized('Authorization token required');
  }

  const supabase = getAuthenticatedClient(authHeader);
  return await requireAdmin(supabase);
}
