import { ContractType } from '@/client/entities';

export const basicSchedule = {
  startTime: '09:00',
  endTime: '18:00',
  isRemote: false,
};

export const initialEmployeeSchedules = [
    {
      weekday: 1,
      ...basicSchedule,
      isActive: true,
    },
    {
      weekday: 2,
      ...basicSchedule,
      isActive: true,
    },
    {
      weekday: 3,
      ...basicSchedule,
      isActive: true,
    },
    {
      weekday: 4,
      ...basicSchedule,
      isActive: true,
    },
    {
      weekday: 5,
      ...basicSchedule,
      isActive: true,
    },
    {
      weekday: 6,
      ...basicSchedule,
      isActive: false,
    },
    {
      weekday: 7,
      ...basicSchedule,
      isActive: false,
    },
  ]

export const initialEmployeeInfo = {
  startDate: '',
  netSalary: NaN,
  cuil: '',
  contractType: ContractType.singleTax,
  schedules: initialEmployeeSchedules,
};