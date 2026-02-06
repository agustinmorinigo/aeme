import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { updateOrganizationEventSchema } from '../../_contracts/index.ts';
import { ApiError } from '../../_shared/core/errors.ts';
import { ResponseBuilder } from '../../_shared/core/response.ts';
import { supabaseAdmin } from '../../_shared/database/clients.ts';

export async function updateOrganizationEvent(req: Request, organizationEventId: string) {
  try {
    // 1. Parse and validate request body
    const body = await req.json();

    // Add organizationEventId to body for validation
    const bodyWithId = { ...body, organizationEventId };
    const validation = updateOrganizationEventSchema.safeParse(bodyWithId);

    if (!validation.success) {
      return ResponseBuilder.validationError(validation.error);
    }

    const { startDate, endDate, type, description } = validation.data;

    // 2. Verify organization event exists and update it
    const { data: updatedEvent, error: updateError } = await supabaseAdmin
      .from('organizationEvents')
      .update({
        startDate,
        endDate: endDate || null,
        type,
        description: description || null,
      })
      .eq('id', organizationEventId)
      .select('id')
      .single();

    if (updateError || !updatedEvent) {
      if (updateError?.code === 'PGRST116') {
        throw ApiError.notFound('Evento de organizacion no encontrado');
      }
      throw ApiError.internal(`Error al actualizar el evento de organizacion: ${updateError?.message}`);
    }

    // 3. Successful response
    const response = {
      message: 'Evento de organizacion actualizado exitosamente',
      organizationEventId,
    };

    return ResponseBuilder.success(response, 200);
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
