'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import { offices, atOffice } from '@/data/offices';

/**
 * Kontorflatene: de seks kontorene som bildeflater som åpner seg ved
 * hover, fokus eller trykk. Idé fra «Interactive Image Accordion» og «Hover
 * Expand» på 21st.dev, tegnet om: fasadefotoene fra data/offices.ts, radius
 * 24 px og Skog-overlay nedenfra der teksten står. Ingen blur.
 *
 * Hver flate er en lenke til kontorsiden. Med mus åpnes flaten ved hover, så
 * klikket går rett til siden. På touch åpner første trykk flaten og det andre
 * følger lenken. Tastatur: fokus åpner, Enter følger lenken.
 *
 * Touch sender mouseenter og fokus før click, så flaten er alt åpen når
 * klikket kommer. Derfor huskes om flaten var åpen da fingeren traff
 * (pointerdown), og det er det som avgjør om trykket åpner eller navigerer.
 */
export default function KontorAkkordeon({ className }: { className?: string }) {
  const kontorer = offices.filter((o) => o.image);
  const [aktiv, setAktiv] = useState(0);
  const trykk = useRef<{ type: string; varApen: boolean }>({ type: 'mouse', varApen: false });

  return (
    <ul
      className={clsx(
        'flex h-[640px] flex-col gap-2.5 md:h-[540px] md:flex-row md:gap-3',
        className,
      )}
    >
      {kontorer.map((o, i) => {
        const apen = i === aktiv;
        return (
          <li
            key={o.slug}
            className="relative min-h-[64px] basis-0 transition-[flex-grow] duration-500 ease-out motion-reduce:transition-none md:min-w-[72px]"
            style={{ flexGrow: apen ? 7 : 1 }}
          >
            <Link
              href={`/kontor/${o.slug}/`}
              onPointerDown={(e) => {
                trykk.current = { type: e.pointerType, varApen: apen };
              }}
              onMouseEnter={() => setAktiv(i)}
              onFocus={() => setAktiv(i)}
              onClick={(e) => {
                // detail 0 = tastatur (Enter): følg lenken. Mus: hover har alt åpnet flaten.
                if (e.detail !== 0 && trykk.current.type !== 'mouse' && !trykk.current.varApen) {
                  e.preventDefault();
                  setAktiv(i);
                }
              }}
              aria-label={`Se mer om kontoret og folkene ${atOffice(o)}`}
              className="group absolute inset-0 block overflow-hidden rounded-bilde bg-flyd-skog text-flyd-sand on-dark"
            >
              <Image
                src={o.image!.src}
                alt=""
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className={clsx(
                  'object-cover transition-transform duration-700 ease-out motion-reduce:transition-none',
                  apen ? 'scale-100' : 'scale-110',
                )}
              />
              <div
                aria-hidden="true"
                className={clsx(
                  'absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none',
                  apen ? 'overlay-skog-bunn' : 'bg-flyd-skog/70',
                )}
              />

              {/* Lukket: bynavnet står loddrett (desktop) eller vannrett (mobil). */}
              <span
                aria-hidden="true"
                className={clsx(
                  'absolute left-5 font-display text-[18px] font-semibold transition-opacity duration-300 motion-reduce:transition-none',
                  'top-1/2 -translate-y-1/2 md:bottom-6 md:top-auto md:translate-y-0 md:[writing-mode:vertical-rl] md:rotate-180',
                  apen ? 'opacity-0' : 'opacity-100',
                )}
              >
                {o.city}
              </span>

              {/* Åpen: navn, adresse og lenketekst nederst. */}
              <div
                className={clsx(
                  'absolute inset-x-0 bottom-0 p-6 transition-[opacity,transform] duration-500 motion-reduce:transition-none md:p-8',
                  apen ? 'translate-y-0 opacity-100 delay-150' : 'pointer-events-none translate-y-3 opacity-0',
                )}
              >
                <p className="font-body text-[13px] font-bold uppercase leading-[1.2] tracking-[0.12em] text-flyd-korall">
                  {o.name !== o.city ? o.name : 'Kontor'}
                </p>
                <h3 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.1]">
                  {o.city}
                </h3>
                <p className="mt-2 text-[15px] text-flyd-dempet">
                  {[o.street, o.postal].filter(Boolean).join(', ')}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-flyd-sand underline decoration-flyd-mint decoration-2 underline-offset-[6px]">
                  Se mer om kontoret og folkene {atOffice(o)}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
