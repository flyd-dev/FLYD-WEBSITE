'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { ButtonLink } from '@/components/Button';
import Eyebrow from '@/components/Eyebrow';
import { ServiceTile, type ServiceIconName, type ServiceTone } from '@/components/ServiceIcon';

/**
 * Prototype (designlab): nedtrekksmeny for «Tjenester» i headeren (desktop).
 * Idé fra «Navigation Menu» på 21st.dev. «Tjenester» er fortsatt en lenke
 * til oversikten; pilknappen ved siden av åpner panelet (og hover gjør det
 * samme med mus). Escape, klikk utenfor og fokus som forlater menyen lukker.
 *
 * Revisjon står for seg under en strek, ikke sammen med de andre tjenestene
 * (revisjon og regnskap holdes adskilt). Listen kommer fra layouten
 * (serveren), så utkast-tjenester ikke gir ulik HTML på server og klient.
 */
export type MenyTjeneste = {
  title: string;
  short: string;
  icon: ServiceIconName;
  href: string;
  /** Revisjon: egen rad under streken. */
  separat?: boolean;
};

const toner: ServiceTone[] = ['petrol', 'teal', 'skog'];

export default function TjenesteMeny({
  tjenester,
  aktiv,
  lenkeKlasse,
}: {
  tjenester: MenyTjeneste[];
  aktiv: boolean;
  lenkeKlasse: string;
}) {
  const [apen, setApen] = useState(false);
  const omraade = useRef<HTMLDivElement>(null);
  const knapp = useRef<HTMLButtonElement>(null);
  const lukkTimer = useRef<number | undefined>(undefined);
  const pathname = usePathname();

  useEffect(() => setApen(false), [pathname]);

  useEffect(() => {
    if (!apen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setApen(false);
        knapp.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!omraade.current?.contains(e.target as Node)) setApen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [apen]);

  useEffect(() => () => window.clearTimeout(lukkTimer.current), []);

  const vis = () => {
    window.clearTimeout(lukkTimer.current);
    setApen(true);
  };
  // Litt ventetid, så musa rekker fra lenken ned til panelet.
  const skjul = () => {
    window.clearTimeout(lukkTimer.current);
    lukkTimer.current = window.setTimeout(() => setApen(false), 200);
  };

  const vanlige = tjenester.filter((t) => !t.separat);
  const separate = tjenester.filter((t) => t.separat);

  const rad = (t: MenyTjeneste, i: number) => (
    <Link
      key={t.href}
      href={t.href}
      className="group flex items-start gap-4 rounded-flis p-3 transition-colors duration-200 hover:bg-flyd-sand active:bg-flyd-linje-mint"
    >
      <ServiceTile name={t.icon} tone={toner[i % toner.length]} className="h-12 w-12 flex-shrink-0 rounded-flis" />
      <span className="min-w-0">
        <span className="block font-display text-[16px] font-semibold leading-snug text-flyd-skog">{t.title}</span>
        <span className="mt-1 line-clamp-2 block text-[14px] leading-[1.5] text-flyd-skifer">{t.short}</span>
      </span>
    </Link>
  );

  return (
    <div
      ref={omraade}
      onMouseEnter={vis}
      onMouseLeave={skjul}
      onBlur={(e) => {
        if (!omraade.current?.contains(e.relatedTarget as Node)) setApen(false);
      }}
      className="flex items-center gap-1"
    >
      <Link href="/tjenester" aria-current={aktiv ? 'page' : undefined} className={lenkeKlasse}>
        Tjenester
      </Link>
      <button
        ref={knapp}
        type="button"
        aria-expanded={apen}
        aria-controls="tjenestemeny"
        aria-label="Vis alle tjenester"
        onClick={() => setApen((v) => !v)}
        className="rounded-sm p-1 text-flyd-skifer transition-colors hover:text-flyd-skog active:text-flyd-petrol"
      >
        <ChevronDown
          className={clsx('h-4 w-4 transition-transform duration-200 motion-reduce:transition-none', apen && 'rotate-180')}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>

      {/* Panelet spenner hele headeren (headeren er sticky og dermed posisjonert). */}
      <div
        id="tjenestemeny"
        className={clsx(
          'absolute inset-x-0 top-full pt-2 transition-[opacity,transform,visibility] duration-150 motion-reduce:transition-none',
          apen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
        )}
      >
        <div className="mx-auto max-w-shell px-6 md:px-10">
          <div className="grid grid-cols-12 gap-3 rounded-kort bg-flyd-lysmint p-3">
            <div className="col-span-8">
              <div className="grid grid-cols-2 gap-1">{vanlige.map(rad)}</div>
              {separate.length > 0 && (
                <div className="mt-2 border-t border-flyd-linje-mint pt-2">
                  <div className="grid grid-cols-2 gap-1">{separate.map((t) => rad(t, 1))}</div>
                </div>
              )}
            </div>
            <div className="on-dark col-span-4 flex flex-col rounded-flis bg-flyd-skog p-6 text-flyd-sand">
              <Eyebrow tone="dark">Usikker på hva du trenger?</Eyebrow>
              <p className="mt-4 text-[15px] leading-[1.6] text-flyd-dempet">
                Fortell oss om bedriften, så finner vi ut hvordan vi kan hjelpe.
              </p>
              <div className="mt-auto pt-6">
                <ButtonLink href="/kontakt" variant="primary-dark" withArrow className="!px-5 !py-2.5 !text-[15px]">
                  Snakk med oss
                </ButtonLink>
                <p className="mt-4 text-[14px] text-flyd-dempet">
                  Eller ring{' '}
                  <a href="tel:+4748019958" className="whitespace-nowrap text-flyd-sand underline decoration-flyd-mint decoration-2 underline-offset-4">
                    +47 480 19 958
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
