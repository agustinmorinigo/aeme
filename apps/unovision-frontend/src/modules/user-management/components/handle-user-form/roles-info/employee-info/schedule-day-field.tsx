import type { Schedule as ScheduleType } from '@aeme/supabase-client/entities';
import { Checkbox, Input, Label } from '@aeme/ui';

type Schedule = ScheduleType & { isActive: boolean };

interface Props {
  day: { label: string; value: number };
  schedule?: Schedule;
  dayErrors?: { startTime?: { message?: string }; endTime?: { message?: string } };
  onToggle: (weekday: number, checked: boolean) => void;
  onTimeChange: (weekday: number, key: 'startTime' | 'endTime', value: string) => void;
  onRemoteToggle: (weekday: number, checked: boolean) => void;
}

export default function ScheduleDayField({ day, schedule, dayErrors, onToggle, onTimeChange, onRemoteToggle }: Props) {
  const active = schedule?.isActive ?? false;

  return (
    <div>
      <div
        className={`rounded-lg border p-3 ${
          active
            ? 'bg-background border-primary shadow-sm'
            : 'bg-muted text-muted-foreground border-muted hover:border-primary/40'
        }`}
      >
        <div className='flex items-center justify-between gap-3'>
          <div className='flex items-center gap-2 shrink-0'>
            <Checkbox
              id={`weekday-${day.value}`}
              checked={active}
              onCheckedChange={(checked) => onToggle(day.value, checked as boolean)}
            />
            <Label
              htmlFor={`weekday-${day.value}`}
              className={`font-medium min-h-[36px] ${!active ? 'opacity-70' : ''}`}
            >
              {day.label}
            </Label>
          </div>

          {active && schedule && (
            <div className='w-full flex items-center justify-end gap-2'>
              <Input
                type='time'
                step='60'
                value={schedule.startTime}
                onChange={(e) => onTimeChange(day.value, 'startTime', e.target.value)}
                className='w-fit'
              />
              <span className='text-sm'>a</span>
              <Input
                type='time'
                step='60'
                value={schedule.endTime}
                onChange={(e) => onTimeChange(day.value, 'endTime', e.target.value)}
                className='w-fit'
              />
            </div>
          )}
        </div>

        {active && schedule && (
          <div className='flex items-center gap-2 mt-2'>
            <Label htmlFor={`remote-${day.value}`} className='text-xs text-muted-foreground'>
              Remoto
            </Label>
            <Checkbox
              id={`remote-${day.value}`}
              checked={schedule.isRemote}
              onCheckedChange={(checked) => onRemoteToggle(day.value, checked as boolean)}
            />
          </div>
        )}
      </div>

      {dayErrors && (
        <div className='mt-1 text-xs text-destructive'>
          {dayErrors.startTime?.message && <p>{dayErrors.startTime.message}</p>}
          {dayErrors.endTime?.message && <p>{dayErrors.endTime.message}</p>}
        </div>
      )}
    </div>
  );
}
