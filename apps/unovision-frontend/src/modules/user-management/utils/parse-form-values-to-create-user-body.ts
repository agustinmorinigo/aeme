// import type { CreateUserSchema } from '@aeme/contracts';
import { RoleName } from '@aeme/supabase-client/entities';
import type { HandleUserFormSchema } from '@/modules/user-management/schemas/handle-user-form-schema';
import type { CreateUserBody } from '@/services/api/users/create';
// import { roles } from '@/shared/users/constants/roles';

// function getProfileFromFormValues(formValues: CreateUserSchema): CreateUserBody['profile'] {
//   return formValues.profile;
// }

// function getRoleIdsFromFormValues(formValues: CreateUserSchema): number[] {
//   return formValues.roles
//     .filter((r) => r === RoleName.Admin || r === RoleName.Accountant)
//     .map((roleName) => {
//       const role = roles.find((r) => r.name === roleName);
//       return role ? role.id : -1;
//     })
//     .filter((id) => id !== -1);
// }

// function getEmployeeDataFromFormValues(formValues: CreateUserSchema): CreateUserBody['employeeData'] | undefined {
//   if (!formValues.employeeInfo) return undefined;

//   return {
//     startDate: formValues.employeeInfo.startDate,
//     cuil: formValues.employeeInfo.cuil,
//     contractType: formValues.employeeInfo.contractType as ContractType,
//     netSalary: formValues.employeeInfo.netSalary,
//     schedules: formValues.employeeInfo.schedules
//       .filter((s) => s.isActive)
//       .map((s) => ({
//         weekday: s.weekday,
//         startTime: s.startTime,
//         endTime: s.endTime,
//         isRemote: s.isRemote,
//       })),
//   };
// }

// function getPatientDataFromFormValues(formValues: CreateUserSchema): CreateUserBody['patientData'] | undefined {
//   if (!formValues.patientInfo) return undefined;

//   return {
//     healthInsuranceName: formValues.patientInfo.healthInsuranceName,
//   };
// }

// function getDoctorDataFromFormValues(formValues: CreateUserSchema): CreateUserBody['doctorData'] | undefined {
//   if (!formValues.doctorInfo) return undefined;

//   return {
//     isResident: formValues.doctorInfo.isResident,
//   };
// }

export default function parseFormValuesToCreateUserBody(formValues: HandleUserFormSchema): CreateUserBody {
  return {
    profile: formValues.profile,
    organizationIds: formValues.organizationIds,
    roleIds: formValues.roles
      .filter((role) => role.value === RoleName.Admin || role.value === RoleName.Accountant)
      .map((role) => role.id),
    employeeData: formValues.employeeData,
    patientData: formValues.patientData,
    doctorData: formValues.doctorData,
  };
  // return {
  //   profile: getProfileFromFormValues(formValues),
  //   organizationIds: formValues.organizationIds,
  //   roleIds: getRoleIdsFromFormValues(formValues),
  //   employeeData: getEmployeeDataFromFormValues(formValues),
  //   patientData: getPatientDataFromFormValues(formValues),
  //   doctorData: getDoctorDataFromFormValues(formValues),
  // };
}
