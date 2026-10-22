import Image from 'next/image';
import clsx from 'clsx';
import { Mail, Phone } from 'lucide-react';
import type { TeamMember } from '@/data/team';

/**
 * Ansattkort: Lys mint-kort (radius 16 px) med bildet på en flis (12 px).
 * Ingen merkelapper på bildet (Arnstein 22.10.2026): «Partner» står etter
 * tittelen, og statsautorisert står i tittelen i data/team.ts.
 * `tone="sand"` brukes på Lys mint-bunn.
 */
export default function TeamCard({ m, tone = 'lysmint' }: { m: TeamMember; tone?: 'lysmint' | 'sand' }) {
  const tittel = m.partner ? `${m.role} · Partner` : m.role;
  return (
    <article
      data-reveal
      className={clsx(
        'lys group flex flex-col rounded-kort p-3 pb-6',
        tone === 'sand' ? 'bg-flyd-sand' : 'bg-flyd-lysmint',
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-flis bg-flyd-linje-mint">
        {m.image ? (
          <Image
            src={m.image}
            alt={`${m.name} – ${tittel}`}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-flyd-petrol">
            <span className="font-display text-6xl font-semibold text-flyd-sand">
              {m.initials}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col px-3 pt-5">
        <h3 className="font-display text-[19px] font-semibold leading-tight text-flyd-skog">
          {m.name}
        </h3>
        <p className="mt-1 text-[15px] leading-snug text-flyd-skifer">{tittel}</p>

        <div className="mt-4 flex flex-col gap-2 text-[14px]">
          {m.phone && (
            <a
              href={`tel:${m.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-flyd-skog transition-colors hover:text-flyd-petrol hover:underline hover:decoration-flyd-teal hover:underline-offset-4"
            >
              <Phone className="h-4 w-4 flex-shrink-0 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
              {m.phone}
            </a>
          )}
          <a
            href={`mailto:${m.email}`}
            className="flex items-center gap-2 break-words text-flyd-skog transition-colors hover:text-flyd-petrol hover:underline hover:decoration-flyd-teal hover:underline-offset-4"
          >
            <Mail className="h-4 w-4 flex-shrink-0 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
            {/* Brytes foran «@» når kortet er smalt, ikke midt i ordet. */}
            <span className="min-w-0">
              {m.email.split('@')[0]}
              <wbr />@{m.email.split('@')[1]}
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
