interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = function ProgressBarComponent({ progress }: ProgressBarProps) {
  const progressStyles = {
    width: `${progress}%`,
  };
  return (
    <div className='mt-4 h-3 w-full rounded-xl bg-zinc-700'>
      <div
        className='h-3 rounded-xl bg-violet-600'
        role='progressbar'
        aria-label='Progresso dos hábitos completados'
        aria-valuenow={progress}
        style={progressStyles}
      />
    </div>
  );
};
