export const NewHabitForm = function NewHabitFormComponent() {
  return (
    <form className='mt-6 flex w-full flex-col'>
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
      />

      <label
        htmlFor=''
        className='mt-4 font-semibold leading-tight'
      >
        Qual a recorrência?
      </label>
      <button
        type='submit'
        className='hover:(bg-green-500) mt-6 flex items-center justify-center gap-3 rounded-lg bg-green-600 p-4 font-semibold'
      >
        <div className='i-ph-check h-6 w-6 ' />
        Confirmar
      </button>
    </form>
  );
};
