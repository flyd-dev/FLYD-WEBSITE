'use client';

import { Pause, Play } from 'lucide-react';
import clsx from 'clsx';

/**
 * Pause/start for innhold som beveger seg av seg selv i mer enn fem sekunder
 * (WCAG 2.2.2). Rund flis med Lucide-ikon; Mint på mørk bunn, Flyd-teal på lys.
 */
export default function PauseToggle({
  paused,
  onToggle,
  what,
  tone = 'light',
  className,
}: {
  paused: boolean;
  onToggle: () => void;
  /** Hva som pauses, i bestemt form: «animasjonen», «kundelogoene». */
  what: string;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const Icon = paused ? Play : Pause;
  return (
    <button
      type="button"
      onClick={onToggle}
      onPointerDown={(e) => e.stopPropagation()}
      aria-label={paused ? `Start ${what}` : `Stopp ${what}`}
      title={paused ? `Start ${what}` : `Stopp ${what}`}
      className={clsx(
        'inline-flex h-9 w-9 items-center justify-center rounded-pille border transition-[background-color,color,border-color,transform] duration-200 active:translate-y-[1px]',
        tone === 'dark'
          ? 'on-dark border-flyd-mint/60 bg-flyd-skog/60 text-flyd-mint hover:border-flyd-mint hover:bg-flyd-skog'
          : 'border-flyd-linje-sand bg-flyd-sand text-flyd-teal hover:border-flyd-teal',
        className,
      )}
    >
      <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
