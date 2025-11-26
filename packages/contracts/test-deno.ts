// Test file to verify Deno workspace functionality
import { doctorInfoSchema, handleUserFormSchema, patientInfoSchema } from './src/mod.ts';

// Example usage to test the schemas work
const testUserData = {
  name: 'Juan',
  lastName: 'Pérez',
  documentType: 'DNI',
  documentValue: '12345678',
  gender: 'M',
  email: 'juan.perez@example.com',
  phone: '1234567890',
  address: 'Calle Falsa 123',
  birthDate: '1990-05-15',
  organizationIds: ['550e8400-e29b-41d4-a716-446655440000'],
  roles: ['employee'],
  employeeInfo: {
    startDate: '2023-01-15',
    cuil: '20123456789',
    contractType: 'full-time',
    netSalary: 50000,
    schedules: [
      {
        weekday: 1,
        startTime: '09:00',
        endTime: '17:00',
        isRemote: false,
        isActive: true,
      },
      {
        weekday: 2,
        startTime: '09:00',
        endTime: '17:00',
        isRemote: false,
        isActive: true,
      },
      {
        weekday: 3,
        startTime: '09:00',
        endTime: '17:00',
        isRemote: false,
        isActive: true,
      },
      {
        weekday: 4,
        startTime: '09:00',
        endTime: '17:00',
        isRemote: false,
        isActive: true,
      },
      {
        weekday: 5,
        startTime: '09:00',
        endTime: '17:00',
        isRemote: false,
        isActive: true,
      },
    ],
  },
};

// Test validation
try {
  const validatedData = handleUserFormSchema.parse(testUserData);
  console.log('✅ Schema validation passed!');
  console.log('Validated data:', JSON.stringify(validatedData, null, 2));

  // Test individual schemas
  if (validatedData.doctorInfo) {
    const doctorData = doctorInfoSchema.parse(validatedData.doctorInfo);
    console.log('✅ Doctor schema validation passed!', doctorData);
  }

  if (validatedData.patientInfo) {
    const patientData = patientInfoSchema.parse(validatedData.patientInfo);
    console.log('✅ Patient schema validation passed!', patientData);
  }
} catch (error) {
  console.error('❌ Schema validation failed:', error);
}

console.log('\n🎉 Deno workspace import working correctly!');
console.log('You can now import schemas from @aeme/contracts in your Deno functions!');
