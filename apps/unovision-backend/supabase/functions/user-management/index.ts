import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { requireAuthWithAdmin } from '../_shared/auth/index.ts';
import { ApiError } from '../_shared/core/errors.ts';
import { ResponseBuilder } from '../_shared/core/response.ts';
import { createUser } from './handlers/create.ts';
import { deleteUser } from './handlers/delete.ts';
import { getUsers } from './handlers/get.ts';
import { getUserById } from './handlers/get-by-id.ts';
import { updateUser } from './handlers/update.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return ResponseBuilder.cors();
  }

  try {
    await requireAuthWithAdmin(req);

    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const method = req.method;

    // POST /users
    if (method === 'POST' && pathParts.length === 1) {
      return await createUser(req);
    }

    // GET /users
    if (method === 'GET' && pathParts.length === 1) {
      return await getUsers(req);
    }

    // GET /users/:id
    if (method === 'GET' && pathParts.length === 2) {
      return await getUserById(pathParts[1]);
    }

    // PUT /users/:id
    if (method === 'PUT' && pathParts.length === 2) {
      return await updateUser(req, pathParts[1]);
    }

    // DELETE /users/:id
    if (method === 'DELETE' && pathParts.length === 2) {
      return await deleteUser(pathParts[1]);
    }

    return ResponseBuilder.error(ApiError.notFound('Route'));
  } catch (error) {
    return ResponseBuilder.error(error);
  }
});
