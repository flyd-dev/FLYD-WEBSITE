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
  // Teksten holdes i sort/hvit (AA-kontrast på 12px) – teal-aksenten
  // ligger i streken foran, ikke i selve teksten.
  const color =
    tone === 'paper'
      ? 'text-flyd-paper/80 before:bg-flyd-teal'
      : tone === 'teal'
      ? 'text-flyd-ink/80 before:bg-flyd-teal-dark'
      : 'text-flyd-ink/80 before:bg-flyd-teal-dark';

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
