import type { Doctor, Employee, EmployeeSchedule, Patient, Profile } from '../../entities.ts';

type Schedule = Omit<EmployeeSchedule, 'id' | 'employeeId'>;
type ProfileData = Omit<Profile, 'id'>;

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
