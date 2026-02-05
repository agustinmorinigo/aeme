import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import type { SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import { type CreateJustificationResponse, createJustificationSchema } from '../../../_contracts/index.ts';
import { ResponseBuilder } from '../../../_shared/core/response.ts';
import type { Database } from '../../../_shared/core/types.ts';

export async function createJustification(supabase: SupabaseClient<Database>, req: Request): Promise<Response> {
  try {
    // 1. Parse and validate request body
    const body = await req.json();
    const validation = createJustificationSchema.safeParse(body);

    if (!validation.success) {
      return ResponseBuilder.validationError(validation.error);
    }

    const { employeeId, organizationId, startDate, endDate, type, description, documentLink } = validation.data;

    // 2. Verify that employee exists and belongs to the specified organization
    const { data: employee, error: employeeError } = await supabase
      .from('employees')
      .select('id, profileId')
      .eq('id', employeeId)
      .single();

    if (employeeError || !employee) {
      return ResponseBuilder.error('El empleado especificado no existe');
    }

    // Verify employee belongs to organization via usersOrganizations
    const { data: userOrg, error: userOrgError } = await supabase
      .from('usersOrganizations')
      .select('organizationId')
      .eq('profileId', employee.profileId)
      .eq('organizationId', organizationId)
      .single();

    if (userOrgError || !userOrg) {
      return ResponseBuilder.error('El empleado no pertenece a la organización especificada');
    }

    // 3. Insert justification record with date range
    const { data: justification, error: justificationError } = await supabase
      .from('justifications')
      .insert({
        employeeId,
        organizationId,
        startDate,
        endDate: endDate || null,
        type,
        documentLink: documentLink || null,
        description: description || null,
      })
      .select('id')
      .single();

    if (justificationError || !justification) {
      return ResponseBuilder.error(new Error(`Error al crear la justificación: ${justificationError?.message}`));
    }

    // 4. Return success response
    const response: CreateJustificationResponse = {
      message: 'Justificación creada exitosamente',
      justificationId: justification.id,
    };

    return ResponseBuilder.success(response, 201);
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
