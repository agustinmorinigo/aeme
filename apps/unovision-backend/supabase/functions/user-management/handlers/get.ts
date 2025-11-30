// supabase/functions/users/handlers/get.ts
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import { ApiResponse } from '../../_shared/response.ts';
import { getSupabaseClient } from '../../_shared/supabase.ts';

const listQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  search: z.string().optional(),
});

export async function listUsers(req: Request) {
  const url = new URL(req.url);
  const queryParams = Object.fromEntries(url.searchParams);

  const validation = listQuerySchema.safeParse(queryParams);

  if (!validation.success) {
    return ApiResponse.error('Query params inválidos', 400);
  }

  const { page, limit, search } = validation.data;
  const offset = (page - 1) * limit;

  const supabase = getSupabaseClient();

  let query = supabase
    .from('users')
    .select('*', { count: 'exact' })
    .range(offset, offset + limit - 1);

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    return ApiResponse.error('Error al obtener usuarios', 500);
  }

  return ApiResponse.success({
    users: data,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil((count || 0) / limit),
    },
  });
}

export async function getUser(req: Request, id: string) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();

  if (error || !data) {
    return ApiResponse.error('Usuario no encontrado', 404);
  }

  return ApiResponse.success(data);
}
