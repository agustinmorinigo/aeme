// supabase/functions/users/handlers/create.ts
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import { ApiError } from '../../_shared/errors.ts';
import { ResponseBuilder } from '../../_shared/response.ts';
import { supabaseClient } from '../../_shared/supabase-client.ts';

const createUserSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(2, 'Nombre muy corto'),
  age: z.number().min(18).optional(),
});

export async function createUser(req: Request) {
  const body = await req.json();

  // Validación
  const validation = createUserSchema.safeParse(body);
  if (!validation.success) {
    return ResponseBuilder.validationError(validation.error, req);
  }

  const validated = validation.data;
  const supabase = supabaseClient;

  // Check si el email ya existe
  const { data: existing } = await supabase.from('users').select('id').eq('email', validated.email).single();

  if (existing) {
    throw ApiError.conflict('El email ya está registrado');
  }

  // Crear usuario
  const { data, error } = await supabase.from('users').insert(validated).select().single();

  if (error) {
    console.error('DB Error:', error);
    throw ApiError.internal('Error al crear usuario');
  }

  return ResponseBuilder.success(data, 201, req);
}
