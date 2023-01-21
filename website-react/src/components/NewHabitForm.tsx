import * as Checkbox from '@radix-ui/react-checkbox';
import { FormEvent, useState } from 'react';
import { api } from '~/lib/axios';

const AVALIABLE_WEEK_DAYS = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sabado',
];

export function NewHabitForm() {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) return;

    await api.post('habits', {
      title,
      weekDays,
    });
    setTitle('');
    setWeekDays([]);
    alert('Hábito criado com sucesso!');
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemoved = weekDays.filter(day => day !== weekDay);
      setWeekDays(weekDaysWithRemoved);
    } else {
      setWeekDays(prevState => [...prevState, weekDay]);
    }
  }

  return (
    <form
      onSubmit={createNewHabit}
      className='mt-6 flex w-full flex-col'
    >
      <label
        htmlFor='title'
        className='font-semibold leading-tight'
      >
        Qual seu comprometimento
      </label>
      <input
        autoFocus
        type='text'
        id='title'
        placeholder='Fazer alguma coisa, Fazer outra coisa, etc...'
        className='placeholder:(text-zinc-400) mt-3 rounded-lg bg-zinc-800 p-4 text-white'
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <label
        htmlFor=''
        className='mt-4 font-semibold leading-tight'
      >
        Qual a recorrência?
      </label>

      <div className='mt-3 flex flex-col gap-2'>
        {AVALIABLE_WEEK_DAYS.map((weekDay, index) => (
          <Checkbox.Root
            key={weekDay}
            className='flex items-center gap-3'
            checked={weekDays.includes(index)}
            onCheckedChange={() => handleToggleWeekDay(index)}
          >
            <div className='flex h-8 w-8 items-center justify-center rounded-lg border-2 border-zinc-800'>
              <Checkbox.Indicator>
                <div className='i-ph-check h-5 w-5' />
              </Checkbox.Indicator>
            </div>
            <span className='font-semibold leading-tight'>{weekDay}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type='submit'
        className='hover:(bg-green-500) mt-6 flex items-center justify-center gap-3 rounded-lg bg-green-600 p-4 font-semibold'
      >
        <div className='i-ph-check h-6 w-6 ' />
        Confirmar
      </button>
    </form>
  );
}
