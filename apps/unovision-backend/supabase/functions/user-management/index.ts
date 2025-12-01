import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { requireAuthWithAdmin } from '../_shared/auth.ts';
import { ApiError } from '../_shared/errors.ts';
import { ResponseBuilder } from '../_shared/response.ts';
import { createUser } from './handlers/create.ts';
import { deleteUser } from './handlers/delete.ts';
import { getUsers } from './handlers/get.ts';
import { getUserById } from './handlers/get-by-id.ts';
import { updateUser } from './handlers/update.ts';

// TO DO: Terminar de hacer todas estas funcs y reemplazarlas en el frontend.
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return ResponseBuilder.cors();
  }

  try {
    // 1. Verify that the user is authenticated and has admin role
    await requireAuthWithAdmin(req);

    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const method = req.method;

    // MEJORAR ESTO DE pathParts.
    // Routing
    // POST /users
    if (method === 'POST' && pathParts.length === 1) {
      return await createUser(req);
    }

    // GET /users (list)
    if (method === 'GET' && pathParts.length === 1) {
      return await getUsers(req);
    }

    // GET /users/:id
    if (method === 'GET' && pathParts.length === 2) {
      return await getUserById(req, pathParts[1]);
    }

    // PUT /users/:id
    if (method === 'PUT' && pathParts.length === 2) {
      return await updateUser(req, pathParts[1]);
    }

    // DELETE /users/:id
    if (method === 'DELETE' && pathParts.length === 2) {
      return await deleteUser(req, pathParts[1]);
    }

    // Route not found
    return ResponseBuilder.error(ApiError.notFound('Route'));
  } catch (error) {
    return ResponseBuilder.error(error);
  }
});
