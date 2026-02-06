import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import type { SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import { type CreateOrganizationEventResponse, createOrganizationEventSchema } from '../../_contracts/index.ts';
import { ResponseBuilder } from '../../_shared/core/response.ts';
import type { Database } from '../../_shared/core/types.ts';

export async function createOrganizationEvent(supabase: SupabaseClient<Database>, req: Request): Promise<Response> {
  try {
    // 1. Parse and validate request body
    const body = await req.json();
    const validation = createOrganizationEventSchema.safeParse(body);

    if (!validation.success) {
      return ResponseBuilder.validationError(validation.error);
    }

    const { organizationId, type, startDate, endDate, description } = validation.data;

    // 2. Verify that the organization exists
    const { data: organization, error: orgError } = await supabase
      .from('organizations')
      .select('id')
      .eq('id', organizationId)
      .single();

    if (orgError || !organization) {
      return ResponseBuilder.error('La organizacion especificada no existe');
    }

    // 3. Insert organization event record
    const { data: organizationEvent, error: insertError } = await supabase
      .from('organizationEvents')
      .insert({
        organizationId,
        type,
        startDate,
        endDate: endDate || null,
        description: description || null,
      })
      .select('id')
      .single();

    if (insertError || !organizationEvent) {
      return ResponseBuilder.error(new Error(`Error al crear el evento de organizacion: ${insertError?.message}`));
    }

    // 4. Return success response
    const response: CreateOrganizationEventResponse = {
      message: 'Evento de organizacion creado exitosamente',
      organizationEventId: organizationEvent.id,
    };

    return ResponseBuilder.success(response, 201);
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
