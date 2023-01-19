import * as Dialog from '@radix-ui/react-dialog';
import logoHabits from '~/assets/logo-habits.svg';
import { NewHabitForm } from './NewHabitForm';

export const Header = function HeaderComponent() {
  return (
    <div className='mx-auto flex w-full max-w-3xl items-center justify-between'>
      <img
        src={logoHabits}
        alt='image logo habits'
      />

      <Dialog.Root>
        <Dialog.Trigger
          className='hover:(border-violet-300 text-violet-300) flex items-center gap-3 rounded-lg border border-violet-500 px-6 py-4 font-semibold'
          type='button'
        >
          <div className='i-ph-plus-duotone h-5 w-5' />
          <span>Novo hábito</span>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 h-screen w-screen bg-black/80' />
          <Dialog.Content className='absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-zinc-900 p-10'>
            <Dialog.Close className='hover:(text-zinc-400) absolute right-6 top-6 text-zinc-400'>
              <div className='i-ph-x h-6 w-6' />
            </Dialog.Close>
            <Dialog.Title className='text-2xl font-bold leading-tight'>Criar Hábito</Dialog.Title>
            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
