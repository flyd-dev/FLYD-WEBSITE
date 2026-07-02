import Link from 'next/link';
import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';

type Variant = 'primary' | 'outline' | 'outline-paper' | 'ghost' | 'teal';

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
  accent?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const base =
  'inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] tracking-wide uppercase font-medium transition-[background-color,color,border-color,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-[1px]';

// Subtle teal accent on the trailing arrow only — used on secondary CTAs.
// (Tidligere oransje #E8884C — utenfor offisiell palett, målt 2,61:1 på hvit.)
const accentArrow =
  'hover:[&>svg]:!text-flyd-teal focus-visible:[&>svg]:!text-flyd-teal [&>svg]:transition-colors';

const variants: Record<Variant, string> = {
  primary:
    'bg-flyd-ink text-flyd-paper border border-flyd-ink hover:bg-flyd-teal-dark hover:border-flyd-teal-dark',
  outline:
    'bg-transparent text-flyd-ink border border-flyd-ink hover:bg-flyd-ink hover:text-flyd-paper',
  'outline-paper':
    'bg-transparent text-flyd-paper border border-flyd-paper hover:bg-flyd-paper hover:text-flyd-ink',
  ghost: 'bg-transparent text-flyd-ink hover:text-flyd-teal-dark',
  teal:
    'bg-flyd-teal text-flyd-ink border border-flyd-teal hover:bg-flyd-teal-dark hover:text-flyd-paper hover:border-flyd-teal-dark',
};

export function Button({
  children,
  variant = 'primary',
  className,
  withArrow,
  accent,
  onClick,
  type = 'button',
  disabled,
}: BaseProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-busy={disabled || undefined}
      className={clsx(
        base,
        variants[variant],
        accent && accentArrow,
        'disabled:cursor-not-allowed disabled:opacity-60 disabled:active:translate-y-0',
        className,
      )}
    >
      {children}
      {withArrow && <ArrowUpRight className="h-4 w-4" strokeWidth={2} />}
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  variant = 'primary',
  className,
  withArrow,
  accent,
  external,
  onClick,
}: BaseProps & { href: string; external?: boolean }) {
  if (external) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={clsx(base, variants[variant], accent && accentArrow, className)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        {withArrow && <ArrowUpRight className="h-4 w-4" strokeWidth={2} />}
      </a>
    );
  }
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(base, variants[variant], accent && accentArrow, className)}
    >
      {children}
      {withArrow && <ArrowUpRight className="h-4 w-4" strokeWidth={2} />}
    </Link>
  );
}
