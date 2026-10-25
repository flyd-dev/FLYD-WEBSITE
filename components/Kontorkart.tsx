import Link from 'next/link';
import clsx from 'clsx';
import { offices, atOffice } from '@/data/offices';
import { kartBredde, kartHoyde, kartLand, kartNaboer, kartPunkt } from '@/data/kontorkart';

/**
 * Kart over Sør-Vest-Norge med de seks kontorene (fra «Map»-komponentene på
 * 21st.dev, tegnet om etter manualen). Kartet er en egen SVG fra Kartverkets
 * data (data/kontorkart.ts, lages av scripts/make-kontorkart.mjs), så det
 * hentes ingen kartfliser fra tredjepart og personvernerklæringen trenger
 * ingen endring.
 *
 * Havet er Lys mint, landet Sand, og kontorene er Korall-punkter som lenker
 * til kontorsiden. Stedsnavnene står ved siden av punktene, på den siden der
 * de ikke kolliderer med naboene.
 */

// Hvilken side navnet står på, per kontor.
const navnTilVenstre = new Set(['egersund', 'sokndal']);

export default function Kontorkart({
  className,
  tone = 'sand',
}: {
  className?: string;
  /** Flaten kartet står på. På Lys mint får havet en mørkere mint, så kartet skiller seg fra bunnen. */
  tone?: 'sand' | 'lysmint';
}) {
  const punkter = offices
    .filter((o) => o.lat != null && o.lng != null)
    .map((o) => {
      const [x, y] = kartPunkt(o.lat!, o.lng!);
      return { o, left: (x / kartBredde) * 100, top: (y / kartHoyde) * 100 };
    });

  return (
    <figure className={clsx('m-0', className)}>
      <div
        className={clsx(
          'relative overflow-hidden rounded-bilde',
          tone === 'lysmint' ? 'bg-flyd-linje-mint/60' : 'bg-flyd-lysmint',
        )}
        style={{ aspectRatio: `${kartBredde} / ${kartHoyde}` }}
      >
        <svg
          viewBox={`0 0 ${kartBredde} ${kartHoyde}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          focusable="false"
        >
          <path d={kartNaboer} className="fill-flyd-sand/70 stroke-flyd-linje-mint" strokeWidth={1.2} strokeLinejoin="round" />
          <path d={kartLand} className="fill-flyd-sand stroke-flyd-linje-mint" strokeWidth={1.2} strokeLinejoin="round" />
          {/* Dekorative navn på hav og fylker. */}
          <text x="95" y="450" className="fill-flyd-petrol/50 font-display text-[22px] italic">
            Nordsjøen
          </text>
          <text x="400" y="345" className="fill-flyd-skifer/45 font-body text-[17px] font-bold uppercase" letterSpacing="3">
            Rogaland
          </text>
          <text x="780" y="470" className="fill-flyd-skifer/45 font-body text-[17px] font-bold uppercase" letterSpacing="3">
            Agder
          </text>
        </svg>

        <nav aria-label="Kontorene på kartet">
          <ul>
            {punkter.map(({ o, left, top }) => {
              const venstre = navnTilVenstre.has(o.slug);
              return (
                <li
                  key={o.slug}
                  className="absolute"
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  <Link
                    href={`/kontor/${o.slug}/`}
                    aria-label={`Kontoret ${atOffice(o)}`}
                    className={clsx(
                      'group absolute top-0 flex -translate-y-1/2 items-center gap-2 rounded-pille py-1 focus-visible:outline-offset-2',
                      venstre ? 'right-0 flex-row-reverse translate-x-[9px] pl-1' : 'left-0 -translate-x-[9px] pr-1',
                    )}
                  >
                    {/* Punktet: Korall med Sand-kant, som punktumet i logoen. */}
                    <span
                      aria-hidden="true"
                      className="block h-[18px] w-[18px] flex-shrink-0 rounded-pille border-[3px] border-flyd-sand bg-flyd-korall shadow-[0_0_0_1px_rgba(23,41,42,0.25)] transition-transform duration-200 group-hover:scale-125 group-focus-visible:scale-125 motion-reduce:transition-none"
                    />
                    <span className="kart-navn whitespace-nowrap font-display text-[13px] font-semibold text-flyd-skog decoration-flyd-teal decoration-2 underline-offset-4 group-hover:underline sm:text-[15px]">
                      {o.city}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <figcaption className="mt-3 text-[13px] text-flyd-skifer">
        Velg et kontor for å se adresse og folkene der. Kartdata: Kartverket (CC BY 4.0).
      </figcaption>
    </figure>
  );
}

/**
 * Bare kartflaten (hav og land, uten navn og punkter), til det lille kartet i
 * kontorlisten på /kontor. `utsnitt` er [x, y, bredde, høyde] i kartets
 * koordinater (standard hele kartet). Fyller forelderen; punktene tegnes av
 * den som bruker den.
 */
export function KartFlate({ utsnitt = [0, 0, kartBredde, kartHoyde] }: { utsnitt?: [number, number, number, number] }) {
  return (
    <svg viewBox={utsnitt.join(' ')} className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
      <path d={kartNaboer} className="fill-flyd-sand/70 stroke-flyd-teal/40" strokeWidth={3} strokeLinejoin="round" />
      <path d={kartLand} className="fill-flyd-sand stroke-flyd-teal/40" strokeWidth={3} strokeLinejoin="round" />
    </svg>
  );
}
