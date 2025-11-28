import type { ContractType, DocumentType, Gender } from '@aeme/supabase-client/entities';
import supabase from '@/client';
import type { Schedule } from '@/shared/employees/types';

// UNIFICAR ESTAS PROPS CON LAS DEL UPDATE.
// PONER DISABLED TODO EL MODAL CUANDO IS DETAILS.

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

// "profiles".
interface ProfileData {
  name: string;
  lastName: string;
  documentType: DocumentType;
  documentValue: string;
  gender: Gender;
  email: string;
  phone?: string;
  address?: string;
  birthDate: string;
}

// "employees" y "employeeSchedules".
interface EmployeeData {
  startDate: string;
  exitDate?: string;
  cuil: string;
  contractType: ContractType;
  netSalary: number;
  schedules: Schedule[];
}

// "patients".
interface PatientData {
  healthInsuranceName: string;
}

// "doctors".
interface DoctorData {
  isResident: boolean;
}

export async function create(body: CreateUserBody) {
  const { data, error } = await supabase.functions.invoke<CreateUserResponse>('create-full-user', { body });
  if (error) throw error;
  return data;
}
