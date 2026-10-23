import Image from 'next/image';
import clsx from 'clsx';
import { Check, Mail, Phone } from 'lucide-react';
import type { TeamMember } from '@/data/team';

/**
 * Deler `role` fra data/team.ts i stilling og godkjenning, så kortet slipper
 * lange linjer med prikker: «Kontorleder · Statsautorisert regnskapsfører»
 * blir «Kontorleder og partner» og en egen linje «Statsautorisert
 * regnskapsfører». Partner står i stillingslinjen, eller alene («Partner»).
 */
function titler(m: TeamMember) {
  const deler = m.role.split(' · ');
  const godkjenning = deler.filter((d) => d.startsWith('Statsautorisert'));
  const stilling = deler.filter((d) => !d.startsWith('Statsautorisert')).join(' · ');
  const medPartner = m.partner ? (stilling ? `${stilling} og partner` : 'Partner') : stilling;
  return { stilling: medPartner, godkjenning };
}

/**
 * Ansattkort: Lys mint-kort (radius 16 px) med bildet på en flis (12 px).
 * Ingen merkelapper på bildet (Arnstein 22.10.2026). Under navnet står
 * stillingen (med «og partner»), og statsautorisasjonen på egen linje med hake.
 * `tone="sand"` brukes på Lys mint-bunn.
 */
export default function TeamCard({ m, tone = 'lysmint' }: { m: TeamMember; tone?: 'lysmint' | 'sand' }) {
  const { stilling, godkjenning } = titler(m);
  const tittel = [stilling, ...godkjenning].filter(Boolean).join(', ');
  return (
    <article
      data-reveal
      className={clsx(
        'lys group flex min-w-0 flex-col rounded-kort p-2 pb-5 sm:p-3 sm:pb-6',
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

      <div className="flex flex-col px-1.5 pt-4 sm:px-3 sm:pt-5">
        <h3 className="font-display text-[16px] font-semibold leading-tight text-flyd-skog sm:text-[19px]">
          {m.name}
        </h3>
        {stilling && <p className="mt-1 text-[14px] leading-snug text-flyd-skifer sm:text-[15px]">{stilling}</p>}
        {godkjenning.map((g) => (
          <p key={g} className="mt-1.5 flex items-start gap-1.5 text-[13px] leading-snug text-flyd-petrol sm:text-[14px]">
            <Check className="mt-[3px] h-3.5 w-3.5 flex-shrink-0 text-flyd-teal" strokeWidth={2.5} aria-hidden="true" />
            {g}
          </p>
        ))}

        <div className="mt-4 flex flex-col gap-2 text-[13px] sm:text-[14px]">
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
