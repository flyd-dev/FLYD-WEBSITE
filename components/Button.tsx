import Link from 'next/link';
import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';

type Variant = 'primary' | 'outline' | 'ghost' | 'teal';

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

const base =
  'inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] tracking-wide uppercase font-medium transition-[background-color,color,border-color,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-[1px]';

const variants: Record<Variant, string> = {
  primary:
    'bg-flyd-ink text-flyd-paper border border-flyd-ink hover:bg-flyd-teal-dark hover:border-flyd-teal-dark',
  outline:
    'bg-transparent text-flyd-ink border border-flyd-ink hover:bg-flyd-ink hover:text-flyd-paper',
  ghost: 'bg-transparent text-flyd-ink hover:text-flyd-teal-dark',
  teal:
    'bg-flyd-teal text-flyd-ink border border-flyd-teal hover:bg-flyd-teal-dark hover:text-flyd-paper hover:border-flyd-teal-dark',
};

export function Button({
  children,
  variant = 'primary',
  className,
  withArrow,
  onClick,
  type = 'button',
}: BaseProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(base, variants[variant], className)}
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
  external,
}: BaseProps & { href: string; external?: boolean }) {
  if (external) {
    return (
      <a
        href={href}
        className={clsx(base, variants[variant], className)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        {withArrow && <ArrowUpRight className="h-4 w-4" strokeWidth={2} />}
      </a>
    );
  }
  return (
    <Link href={href} className={clsx(base, variants[variant], className)}>
      {children}
      {withArrow && <ArrowUpRight className="h-4 w-4" strokeWidth={2} />}
    </Link>
  );
}
