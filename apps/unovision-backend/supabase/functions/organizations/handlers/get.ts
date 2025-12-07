import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import type { SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import type { GetOrganizationsResponse } from '../../_contracts/index.ts';
import { ApiError } from '../../_shared/core/errors.ts';
import { ResponseBuilder } from '../../_shared/core/response.ts';
import type { Database } from '../../_shared/core/types.ts';

export async function getOrganizations(supabase: SupabaseClient<Database>) {
  try {
    const { data, error } = await supabase.from('organizations').select('*');

    if (error) {
      throw ApiError.internal(error.message);
    }

    if (!data) {
      return ResponseBuilder.success({ organizations: [] }, 200);
    }

    const result: GetOrganizationsResponse = {
      organizations: data,
    };

    return ResponseBuilder.success(result, 200);
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
