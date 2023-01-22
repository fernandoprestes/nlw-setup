import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { api } from '~/lib/axios';
import { generateDates } from '~/utils/generate-dates';
import { HabitDay } from './HabitDay';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const summaryDates = generateDates();

const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFull = minimumSummaryDatesSize - summaryDates.length;

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

export const SummaryTable = function SummaryTableComponent() {
  const [summary, setSummary] = useState<Summary>([]);
  useEffect(() => {
    api.get('summary').then(response => {
      setSummary(response.data);
    });
  }, []);

  return (
    <div className='flex w-full overflow-auto pb-6'>
      <div className='grid-row-7 grid grid-flow-row gap-3'>
        {weekDays.map((weekDay, index) => {
          return (
            <div
              key={`${weekDay}-${index}`}
              className='flex h-10 w-10 items-center justify-center text-xl font-bold text-zinc-400'
            >
              {weekDay}
            </div>
          );
        })}
      </div>
      <div className='grid-rows-7 grid grid-flow-col gap-3'>
        {summary.length > 0 &&
          summaryDates.map(date => {
            const dayInSummary = summary.find(day => {
              return dayjs(date).isSame(day.date, 'day');
            });
            return (
              <HabitDay
                key={date.toString()}
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            );
          })}
        {amountOfDaysToFull > 0 &&
          Array.from({ length: amountOfDaysToFull }).map((_, index) => {
            return (
              <div
                key={index}
                className='h-10 w-10 cursor-not-allowed rounded-lg border-2 border-zinc-800 bg-zinc-900 opacity-40'
              />
            );
          })}
      </div>
    </div>
  );
};
