import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import type { TeamMember } from '@/data/team';

export default function TeamCard({ m }: { m: TeamMember }) {
  return (
    <article
      data-reveal
      className="group flex flex-col overflow-hidden rounded-2xl border border-flyd-ink/15 bg-flyd-paper pb-6 transition-colors duration-200 hover:border-flyd-teal-dark/40"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F2F7F7]">
        {m.image ? (
          <Image
            src={m.image}
            alt={`${m.name} – ${m.role}`}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-flyd-teal/25">
            <span className="font-display text-6xl font-semibold tracking-tighter text-flyd-teal-dark">
              {m.initials}
            </span>
          </div>
        )}

        {m.partner && (
          <span className="absolute left-4 top-4 bg-flyd-teal px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-flyd-ink">
            Partner
          </span>
        )}
        {m.lead && !m.partner && (
          <span className="absolute left-4 top-4 bg-flyd-ink px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-flyd-paper">
            Kontorleder
          </span>
        )}
      </div>

      <div className="flex flex-col items-center px-5 pt-5 text-center">
        <h3 className="font-display text-lg font-semibold leading-tight">
          {m.name}
        </h3>
        <p className="mt-1 text-[13px] leading-snug text-flyd-ink/65">
          {m.role}
        </p>

        <div className="mt-4 flex flex-col items-center gap-2 text-[13px]">
          {m.phone && (
            <a
              href={`tel:${m.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-flyd-ink/80 transition-colors hover:text-flyd-teal-dark"
            >
              <Phone className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.75} />
              {m.phone}
            </a>
          )}
          <a
            href={`mailto:${m.email}`}
            className="flex items-center gap-2 break-all text-flyd-ink/80 transition-colors hover:text-flyd-teal-dark"
          >
            <Mail className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.75} />
            {m.email}
          </a>
        </div>
      </div>
    </article>
  );
}
