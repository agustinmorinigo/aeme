import type { Employee, Justification, Profile } from '../../entities.ts';

export type GetJustificationByIdRawResponse = Justification & {
  employees: Employee & {
    profiles: Profile;
  };
};

export type GetJustificationByIdResponse = Justification & {
  employee: Employee & {
    profile: Profile;
  };
};
