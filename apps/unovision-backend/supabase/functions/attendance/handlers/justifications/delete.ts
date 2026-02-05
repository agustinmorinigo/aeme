import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { ApiError } from '../../../_shared/core/errors.ts';
import { ResponseBuilder } from '../../../_shared/core/response.ts';
import { supabaseAdmin } from '../../../_shared/database/clients.ts';

export async function deleteJustification(justificationId: string) {
  try {
    // 1. Verify that the justification exists before deleting
    const { data: existingJustification, error: fetchError } = await supabaseAdmin
      .from('justifications')
      .select('id')
      .eq('id', justificationId)
      .single();

    if (fetchError || !existingJustification) {
      throw ApiError.notFound(`Justificación no encontrada: ${fetchError?.message || 'ID inválido'}`);
    }

    // 2. Delete justification
    const { error: deleteError } = await supabaseAdmin.from('justifications').delete().eq('id', justificationId);

    if (deleteError) {
      throw ApiError.internal(`Error al eliminar la justificación: ${deleteError.message}`);
    }

    // 3. Successful response
    return ResponseBuilder.success(
      {
        message: 'Justificación eliminada exitosamente',
        justificationId,
      },
      200,
    );
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
