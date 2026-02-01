import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { updateJustificationSchema } from '../../../_contracts/index.ts';
import { ApiError } from '../../../_shared/core/errors.ts';
import { ResponseBuilder } from '../../../_shared/core/response.ts';
import { supabaseAdmin } from '../../../_shared/database/clients.ts';

export async function updateJustification(req: Request, justificationId: string) {
  try {
    // 1. Parse and validate request body
    const body = await req.json();

    // Add justificationId to body for validation
    const bodyWithId = { ...body, justificationId };
    const validation = updateJustificationSchema.safeParse(bodyWithId);

    if (!validation.success) {
      return ResponseBuilder.validationError(validation.error);
    }

    const { startDate, endDate, type, description, documentLink } = validation.data;

    // 2. Verify justification exists and update it
    const { data: updatedJustification, error: updateError } = await supabaseAdmin
      .from('justifications')
      .update({
        startDate,
        endDate: endDate || null,
        type,
        description: description || null,
        documentLink: documentLink || null,
      })
      .eq('id', justificationId)
      .select('id')
      .single();

    if (updateError || !updatedJustification) {
      if (updateError?.code === 'PGRST116') {
        throw ApiError.notFound('Justificación no encontrada');
      }
      throw ApiError.internal(`Error al actualizar la justificación: ${updateError?.message}`);
    }

    // 3. Successful response
    const response = {
      message: 'Justificación actualizada exitosamente',
      justificationId,
    };

    return ResponseBuilder.success(response, 200);
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
