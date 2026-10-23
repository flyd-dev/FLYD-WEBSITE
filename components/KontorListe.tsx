'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import AvatarRad from './AvatarRad';
import type { TeamMember } from '@/data/team';

export type KontorRad = {
  slug: string;
  href: string;
  navn: string;
  omrade: string;
  lenketekst: string;
  bilde?: { src: string; kort: string; alt: string };
  folk: TeamMember[];
  /** Plassen på kartet i prosent av bredde og høyde (fra kartPunkt). */
  kart?: { x: number; y: number };
};

const strek =
  'underline decoration-flyd-mint decoration-2 underline-offset-[5px] transition-[text-decoration-color] duration-200 group-hover/lenke:decoration-flyd-sand';

/**
 * Kontorene på /kontor som en liste med bilde som vises ved siden av (fra
 * «Hover Reveal» / «Image Reveal List» på 21st.dev, tegnet om etter manualen).
 * Radene er store og rene: nummer, navn og område, nord til sør. Med mus eller
 * tastatur viser feltet til høyre bildet av kontoret du peker på, med folkene
 * og lenken til kontorsiden, og et lite kart i hjørnet som viser hvor kontoret
 * ligger (erstatter det store kartet, så kontorene ikke står to ganger). På
 * mobil og nettbrett står et lite bilde i hver rad i stedet. Bildene veksler
 * med en kort overtoning (står stille ved prefers-reduced-motion).
 *
 * `kart` er selve kartflaten (KartFlate fra Kontorkart.tsx), laget på serveren
 * og sendt inn ferdig, så kartdataene ikke havner i JavaScript-pakken.
 */
export default function KontorListe({ kontorer, kart }: { kontorer: KontorRad[]; kart?: React.ReactNode }) {
  const [aktiv, setAktiv] = useState(0);
  const valgt = kontorer[aktiv];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
      <ol className="border-t border-flyd-linje-sand lg:col-span-7">
        {kontorer.map((k, i) => {
          const er = i === aktiv;
          return (
            <li key={k.slug}>
              <Link
                href={k.href}
                onMouseEnter={() => setAktiv(i)}
                onFocus={() => setAktiv(i)}
                className="group flex items-center gap-4 border-b border-flyd-linje-sand py-4 sm:gap-6 lg:py-5"
              >
                {/* Lite bilde i raden under lg; der viser feltet til høyre bildet. */}
                <span className="relative aspect-[4/3] w-20 flex-shrink-0 overflow-hidden rounded-flis bg-flyd-linje-mint sm:w-28 lg:hidden">
                  {k.bilde && <Image src={k.bilde.kort} alt="" fill sizes="112px" className="object-cover" />}
                </span>
                <span
                  aria-hidden="true"
                  className={clsx(
                    'hidden w-9 flex-shrink-0 font-display text-[24px] font-semibold leading-none tabular-nums transition-colors duration-200 lg:block',
                    er ? 'text-flyd-rust' : 'text-flyd-skifer/70 group-hover:text-flyd-rust',
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={clsx(
                      'block font-display text-[19px] font-semibold leading-tight transition-colors duration-200 sm:text-[22px] lg:text-[26px]',
                      // Den aktive raden markeres bare fra lg, der bildefeltet viser den.
                      er ? 'text-flyd-skog' : 'text-flyd-skog lg:text-flyd-skog/75 lg:group-hover:text-flyd-skog',
                    )}
                  >
                    {k.navn}
                  </span>
                  <span className="mt-1 block text-[14px] leading-snug text-flyd-skifer sm:text-[15px]">{k.omrade}</span>
                </span>
                <span
                  aria-hidden="true"
                  className={clsx(
                    'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color] duration-200',
                    'border-flyd-linje-sand text-flyd-teal group-hover:border-flyd-skog group-hover:bg-flyd-skog group-hover:text-flyd-sand',
                    er && 'lg:border-flyd-skog lg:bg-flyd-skog lg:text-flyd-sand',
                  )}
                >
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      {/* Bildefeltet (fra lg). Alle bildene ligger klare oppå hverandre og tones inn. */}
      <div className="relative hidden overflow-hidden rounded-bilde bg-flyd-skog lg:col-span-5 lg:block">
        {kontorer.map((k, i) =>
          k.bilde ? (
            <Image
              key={k.slug}
              src={k.bilde.src}
              alt={i === aktiv ? k.bilde.alt : ''}
              aria-hidden={i === aktiv ? undefined : true}
              fill
              sizes="(min-width: 1240px) 480px, 40vw"
              className={clsx(
                'object-cover transition-opacity duration-500 motion-reduce:transition-none',
                i === aktiv ? 'opacity-100' : 'opacity-0',
              )}
            />
          ) : null,
        )}
        <div className="overlay-skog-bunn absolute inset-0" aria-hidden="true" />
        {/* Lite kart øverst til høyre: Korall-punkt for kontoret du peker på, små teal-punkter for de andre. */}
        {kart && (
          <div
            aria-hidden="true"
            className="absolute right-5 top-5 w-40 overflow-hidden rounded-flis bg-flyd-linje-mint shadow-[0_0_0_1px_rgba(23,41,42,0.12)]"
            style={{ aspectRatio: '1000 / 800' }}
          >
            {kart}
            {kontorer.map((k, i) =>
              k.kart ? (
                <span
                  key={k.slug}
                  className={clsx(
                    'absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,background-color] duration-200 motion-reduce:transition-none',
                    i === aktiv ? 'z-10 h-3.5 w-3.5 border-2 border-flyd-sand bg-flyd-korall' : 'h-2 w-2 bg-flyd-teal',
                  )}
                  style={{ left: `${k.kart.x}%`, top: `${k.kart.y}%` }}
                />
              ) : null,
            )}
          </div>
        )}
        <div className="on-dark absolute inset-x-0 bottom-0 p-7">
          <p className="font-display text-[24px] font-semibold leading-tight text-flyd-sand">{valgt.navn}</p>
          <AvatarRad folk={valgt.folk} tone="mork" ring="ring-flyd-skog" className="mt-4" />
          {/* Siste ord og pilen skilles aldri når lenken brytes over to linjer. */}
          <Link
            href={valgt.href}
            className="group/lenke mt-5 block text-[15px] font-medium leading-relaxed text-flyd-sand"
          >
            <span className={strek}>{valgt.lenketekst.split(' ').slice(0, -1).join(' ')}</span>{' '}
            <span className="whitespace-nowrap">
              <span className={strek}>{valgt.lenketekst.split(' ').at(-1)}</span>
              <ArrowRight
                className="ml-1.5 inline-block h-4 w-4 align-[-0.2em] transition-transform duration-200 group-hover/lenke:translate-x-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
