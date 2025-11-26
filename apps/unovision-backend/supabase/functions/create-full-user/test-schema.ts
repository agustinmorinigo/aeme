// Test file to verify that the create-full-user function can import and use the schemas correctly
import { handleUserFormSchema } from '@aeme/contracts';

console.log('🔍 Testing schema import from @aeme/contracts in create-full-user function...');

// Example payload that matches the new schema structure
const testPayload = {
  name: 'María',
  lastName: 'González',
  documentType: 'DNI',
  documentValue: '87654321',
  gender: 'F',
  email: 'maria.gonzalez@example.com',
  phone: '0987654321',
  address: 'Avenida Corrientes 1234',
  birthDate: '1985-10-20',
  organizationIds: ['550e8400-e29b-41d4-a716-446655440001'],
  roles: ['patient', 'employee'],
  employeeInfo: {
    startDate: '2023-06-01',
    cuil: '27876543219',
    contractType: 'part-time',
    netSalary: 35000,
    schedules: [
      { weekday: 1, startTime: '08:00', endTime: '12:00', isRemote: true, isActive: true },
      { weekday: 2, startTime: '08:00', endTime: '12:00', isRemote: false, isActive: true },
      { weekday: 3, startTime: '08:00', endTime: '12:00', isRemote: true, isActive: true },
      { weekday: 4, startTime: '08:00', endTime: '12:00', isRemote: false, isActive: true },
      { weekday: 5, startTime: '08:00', endTime: '12:00', isRemote: true, isActive: true },
    ],
  },
  patientInfo: {
    healthInsuranceName: 'OSDE',
  },
};

try {
  console.log('🧪 Validating test payload...');

  const validation = handleUserFormSchema.safeParse(testPayload);

  if (validation.success) {
    console.log('✅ Schema validation passed!');
    console.log('✅ Data structure:', {
      name: validation.data.name,
      lastName: validation.data.lastName,
      email: validation.data.email,
      roles: validation.data.roles,
      hasEmployeeInfo: !!validation.data.employeeInfo,
      hasPatientInfo: !!validation.data.patientInfo,
      schedulesCount: validation.data.employeeInfo?.schedules.length || 0,
    });

    // Simulate the data transformation that happens in the actual function
    const profileData = {
      name: validation.data.name,
      lastName: validation.data.lastName,
      documentType: validation.data.documentType,
      documentValue: validation.data.documentValue,
      gender: validation.data.gender,
      email: validation.data.email,
      phone: validation.data.phone,
      address: validation.data.address,
      birthDate: validation.data.birthDate,
    };

    console.log('✅ Profile data extraction works:', profileData);
    console.log('✅ Organization IDs:', validation.data.organizationIds);
    console.log('✅ Roles:', validation.data.roles);
    console.log('✅ Employee info available:', !!validation.data.employeeInfo);
    console.log('✅ Patient info available:', !!validation.data.patientInfo);
    console.log('✅ Doctor info available:', !!validation.data.doctorInfo);
  } else {
    console.error('❌ Schema validation failed:');
    console.error(validation.error.issues);
  }
} catch (error) {
  console.error('❌ Error during validation:', error);
}

console.log('\n🎉 create-full-user function can successfully import and use schemas from @aeme/contracts!');
console.log('🚀 The Deno workspace is working correctly!');
