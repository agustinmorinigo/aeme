import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { requireAuthWithAdmin } from '../_shared/auth.ts';
import { ApiError } from '../_shared/errors.ts';
import { ResponseBuilder } from '../_shared/response.ts';
import { getEmployees } from './handlers/employees/get.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return ResponseBuilder.cors();
  }

  try {
    // 1. Verify that the user is authenticated
    await requireAuthWithAdmin(req);

    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const method = req.method;

    // MEJORAR ESTO DE pathParts.
    // Routing
    // GET /attendance/employees (list)
    if (method === 'GET' && pathParts.length === 2 && pathParts[1] === 'employees') {
      return await getEmployees(req);
    }

    // Route not found
    return ResponseBuilder.error(ApiError.notFound('Route'));
  } catch (error) {
    return ResponseBuilder.error(error);
  }
});
