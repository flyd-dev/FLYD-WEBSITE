import clsx from 'clsx';

type Tone = 'paper' | 'ink' | 'teal' | 'teal-dark' | 'teal-soft';

const tones: Record<Tone, string> = {
  paper: 'bg-flyd-paper text-flyd-ink',
  ink: 'bg-flyd-ink text-flyd-paper',
  teal: 'bg-flyd-teal text-flyd-ink',
  'teal-dark': 'bg-flyd-teal-dark text-flyd-paper',
  'teal-soft': 'bg-[#F2F7F7] text-flyd-ink',
};

export default function Section({
  id,
  tone = 'paper',
  children,
  className,
  size = 'default',
}: {
  id?: string;
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}) {
  const padding =
    size === 'sm' ? 'py-16 md:py-20' : size === 'lg' ? 'py-28 md:py-40' : 'py-20 md:py-28';
  return (
    <section
      id={id}
      className={clsx('relative scroll-mt-24', tones[tone], padding, className)}
    >
      {children}
    </section>
  );
}
