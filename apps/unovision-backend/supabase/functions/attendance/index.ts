import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { requireAuthOnly } from '../_shared/auth/index.ts';
import { ApiError } from '../_shared/core/errors.ts';
import { ResponseBuilder } from '../_shared/core/response.ts';
import { getEmployees } from './handlers/employees/get.ts';

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

    return ResponseBuilder.error(ApiError.notFound('Route'));
  } catch (error) {
    return ResponseBuilder.error(error);
  }
});
