import type { Profile, Role } from '../../entities.ts';

export type QueryParams = Record<string, string | number | boolean | undefined | null>;
// Hacer q si no pasan offset y/o limit, nose cómo sería, q mande TODOS los resultados. Este debería ser el estándar.
// Esto debería ir en contracts, es algo muy común.
export interface GetUsersParams extends QueryParams {
  // CAMBIAR ESTO POR ALGO MÁS GENÉRICO. LUEGO CAMBIAR LOS IMPORTS.
  // Acá agregar filtro de role capaz, ver cómo sería.
  offset?: number;
  limit?: number;
  search?: string;
}

// AGREGAR TYPES DE CONTRACTS.
export type GetUsersRawResponse = Profile & {
  roles: { roles: Role }[];
};

interface User {
  profile: Profile; // ESTO SACARLO, Q QUEDE IGUAL Q EL RAWRESPONSE.
  roles: Role[];
}

export type GetUsersResponse = {
  users: User[];
  count: number;
  hasMore: boolean;
};
