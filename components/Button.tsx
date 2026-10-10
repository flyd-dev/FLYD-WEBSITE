import Link from 'next/link';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';

/**
 * Pilleformede knapper etter designmanualen (kap. 09): DM Sans Medium,
 * setningsstil. Primær er fylt, sekundær har kontur. Korall er primær kun på
 * mørk bunn (Skog-tekst på Korall = 6,4:1).
 *
 * - primary          Skog fylt, Sand tekst – lys bunn
 * - secondary        Skog kontur – lys bunn
 * - primary-dark     Korall fylt, Skog tekst – mørk bunn
 * - secondary-dark   Mint kontur, Sand tekst – mørk bunn
 * - on-teal          Skog fylt, Sand tekst – på Flyd-teal (signaturflaten)
 */
type Variant = 'primary' | 'secondary' | 'primary-dark' | 'secondary-dark' | 'on-teal';

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const base =
  'group/knapp inline-flex items-center justify-center gap-2 rounded-pille px-6 py-3 text-[16px] font-medium leading-6 transition-[background-color,color,border-color,transform] duration-200 active:translate-y-[1px]';

const variants: Record<Variant, string> = {
  primary:
    'magnet bg-flyd-skog text-flyd-sand border border-flyd-skog hover:bg-flyd-petrol hover:border-flyd-petrol',
  secondary:
    'bg-transparent text-flyd-skog border border-flyd-skog hover:bg-flyd-skog hover:text-flyd-sand',
  'primary-dark':
    'magnet bg-flyd-korall text-flyd-skog border border-flyd-korall hover:bg-flyd-sand hover:border-flyd-sand',
  'secondary-dark':
    'bg-transparent text-flyd-sand border border-flyd-mint hover:bg-flyd-mint hover:text-flyd-skog',
  'on-teal':
    'bg-flyd-skog text-flyd-sand border border-flyd-skog hover:bg-flyd-sand hover:text-flyd-skog hover:border-flyd-sand',
};

function Arrow() {
  return (
    <ArrowRight
      className="h-4 w-4 transition-transform duration-200 group-hover/knapp:translate-x-0.5"
      strokeWidth={2}
      aria-hidden="true"
    />
  );
}

export function Button({
  children,
  variant = 'primary',
  className,
  withArrow,
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
        'disabled:cursor-not-allowed disabled:opacity-60 disabled:active:translate-y-0',
        className,
      )}
    >
      {children}
      {withArrow && <Arrow />}
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
  onClick,
}: BaseProps & { href: string; external?: boolean }) {
  const cls = clsx(base, variants[variant], className);
  if (external) {
    const newTab = /^https?:/.test(href);
    return (
      <a
        href={href}
        onClick={onClick}
        className={cls}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
        {withArrow && <Arrow />}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={cls}>
      {children}
      {withArrow && <Arrow />}
    </Link>
  );
}

/**
 * Tekstlenke med pil («Utforsk alle tjenester →»). Teksten er Petrol
 * (9,1:1 på Sand) med understrek i Flyd-teal – teal alene er for svak som
 * tekstfarge (3,8:1).
 */
export function TextLink({
  href,
  children,
  className,
  tone = 'light',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <Link
      href={href}
      className={clsx(
        'group/lenke inline text-[16px] font-medium leading-[1.7] underline decoration-2 underline-offset-[6px] transition-colors duration-200',
        tone === 'dark'
          ? 'text-flyd-sand decoration-flyd-mint hover:text-flyd-mint'
          : 'text-flyd-petrol decoration-flyd-teal hover:text-flyd-skog hover:decoration-flyd-skog',
        className,
      )}
    >
      {children}
      {/* Pilen står inline, så den følger siste ord når lenken brytes. */}
      <ArrowRight
        className="ml-1.5 inline-block h-4 w-4 align-[-0.15em] transition-transform duration-200 group-hover/lenke:translate-x-0.5"
        strokeWidth={2}
        aria-hidden="true"
      />
    </Link>
  );
}
