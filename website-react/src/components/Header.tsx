import logoHabits from '~/assets/logo-habits.svg';

export const Header = function HeaderComponent() {
  return (
    <div className='mx-auto flex w-full max-w-3xl items-center justify-between'>
      <img
        src={logoHabits}
        alt='image logo habits'
      />
      <button
        className='hover:(border-violet-300 text-violet-300) flex items-center gap-3 rounded-lg border border-violet-500 px-6 py-4 font-semibold'
        type='button'
      >
        <div className='i-ph-plus-duotone h-5 w-5' />
        <span>Novo hábito</span>
      </button>
    </div>
  );
};
