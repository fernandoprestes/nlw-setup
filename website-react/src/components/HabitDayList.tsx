import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { api } from '~/lib/axios';

interface HabitsListProps {
  date: Date;
  onCompletedChange: (completed: number) => void;
}

interface HabitsInfo {
  possibleHabits: { id: string; title: string; created_at: string }[] | undefined;
  completedHabits: string[];
}

export const HabitDayList = function HabitDayListComponent({ date, onCompletedChange }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  const isDateInPast = dayjs(date).endOf('days').isBefore(new Date());

  async function handleToggleHabit(habitId: string) {
    const isHabitAlreadyCompleted = habitsInfo?.completedHabits.includes(habitId);
    await api.patch(`habits/${habitId}/toggle`);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo?.completedHabits.filter(id => id !== habitId) || [];
    } else {
      completedHabits = [...(habitsInfo?.completedHabits || []), habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo?.possibleHabits,
      completedHabits,
    });
    onCompletedChange(completedHabits.length);
  }

  useEffect(() => {
    api
      .get('day', {
        params: {
          date: date.toISOString(),
        },
      })
      .then(response => {
        setHabitsInfo(response.data);
      });
  }, []);

  return (
    <div className='mt-6 flex flex-col gap-3'>
      {habitsInfo?.possibleHabits &&
        habitsInfo?.possibleHabits.map(habit => {
          return (
            <Checkbox.Root
              key={habit.id}
              onCheckedChange={() => handleToggleHabit(habit.id)}
              checked={habitsInfo.completedHabits.includes(habit.id)}
              className=' flex items-center gap-3'
              disabled={isDateInPast}
            >
              <div className=' flex h-8 w-8 items-center justify-center rounded-lg border-2 border-zinc-800'>
                <Checkbox.Indicator>
                  <div className='i-ph-check h-5 w-5' />
                </Checkbox.Indicator>
              </div>
              <span className='text-xl font-semibold leading-tight'>{habit.title}</span>
            </Checkbox.Root>
          );
        })}
    </div>
  );
};
