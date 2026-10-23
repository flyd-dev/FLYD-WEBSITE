'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import FlydIcon, { type FlydIconName } from '@/components/FlydIcon';

/**
 * Bildeflater på rad der én er åpen om gangen. Hover,
 * fokus eller trykk åpner en flate. Idé fra «Interactive Image Accordion» og
 * «Hover Expand» på 21st.dev. Samme grep som KontorAkkordeon, men uten
 * lenker: brukes til «Hvorfor jobbe i Flyd» på /karriere og til bildene fra
 * kontoret på kontorsidene.
 *
 * Med tittel får den åpne flaten Skog-overlay nedenfra og teksten nederst
 * (manualens krav til tekst på bilde). Uten tittel er det bare bilder.
 * Teksten ligger alltid i HTML-en, også når flaten er lukket, og er knappens
 * navn for skjermlesere. Uten tekst er bildets alt-tekst navnet.
 */
export type Flate = {
  src: string;
  alt: string;
  tittel?: string;
  tekst?: string;
  icon?: FlydIconName;
};

export default function BildeAkkordeon({
  flater,
  className,
  hoyde = 'stor',
}: {
  flater: Flate[];
  className?: string;
  hoyde?: 'stor' | 'liten';
}) {
  const [aktiv, setAktiv] = useState(0);
  const medTekst = flater.some((f) => f.tittel);

  return (
    <ul
      className={clsx(
        'flex flex-col gap-2.5 md:flex-row md:gap-3',
        hoyde === 'stor' ? 'h-[680px] md:h-[520px]' : 'h-[560px] md:h-[440px]',
        className,
      )}
    >
      {flater.map((f, i) => {
        const apen = i === aktiv;
        return (
          <li
            key={f.src}
            className="relative min-h-[60px] basis-0 transition-[flex-grow] duration-500 ease-out motion-reduce:transition-none md:min-w-[68px]"
            style={{ flexGrow: apen ? 6 : 1 }}
          >
            <button
              type="button"
              aria-expanded={apen}
              onMouseEnter={() => setAktiv(i)}
              onFocus={() => setAktiv(i)}
              onClick={() => setAktiv(i)}
              className="on-dark absolute inset-0 block w-full overflow-hidden rounded-bilde bg-flyd-skog text-left text-flyd-sand"
            >
              <Image
                src={f.src}
                alt={medTekst ? '' : f.alt}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className={clsx(
                  'object-cover transition-transform duration-700 ease-out motion-reduce:transition-none',
                  apen ? 'scale-100' : 'scale-110',
                )}
              />
              {medTekst && (
                <div
                  aria-hidden="true"
                  className={clsx(
                    'absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none',
                    apen ? 'overlay-skog-bunn' : 'bg-flyd-skog/60',
                  )}
                />
              )}

              {medTekst && (
                <>
                  {/* Lukket: tittelen står loddrett (desktop) eller vannrett (mobil). */}
                  <span
                    aria-hidden="true"
                    className={clsx(
                      'absolute left-5 flex items-center gap-2.5 font-display text-[17px] font-semibold transition-opacity duration-300 motion-reduce:transition-none',
                      'top-1/2 -translate-y-1/2 md:bottom-6 md:top-auto md:translate-y-0 md:[writing-mode:vertical-rl] md:rotate-180',
                      apen ? 'opacity-0' : 'opacity-100',
                    )}
                  >
                    {f.tittel}
                  </span>
                  <span
                    className={clsx(
                      'absolute inset-x-0 bottom-0 block p-6 transition-[opacity,transform] duration-500 motion-reduce:transition-none md:p-8',
                      apen ? 'translate-y-0 opacity-100 delay-150' : 'translate-y-3 opacity-0',
                    )}
                  >
                    {f.icon && <FlydIcon name={f.icon} className="h-7 w-7 text-flyd-mint" />}
                    <span className="mt-4 block font-display text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-[1.15]">
                      {f.tittel}
                    </span>
                    {f.tekst && (
                      <span className="mt-3 block max-w-[46ch] text-[16px] leading-[1.6] text-flyd-dempet">{f.tekst}</span>
                    )}
                  </span>
                </>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
