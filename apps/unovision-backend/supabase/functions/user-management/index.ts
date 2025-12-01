import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { requireAuthWithAdmin } from '../_shared/auth.ts';
import { ApiError } from '../_shared/errors.ts';
import { ResponseBuilder } from '../_shared/response.ts';
import { createUser } from './handlers/create.ts';
import { deleteUser } from './handlers/delete.ts';
// import { getUser, listUsers } from './handlers/get.ts';
import { updateUser } from './handlers/update.ts';

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
    // if (method === 'GET' && pathParts.length === 1) {
    //   return await listUsers(req);
    // }

    // GET /users/:id
    // if (method === 'GET' && pathParts.length === 2) {
    //   return await getUser(req, pathParts[1]);
    // }

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
