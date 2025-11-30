export enum RoleName {
  Admin = 'admin',
  Employee = 'employee',
  Patient = 'patient',
  Doctor = 'doctor',
  Accountant = 'accountant',
}

export interface BaseRole {
  description: string | null;
}

export type AdminRole = BaseRole & {
  id: 1;
  name: RoleName.Admin;
};

export type EmployeeRole = BaseRole & {
  id: 2;
  name: RoleName.Employee;
};

export type PatientRole = BaseRole & {
  id: 3;
  name: RoleName.Patient;
};

export type DoctorRole = BaseRole & {
  id: 4;
  name: RoleName.Doctor;
};

export type AccountantRole = BaseRole & {
  id: 5;
  name: RoleName.Accountant;
};

export type Role = AdminRole | EmployeeRole | PatientRole | DoctorRole | AccountantRole;
