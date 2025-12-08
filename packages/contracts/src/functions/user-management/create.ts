import type { Doctor, Employee, Patient, Profile, Schedule } from '../../entities.ts';

type ProfileData = Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>;

type EmployeeData = Omit<Employee, 'id' | 'employeeId'> & {
  schedules: Schedule[];
};

type PatientData = Pick<Patient, 'healthInsuranceName'>;
type DoctorData = Pick<Doctor, 'isResident'>;

export interface CreateUserBody {
  profile: ProfileData;
  organizationIds: string[];
  roleIds?: number[];
  employeeData?: EmployeeData;
  patientData?: PatientData;
  doctorData?: DoctorData;
}

export interface CreateUserResponse {
  message: string;
  userId: string;
}
