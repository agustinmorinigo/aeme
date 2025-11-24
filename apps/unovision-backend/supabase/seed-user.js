const url = 'http://127.0.0.1:54321/functions/v1/create-full-user';

const users = [
  {
    profile: {
      name: 'Agustin',
      lastName: 'Morinigo',
      documentType: 'dni',
      documentValue: '12345678',
      gender: 'male',
      email: 'agustinmorinigo1999@gmail.com',
      phone: '+5491123456789',
      address: 'Buenos Aires',
      birthDate: '1999-01-01',
    },
    organizationIds: [
      'd5728fcf-3642-4935-9918-22912368aa0b',
      '32921ea7-cec7-46ab-a012-a160ae847d8a',
      'd579483f-6f06-4c4e-aae4-b19515d44caa',
    ],
    roleIds: [1, 5],
  },
  {
    profile: {
      name: 'Luz',
      lastName: 'Hergenreder',
      documentType: 'dni',
      documentValue: '16704245',
      gender: 'female',
      email: 'luz.hergenreder@example.com',
      phone: '1142131311',
      address: 'Avenida Corrientes 1234, Buenos Aires',
      birthDate: '1985-03-15',
    },
    organizationIds: [
      'd5728fcf-3642-4935-9918-22912368aa0b',
      '32921ea7-cec7-46ab-a012-a160ae847d8a',
      'd579483f-6f06-4c4e-aae4-b19515d44caa',
    ],
    employeeData: {
      startDate: '2023-01-15',
      cuil: '27167042455',
      contractType: 'singleTax',
      netSalary: 1200000,
      schedules: [
        {
          weekday: 1,
          startTime: '09:00',
          endTime: '18:00',
          isRemote: false,
        },
        {
          weekday: 2,
          startTime: '09:00',
          endTime: '18:00',
          isRemote: false,
        },
        {
          weekday: 3,
          startTime: '09:00',
          endTime: '18:00',
          isRemote: false,
        },
        {
          weekday: 4,
          startTime: '09:00',
          endTime: '18:00',
          isRemote: false,
        },
        {
          weekday: 5,
          startTime: '09:00',
          endTime: '18:00',
          isRemote: false,
        },
      ],
    },
  },
  {
    profile: {
      name: 'Carlos',
      lastName: 'Fernandez',
      documentType: 'dni',
      documentValue: '28345678',
      gender: 'male',
      email: 'carlos.fernandez@example.com',
      phone: '1155667788',
      address: 'Calle San Martin 567, Buenos Aires',
      birthDate: '1990-07-22',
    },
    organizationIds: ['d5728fcf-3642-4935-9918-22912368aa0b', '32921ea7-cec7-46ab-a012-a160ae847d8a'],
    employeeData: {
      startDate: '2022-06-01',
      cuil: '20283456789',
      contractType: 'dependent',
      netSalary: 950000,
      schedules: [
        {
          weekday: 1,
          startTime: '08:00',
          endTime: '17:00',
          isRemote: true,
        },
        {
          weekday: 2,
          startTime: '08:00',
          endTime: '17:00',
          isRemote: false,
        },
        {
          weekday: 3,
          startTime: '08:00',
          endTime: '17:00',
          isRemote: true,
        },
        {
          weekday: 4,
          startTime: '08:00',
          endTime: '17:00',
          isRemote: false,
        },
        {
          weekday: 5,
          startTime: '08:00',
          endTime: '17:00',
          isRemote: true,
        },
      ],
    },
  },
  {
    profile: {
      name: 'Maria',
      lastName: 'Rodriguez',
      documentType: 'dni',
      documentValue: '35678912',
      gender: 'female',
      email: 'maria.rodriguez@example.com',
      phone: '1166778899',
      address: 'Avenida Rivadavia 2890, Buenos Aires',
      birthDate: '1995-11-08',
    },
    organizationIds: ['d579483f-6f06-4c4e-aae4-b19515d44caa'],
    employeeData: {
      startDate: '2024-02-10',
      cuil: '27356789125',
      contractType: 'dependent',
      netSalary: 650000,
      schedules: [
        {
          weekday: 1,
          startTime: '14:00',
          endTime: '20:00',
          isRemote: false,
        },
        {
          weekday: 3,
          startTime: '14:00',
          endTime: '20:00',
          isRemote: false,
        },
        {
          weekday: 5,
          startTime: '14:00',
          endTime: '20:00',
          isRemote: false,
        },
      ],
    },
  },
  {
    profile: {
      name: 'Diego',
      lastName: 'Martinez',
      documentType: 'dni',
      documentValue: '31245789',
      gender: 'male',
      email: 'diego.martinez@example.com',
      phone: '1144556677',
      address: 'Calle Belgrano 1523, Buenos Aires',
      birthDate: '1988-05-30',
    },
    organizationIds: ['d5728fcf-3642-4935-9918-22912368aa0b', 'd579483f-6f06-4c4e-aae4-b19515d44caa'],
    employeeData: {
      startDate: '2021-09-20',
      cuil: '20312457892',
      contractType: 'dependent',
      netSalary: 1450000,
      schedules: [
        {
          weekday: 1,
          startTime: '07:00',
          endTime: '16:00',
          isRemote: false,
        },
        {
          weekday: 2,
          startTime: '07:00',
          endTime: '16:00',
          isRemote: false,
        },
        {
          weekday: 3,
          startTime: '07:00',
          endTime: '16:00',
          isRemote: false,
        },
        {
          weekday: 4,
          startTime: '07:00',
          endTime: '16:00',
          isRemote: false,
        },
        {
          weekday: 5,
          startTime: '07:00',
          endTime: '16:00',
          isRemote: false,
        },
      ],
    },
  },
];

async function createUsers() {
  console.log(`🌱 Creando ${users.length} usuarios de desarrollo...\n`);

  for (const [index, user] of users.entries()) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`✅ Usuario ${index + 1}/${users.length} creado: ${user.profile.email}`);
      } else {
        console.error(`❌ Error creando ${user.profile.email}:`, data);
      }
    } catch (err) {
      console.error(`❌ Error en petición para ${user.profile.email}:`, err.message);
    }
  }

  console.log('\n✅ Proceso completado');
  console.log('🔗 Ver códigos OTP en: http://127.0.0.1:54324');
}

createUsers();

// Para correr este script, usar: "node apps/unovision-backend/supabase/seed-user.js"
