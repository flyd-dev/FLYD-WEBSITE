import clsx from 'clsx';

type Variant = 'teal' | 'ink' | 'paper';

export default function Wordmark({
  variant = 'teal',
  className,
  size = 'md',
}: {
  variant?: Variant;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const color =
    variant === 'teal'
      ? 'text-flyd-teal'
      : variant === 'ink'
      ? 'text-flyd-ink'
      : 'text-flyd-paper';

  const sz =
    size === 'sm'
      ? 'text-2xl'
      : size === 'md'
      ? 'text-[28px]'
      : size === 'lg'
      ? 'text-5xl'
      : 'text-7xl';

  return (
    <span className={clsx('wordmark inline-block select-none', color, sz, className)}>
      flyd<span className="text-inherit">.</span>
    </span>
  );
}
