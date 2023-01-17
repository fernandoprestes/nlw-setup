interface HabitProps {
  completed: number;
}

export const Habit = function HabitComponent({ completed }: HabitProps) {
  return <div className='h-10 w-10 rounded border border-zinc-400 bg-zinc-900 text-white'></div>;
};
