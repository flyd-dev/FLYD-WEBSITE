import { Fragment } from 'react';
import Image from 'next/image';
import { Check, Mail, Phone } from 'lucide-react';
import type { TeamMember } from '@/data/team';

const pill =
  'inline-flex items-center gap-1.5 rounded-pille px-3 py-1.5 text-[11px] font-bold uppercase leading-none tracking-[0.12em]';

/** Lange adresser brytes foran punktum og @, ikke midt i et navn. */
function EmailText({ email }: { email: string }) {
  return (
    <>
      {email.split(/(?=[.@])/).map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <wbr />}
          {part}
        </Fragment>
      ))}
    </>
  );
}

/**
 * Ansattkort: Lys mint-kort (radius 16 px) med bildet på en flis (12 px).
 * Kortene i en rad er like høye: tittelen har alltid plass til to linjer, og
 * telefon og e-post står nederst, så de flukter på tvers av kortene.
 */
export default function TeamCard({ m }: { m: TeamMember }) {
  const certified =
    m.certified || m.revisor || m.role.toLowerCase().includes('statsautorisert');
  return (
    <article data-reveal className="lys group flex h-full flex-col rounded-kort bg-flyd-lysmint p-3 pb-6">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-flis bg-flyd-linje-mint">
        {m.image ? (
          <Image
            src={m.image}
            alt={`${m.name} – ${m.role}`}
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

        {m.partner && (
          <span className={`${pill} absolute left-3 top-3 bg-flyd-korall text-flyd-skog`}>
            Partner
          </span>
        )}
        {m.lead && !m.partner && (
          <span className={`${pill} absolute left-3 top-3 bg-flyd-skog text-flyd-sand`}>
            Kontorleder
          </span>
        )}
        {certified && (
          <span className={`${pill} absolute bottom-3 left-3 bg-flyd-sand text-flyd-skog`}>
            <Check className="h-3 w-3 text-flyd-teal" strokeWidth={3} aria-hidden="true" />
            Statsautorisert
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-3 pt-5">
        <h3 className="font-display text-[19px] font-semibold leading-tight text-flyd-skog">
          {m.name}
        </h3>
        <p className="mt-1 text-[15px] sm:min-h-[2.75em] leading-snug text-flyd-skifer">{m.role}</p>

        <div className="mt-auto flex flex-col gap-2 pt-4 text-[14px]">
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
            className="flex items-center gap-2 text-flyd-skog transition-colors hover:text-flyd-petrol hover:underline hover:decoration-flyd-teal hover:underline-offset-4"
          >
            <Mail className="h-4 w-4 flex-shrink-0 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
            <span className="min-w-0 [overflow-wrap:anywhere]">
              <EmailText email={m.email} />
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
