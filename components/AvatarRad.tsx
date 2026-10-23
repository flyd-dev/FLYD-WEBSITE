import Image from 'next/image';
import clsx from 'clsx';
import type { TeamMember } from '@/data/team';

/**
 * Små, overlappende portretter av folkene på et kontor, med «Marit og 3
 * kolleger» ved siden av (fra «Avatar Group» på 21st.dev). Brukt i
 * kontorlisten på /kontor (KontorListe), så den viser folkene og ikke bare huset.
 * Portrettene er pynt; navnet på kontorlederen og antallet står i teksten.
 * Småbildene kommer fra scripts/make-team-thumbs.mjs.
 */
export default function AvatarRad({
  folk,
  maks = 4,
  ring = 'ring-flyd-lysmint',
  tone = 'lys',
  className,
}: {
  folk: TeamMember[];
  maks?: number;
  /** Ringen rundt hvert portrett skal ha samme farge som flaten bak. */
  ring?: string;
  /** Mørk: teksten i Dempet, for bruk på bilde med Skog-overlay. */
  tone?: 'lys' | 'mork';
  className?: string;
}) {
  if (!folk.length) return null;
  const synlige = folk.slice(0, maks);
  const resten = folk.length - synlige.length;
  const [leder] = folk;
  const fornavn = leder.name.split(' ')[0];
  const andre = folk.length - 1;
  const tekst = andre === 0 ? fornavn : `${fornavn} og ${andre} ${andre === 1 ? 'kollega' : 'kolleger'}`;

  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <span aria-hidden="true" className="flex flex-shrink-0 -space-x-2">
        {synlige.map((m) => (
          <span
            key={m.email}
            className={clsx('relative block h-8 w-8 overflow-hidden rounded-full bg-flyd-petrol ring-2', ring)}
          >
            {m.image ? (
              <Image src={m.image.replace('/team/', '/team/sma/')} alt="" fill sizes="32px" className="object-cover object-top" />
            ) : (
              <span className="flex h-full items-center justify-center font-display text-[11px] font-semibold text-flyd-sand">
                {m.initials}
              </span>
            )}
          </span>
        ))}
        {resten > 0 && (
          <span
            className={clsx(
              'relative flex h-8 w-8 items-center justify-center rounded-full bg-flyd-petrol font-display text-[12px] font-semibold text-flyd-sand ring-2',
              ring,
            )}
          >
            +{resten}
          </span>
        )}
      </span>
      <span className={clsx('text-[14px] leading-snug', tone === 'mork' ? 'text-flyd-dempet' : 'text-flyd-skifer')}>{tekst}</span>
    </div>
  );
}
