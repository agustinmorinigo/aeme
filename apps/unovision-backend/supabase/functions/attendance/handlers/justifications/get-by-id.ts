import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import type { GetJustificationByIdRawResponse, GetJustificationByIdResponse } from '../../../_contracts/index.ts';
import type { ContractType } from '../../../_entities/index.ts';
import { ApiError } from '../../../_shared/core/errors.ts';
import { ResponseBuilder } from '../../../_shared/core/response.ts';
import { supabaseAdmin } from '../../../_shared/database/clients.ts';

export async function getJustificationById(justificationId: string) {
  try {
    // 1. Verify that the justification exists and get full details
    const { data: justificationData, error: fetchError } = await supabaseAdmin
      .from('justifications')
      .select(
        `
          *,
          employees!inner(
            *,
            profiles!inner(*)
          )
        `,
      )
      .eq('id', justificationId)
      .single();

    if (fetchError || !justificationData) {
      throw ApiError.notFound(`Justificación no encontrada: ${fetchError?.message || 'ID inválido'}`);
    }

    // 2. Transform data
    const { employees, ...justificationFields } = justificationData as unknown as GetJustificationByIdRawResponse;

    const transformedData: GetJustificationByIdResponse = {
      ...justificationFields,
      employee: {
        ...employees,
        contractType: employees.contractType as ContractType,
        profile: employees.profiles,
      },
    };

    // 3. Successful response
    return ResponseBuilder.success(transformedData, 200);
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
