import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { ApiError } from '../../_shared/core/errors.ts';
import { ResponseBuilder } from '../../_shared/core/response.ts';
import { supabaseAdmin } from '../../_shared/database/clients.ts';

export async function deleteOrganizationEvent(organizationEventId: string) {
  try {
    // 1. Verify that the organization event exists before deleting
    const { data: existingEvent, error: fetchError } = await supabaseAdmin
      .from('organizationEvents')
      .select('id')
      .eq('id', organizationEventId)
      .single();

    if (fetchError || !existingEvent) {
      throw ApiError.notFound(`Evento de organizacion no encontrado: ${fetchError?.message || 'ID invalido'}`);
    }

    // 2. Delete organization event
    const { error: deleteError } = await supabaseAdmin
      .from('organizationEvents')
      .delete()
      .eq('id', organizationEventId);

    if (deleteError) {
      throw ApiError.internal(`Error al eliminar el evento de organizacion: ${deleteError.message}`);
    }

    // 3. Successful response
    return ResponseBuilder.success(
      {
        message: 'Evento de organizacion eliminado exitosamente',
        organizationEventId,
      },
      200,
    );
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
