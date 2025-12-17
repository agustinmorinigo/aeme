import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { requireAuthOnly } from '../_shared/auth/index.ts';
import { ApiError } from '../_shared/core/errors.ts';
import { ResponseBuilder } from '../_shared/core/response.ts';
import { getEmployees } from './handlers/employees/get.ts';
import { createJustification } from './handlers/justifications/create.ts';
import { deleteJustification } from './handlers/justifications/delete.ts';
import { getJustifications } from './handlers/justifications/get.ts';
import { getJustificationById } from './handlers/justifications/get-by-id.ts';
import { updateJustification } from './handlers/justifications/update.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return ResponseBuilder.cors();
  }

  try {
    const { supabase } = await requireAuthOnly(req);

    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const method = req.method;

    // GET /attendance/employees
    if (method === 'GET' && pathParts.length === 2 && pathParts[1] === 'employees') {
      return await getEmployees(supabase, req);
    }

    // GET /attendance/justifications
    if (method === 'GET' && pathParts.length === 2 && pathParts[1] === 'justifications') {
      return await getJustifications(req);
    }

    // GET /attendance/justifications/:id
    if (method === 'GET' && pathParts.length === 3 && pathParts[1] === 'justifications') {
      return await getJustificationById(pathParts[2]);
    }

    // POST /attendance/justifications
    if (method === 'POST' && pathParts.length === 2 && pathParts[1] === 'justifications') {
      return await createJustification(req);
    }

    // PUT /attendance/justifications/:id
    if (method === 'PUT' && pathParts.length === 3 && pathParts[1] === 'justifications') {
      return await updateJustification(req, pathParts[2]);
    }

    // DELETE /attendance/justifications/:id
    if (method === 'DELETE' && pathParts.length === 3 && pathParts[1] === 'justifications') {
      return await deleteJustification(pathParts[2]);
    }

    return ResponseBuilder.error(ApiError.notFound('Route'));
  } catch (error) {
    return ResponseBuilder.error(error);
  }
});
