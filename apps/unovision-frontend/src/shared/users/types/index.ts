import type { Doctor, DocumentType, Gender, Organization, Patient, Profile, Role } from '@/client/entities';
import type { EmployeeWithSchedule } from '@/shared/employees/types';

export interface User {
  profile: Profile;
  roles: Role[];
}

export interface UserWithOrganizations extends User {
  organizations: Organization[];
}

export interface UserWithDetails {
  profile: {
    id: string;
    name: string;
    lastName: string;
    documentType: DocumentType;
    documentValue: string;
    email: string;
    birthDate: string;
    phone: string;
    address: string;
    doctors?: Doctor;
    patients?: Patient;
    employees?: EmployeeWithSchedule;
    gender: Gender;
  };
  organizations: Organization[];
  roles: Role[];
}