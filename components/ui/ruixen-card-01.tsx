import { cn } from '@/lib/utils';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export type RuixenCardBadgeVariant = 'teal' | 'ink' | 'teal-dark';
export type RuixenCardTone = 'teal' | 'dark' | 'ink';

export interface RuixenCardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  icon?: LucideIcon;
  tone?: RuixenCardTone;
  badge?: {
    text: string;
    variant: RuixenCardBadgeVariant;
  };
  href?: string;
  className?: string;
}

const badgeColors: Record<RuixenCardBadgeVariant, string> = {
  teal: 'bg-flyd-teal text-flyd-ink',
  'teal-dark': 'bg-flyd-teal-dark text-flyd-paper',
  ink: 'bg-flyd-ink text-flyd-paper',
};

const toneGradients: Record<RuixenCardTone, string> = {
  teal: 'bg-[radial-gradient(120%_90%_at_15%_0%,#B9DAD8_0%,#8BC0BE_38%,#4C8E93_100%)]',
  dark: 'bg-[radial-gradient(120%_90%_at_85%_10%,#8BC0BE_0%,#4C8E93_45%,#1F3639_100%)]',
  ink: 'bg-[radial-gradient(120%_100%_at_20%_0%,#3A6268_0%,#274347_45%,#121C1E_100%)]',
};

const toneAccent: Record<RuixenCardTone, string> = {
  teal: 'bg-[radial-gradient(60%_60%_at_85%_90%,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_60%)]',
  dark: 'bg-[radial-gradient(60%_60%_at_15%_85%,rgba(139,192,190,0.45)_0%,rgba(139,192,190,0)_60%)]',
  ink: 'bg-[radial-gradient(55%_55%_at_80%_10%,rgba(139,192,190,0.4)_0%,rgba(139,192,190,0)_65%)]',
};

const toneIconColor: Record<RuixenCardTone, string> = {
  teal: 'text-flyd-paper/80',
  dark: 'text-flyd-paper/85',
  ink: 'text-flyd-teal/85',
};

const grainSvg =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.45 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.35'/></svg>\")";

export default function RuixenCard({
  title = 'Build Stunning Interfaces',
  subtitle = 'Harness the power of elegant components built for speed and clarity.',
  image,
  imageAlt,
  icon: Icon,
  tone = 'teal',
  badge,
  href = '#',
  className,
}: RuixenCardProps) {
  const useIconMode = !image && Icon;

  return (
    <div className={cn('group flex h-full w-full flex-col', className)}>
      <Link
        href={href}
        className="relative flex h-full flex-col overflow-hidden rounded-[20px] border border-flyd-ink/10 bg-flyd-paper shadow-subtle transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-flyd-teal-dark/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flyd-teal-dark/40 focus-visible:ring-offset-2 focus-visible:ring-offset-flyd-paper"
      >
        {useIconMode ? (
          <div className={cn('relative h-[200px] w-full shrink-0 overflow-hidden', toneGradients[tone])}>
            <div
              className={cn('pointer-events-none absolute inset-0', toneAccent[tone])}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay"
              style={{ backgroundImage: grainSvg, backgroundSize: '160px 160px' }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <Icon
                className={cn(
                  'h-16 w-16 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-[-2deg]',
                  toneIconColor[tone],
                )}
                strokeWidth={1.25}
              />
            </div>
          </div>
        ) : (
          <div className="relative h-[200px] w-full shrink-0">
            <Image
              src={image ?? 'https://placehold.co/600x750'}
              alt={imageAlt ?? title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-flyd-teal-dark/10 mix-blend-multiply"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-flyd-ink/60 via-flyd-ink/10 to-transparent"
              aria-hidden="true"
            />
          </div>
        )}

        {badge ? (
          <div className="absolute top-5 -left-10 rotate-[-45deg] transform">
            <div
              className={cn(
                'px-10 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] shadow-md',
                badgeColors[badge.variant],
              )}
            >
              {badge.text}
            </div>
          </div>
        ) : null}

        <div className="flex flex-1 flex-col gap-1 p-5">
          <h3 className="font-display text-[16px] font-semibold leading-tight text-flyd-ink">
            {title}
          </h3>
          <p className="text-[14px] leading-snug text-flyd-ink/70">
            {subtitle}
          </p>
          <div className="mt-auto flex justify-end pt-3">
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-flyd-teal/15 text-flyd-teal-dark transition-[background-color,transform] duration-300 group-hover:scale-110 group-hover:bg-flyd-teal/30">
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45"
                strokeWidth={1.75}
              />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
