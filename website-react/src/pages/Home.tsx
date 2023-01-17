import { Habit } from '~/components/Habit';

export const Home = function HomePage() {
  return (
    <main>
      <Habit completed={3} />
    </main>
  );
};
