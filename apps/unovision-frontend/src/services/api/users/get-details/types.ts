import type { Doctor, Organization, Patient, Profile, Role } from '@/client/entities';
import type { EmployeeWithSchedule } from '@/shared/employees/types';

export interface GetDetailsParams {
  userId: string;
  needsEmployeeInfo: boolean;
  needsPatientInfo: boolean;
  needsDoctorInfo: boolean;
}

type UserDetailsData = Omit<Profile, 'phone' | 'address'>;

export type GetUserDetailsResponse = UserDetailsData & {
  phone: string;
  address: string;
  organizations: UserDetailsOrganization[];
  roles: UserDetailsRole[];
  doctors?: Doctor;
  patients?: Patient;
  employees?: EmployeeWithSchedule;
};

interface UserDetailsOrganization {
  organizations: Organization;
}

interface UserDetailsRole {
  roles: Role;
}