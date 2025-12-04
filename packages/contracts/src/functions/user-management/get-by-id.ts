import type {
  Doctor,
  EmployeeSchedule,
  Organization,
  Patient,
  Profile,
  Employee as RawEmployee,
  Role,
} from '../../entities.ts';

interface Employee extends Omit<RawEmployee, 'exitDate'> {
  exitDate: string | null;
  employeeSchedules: EmployeeSchedule[];
}

export type GetUserByIdRawResponse = Profile & {
  organizations: { organizations: Organization }[];
  roles: { roles: Role }[];
  employees?: Employee;
  doctors?: Doctor;
  patients?: Patient;
};

export type GetUserByIdResponse = {
  profile: Profile;
  organizations: Organization[];
  roles: Role[];
  employees?: Employee;
  doctors?: Doctor;
  patients?: Patient;
};
