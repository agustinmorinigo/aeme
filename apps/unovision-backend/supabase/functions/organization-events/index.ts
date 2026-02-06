import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { requireAuthOnly } from '../_shared/auth/index.ts';
import { ApiError } from '../_shared/core/errors.ts';
import { ResponseBuilder } from '../_shared/core/response.ts';
import { createOrganizationEvent } from './handlers/create.ts';
import { deleteOrganizationEvent } from './handlers/delete.ts';
import { getOrganizationEvents } from './handlers/get.ts';
import { getOrganizationEventById } from './handlers/get-by-id.ts';
import { updateOrganizationEvent } from './handlers/update.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return ResponseBuilder.cors();
  }

  try {
    const { supabase } = await requireAuthOnly(req);

    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const method = req.method;

    // GET /organization-events
    if (method === 'GET' && pathParts.length === 1) {
      return await getOrganizationEvents(supabase, req);
    }

    // GET /organization-events/:id
    if (method === 'GET' && pathParts.length === 2) {
      return await getOrganizationEventById(pathParts[1]);
    }

    // POST /organization-events
    if (method === 'POST' && pathParts.length === 1) {
      return await createOrganizationEvent(supabase, req);
    }

    // PUT /organization-events/:id
    if (method === 'PUT' && pathParts.length === 2) {
      return await updateOrganizationEvent(req, pathParts[1]);
    }

    // DELETE /organization-events/:id
    if (method === 'DELETE' && pathParts.length === 2) {
      return await deleteOrganizationEvent(pathParts[1]);
    }

    return ResponseBuilder.error(ApiError.notFound('Route'));
  } catch (error) {
    return ResponseBuilder.error(error);
  }
});
