import type { SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import type { Database } from './common.ts';
import { ApiError } from './errors.ts';

export async function requireAuth(supabase: SupabaseClient<Database>) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw ApiError.unauthorized('No estás autenticado');
  }

  return user;
}

// TO DO: Esto se puede hacer con RLS directamente, sin esto... Cambiarlo luego.
export async function requireRole(supabase: SupabaseClient<Database>, roleName: string) {
  const user = await requireAuth(supabase);

  // Verificar que el usuario tenga el rol requerido
  const { data: userRoles, error } = await supabase
    .from('profilesRoles')
    .select('role:roles(name)')
    .eq('profile_id', user.id);
  // .eq('user_id', user.id);

  if (error) {
    throw ApiError.internal('Error al verificar permisos');
  }

  const hasRole = userRoles?.some((ur) => ur.role?.name === roleName);

  if (!hasRole) {
    throw ApiError.forbidden(`Requiere rol: ${roleName}`);
  }

  return user;
}
