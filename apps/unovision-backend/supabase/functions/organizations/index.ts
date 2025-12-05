import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { requireAuthOnly } from '../_shared/auth.ts';
import { ApiError } from '../_shared/errors.ts';
import { ResponseBuilder } from '../_shared/response.ts';
import { getOrganizations } from './handlers/get.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return ResponseBuilder.cors();
  }

  try {
    // 1. Verify that the user is authenticated (no admin required)
    const { supabase } = await requireAuthOnly(req);

    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const method = req.method;

    // MEJORAR ESTO DE pathParts.
    // Routing
    // GET /organizations (list)
    if (method === 'GET' && pathParts.length === 1) {
      return await getOrganizations(supabase);
    }

    // Route not found
    return ResponseBuilder.error(ApiError.notFound('Route'));
  } catch (error) {
    return ResponseBuilder.error(error);
  }
});
