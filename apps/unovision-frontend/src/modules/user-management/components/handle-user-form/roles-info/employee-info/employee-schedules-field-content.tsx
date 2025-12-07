import type { Schedule as ScheduleType } from '@aeme/supabase-client/entities';
import type { ControllerRenderProps, FieldErrors } from 'react-hook-form';
import type { HandleUserFormSchema } from '@/modules/user-management/schemas/handle-user-form-schema';
import isoWeekDays from '@/shared/date-time/constants/iso-week-days';
import ScheduleDayField from './schedule-day-field';

type Schedule = ScheduleType & { isActive: boolean };

interface Props {
  field: ControllerRenderProps<HandleUserFormSchema, 'employeeData.schedules'>;
  errors: FieldErrors<HandleUserFormSchema>;
}

export default function EmployeeSchedulesFieldContent({ field, errors }: Props) {
  const handleDayToggle = (weekday: number, checked: boolean) => {
    const newValues = field.value?.map((schedule) => {
      return schedule.weekday === weekday
        ? {
            ...schedule,
            isActive: checked,
          }
        : schedule;
    });

    field.onChange(newValues);
  };

  const handleTimeChange = (weekday: number, key: 'startTime' | 'endTime', value: string) => {
    field.onChange(field.value?.map((s: Schedule) => (s.weekday === weekday ? { ...s, [key]: value } : s)));
  };

  const handleRemoteToggle = (weekday: number, checked: boolean) => {
    field.onChange(field.value?.map((s: Schedule) => (s.weekday === weekday ? { ...s, isRemote: checked } : s)));
  };

  return (
    <div className='flex flex-col gap-3'>
      {isoWeekDays.map((day) => {
        const schedule = field.value?.find((s: Schedule) => s.weekday === day.value);
        const scheduleIndex = field.value?.findIndex((s: Schedule) => s.weekday === day.value);

        const dayErrors =
          scheduleIndex && scheduleIndex >= 0
            ? (errors.employeeData?.schedules?.[scheduleIndex] as {
                startTime?: { message?: string };
                endTime?: { message?: string };
              })
            : undefined;

        return (
          <ScheduleDayField
            key={day.value}
            day={day}
            schedule={schedule}
            dayErrors={dayErrors}
            onToggle={handleDayToggle}
            onTimeChange={handleTimeChange}
            onRemoteToggle={handleRemoteToggle}
          />
        );
      })}
    </div>
  );
}
