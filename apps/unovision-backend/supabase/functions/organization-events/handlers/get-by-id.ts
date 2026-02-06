import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import type { GetOrganizationEventByIdResponse } from '../../_contracts/index.ts';
import { ApiError } from '../../_shared/core/errors.ts';
import { ResponseBuilder } from '../../_shared/core/response.ts';
import { supabaseAdmin } from '../../_shared/database/clients.ts';

export async function getOrganizationEventById(organizationEventId: string) {
  try {
    // 1. Verify that the organization event exists and get full details
    const { data: eventData, error: fetchError } = await supabaseAdmin
      .from('organizationEvents')
      .select('*')
      .eq('id', organizationEventId)
      .single();

    if (fetchError || !eventData) {
      throw ApiError.notFound(
        `Evento de organizacion no encontrado: ${fetchError?.message || 'ID invalido'}`,
      );
    }

    // 2. Return data
    const response: GetOrganizationEventByIdResponse = eventData;

    // 3. Successful response
    return ResponseBuilder.success(response, 200);
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
