import clsx from 'clsx';

export default function Eyebrow({
  children,
  className,
  tone = 'ink',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'ink' | 'paper' | 'teal';
}) {
  const color =
    tone === 'paper'
      ? 'text-flyd-paper/70 before:bg-flyd-paper/70'
      : tone === 'teal'
      ? 'text-flyd-teal-dark before:bg-flyd-teal-dark'
      : 'text-flyd-ink/70 before:bg-flyd-ink/70';

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-3 text-[12px] font-medium tracking-[0.22em] uppercase',
        'before:inline-block before:h-[1px] before:w-8 before:content-[""]',
        color,
        className,
      )}
    >
      {children}
    </span>
  );
}
