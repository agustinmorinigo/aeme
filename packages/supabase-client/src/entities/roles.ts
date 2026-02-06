export const roleNameValues = ['admin', 'employee', 'patient', 'doctor', 'accountant'] as const;
export type RoleName = (typeof roleNameValues)[number];

export interface BaseRole {
  description: string | null;
}

export type AdminRole = BaseRole & {
  id: 1;
  name: 'admin';
};

export type EmployeeRole = BaseRole & {
  id: 2;
  name: 'employee';
};

export type PatientRole = BaseRole & {
  id: 3;
  name: 'patient';
};

export type DoctorRole = BaseRole & {
  id: 4;
  name: 'doctor';
};

export type AccountantRole = BaseRole & {
  id: 5;
  name: 'accountant';
};

export type Role = AdminRole | EmployeeRole | PatientRole | DoctorRole | AccountantRole;
