// supabase/functions/users/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { ApiResponse } from '../_shared/response.ts';
import { createUser } from './handlers/create.ts';
import { deleteUser } from './handlers/delete.ts';
import { getUser, listUsers } from './handlers/get.ts';
import { updateUser } from './handlers/update.ts';

serve(async (req) => {
  // CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'authorization, content-type',
      },
    });
  }

  try {
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const method = req.method;

    // Routing
    // POST /users
    if (method === 'POST' && pathParts.length === 0) {
      return await createUser(req);
    }

    // GET /users (list)
    if (method === 'GET' && pathParts.length === 0) {
      return await listUsers(req);
    }

    // GET /users/:id
    if (method === 'GET' && pathParts.length === 1) {
      return await getUser(req, pathParts[0]);
    }

    // PUT /users/:id
    if (method === 'PUT' && pathParts.length === 1) {
      return await updateUser(req, pathParts[0]);
    }

    // DELETE /users/:id
    if (method === 'DELETE' && pathParts.length === 1) {
      return await deleteUser(req, pathParts[0]);
    }

    return ApiResponse.error('Ruta no encontrada', 404);
  } catch (error) {
    console.error('Error:', error);
    return ApiResponse.error(error.message || 'Error interno del servidor', 500);
  }
});
