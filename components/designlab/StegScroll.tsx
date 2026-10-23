'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import FlydIcon, { type FlydIconName } from '@/components/FlydIcon';

/**
 * Prototype (designlab): steg du scroller gjennom mens overskriften (og
 * eventuelt et bilde) står fast ved siden av. Linjen til venstre fylles, og
 * steget midt på skjermen er aktivt. Har alle stegene bilde, står bildet
 * fast og bytter til steget du leser. Idé fra «Sticky Scroll Reveal»
 * (Aceternity, MIT) og «Timeline» på 21st.dev.
 *
 * Aktivt steg skilles med farge på tittel og markør, ikke med gjennomsiktig
 * tekst, så alle steg holder kontrastkravet. Under lg er ingenting fast, og
 * hvert steg får sitt eget bilde. Ved prefers-reduced-motion byttes bildet
 * uten toning.
 */
export type Steg = {
  n: string;
  title: string;
  body: string;
  imgSrc?: string;
  icon?: FlydIconName;
  /** Eget SVG-ikon (f.eks. bytte-ikonene i public/ikoner/bytte/). */
  ikonSrc?: string;
};

/** Flaten seksjonen står på. Markøren må ha samme farge som bunnen for å dekke linjen. */
type Tone = 'lysmint' | 'sand' | 'petrol';

const farger: Record<
  Tone,
  { linje: string; fyll: string; av: string; på: string; etikett: string; tittel: [string, string]; brod: string }
> = {
  lysmint: {
    linje: 'bg-flyd-linje-mint',
    fyll: 'bg-flyd-teal',
    av: 'bg-flyd-lysmint ring-2 ring-inset ring-flyd-linje-mint',
    på: 'bg-flyd-teal',
    etikett: 'text-flyd-skog',
    tittel: ['text-flyd-skog', 'text-flyd-skifer'],
    brod: 'text-flyd-skifer',
  },
  sand: {
    linje: 'bg-flyd-linje-sand',
    fyll: 'bg-flyd-teal',
    av: 'bg-flyd-sand ring-2 ring-inset ring-flyd-linje-sand',
    på: 'bg-flyd-teal',
    etikett: 'text-flyd-skog',
    tittel: ['text-flyd-skog', 'text-flyd-skifer'],
    brod: 'text-flyd-skifer',
  },
  // Mint, ikke Korall, for etiketten: Korall er bare 4,2:1 på Petrol.
  petrol: {
    linje: 'bg-flyd-mint/25',
    fyll: 'bg-flyd-mint',
    av: 'bg-flyd-petrol ring-2 ring-inset ring-flyd-mint/40',
    på: 'bg-flyd-mint',
    etikett: 'text-flyd-mint',
    tittel: ['text-flyd-sand', 'text-flyd-dempet'],
    brod: 'text-flyd-dempet',
  },
};

export default function StegScroll({
  steps,
  intro,
  tone = 'lysmint',
}: {
  steps: Steg[];
  intro: React.ReactNode;
  tone?: Tone;
}) {
  const [aktiv, setAktiv] = useState(0);
  const liste = useRef<HTMLOListElement>(null);
  const fyll = useRef<HTMLSpanElement>(null);
  const f = farger[tone];
  const medBilder = steps.every((st) => st.imgSrc);

  useEffect(() => {
    const ol = liste.current;
    if (!ol) return;
    const punkter = Array.from(ol.querySelectorAll<HTMLElement>('[data-steg]'));
    // Steget som krysser midten av skjermen er aktivt.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setAktiv(Number((e.target as HTMLElement).dataset.steg));
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    punkter.forEach((p) => io.observe(p));

    let raf = 0;
    const oppdater = () => {
      raf = 0;
      const r = ol.getBoundingClientRect();
      const midt = window.innerHeight / 2;
      const p = Math.min(1, Math.max(0, (midt - r.top) / r.height));
      fyll.current?.style.setProperty('transform', `scaleY(${p.toFixed(3)})`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(oppdater);
    };
    oppdater();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const s = steps[aktiv];

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          {intro}
          {medBilder && (
            // Høyden følger skjermen, så overskrift og bilde får plass også på lave laptopskjermer.
            <div className="relative mt-10 hidden h-[min(34vh,320px)] overflow-hidden rounded-bilde bg-flyd-skog lg:block">
              {steps.map((st, i) => (
                <Image
                  key={st.n}
                  src={st.imgSrc!}
                  alt=""
                  fill
                  sizes="40vw"
                  className={clsx(
                    'object-cover transition-opacity duration-500 motion-reduce:transition-none',
                    i === aktiv ? 'opacity-100' : 'opacity-0',
                  )}
                />
              ))}
              <div className="overlay-skog-bunn absolute inset-0" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-7" aria-hidden="true">
                <div className="flex items-center gap-3">
                  {s.icon && <FlydIcon name={s.icon} className="h-6 w-6 text-flyd-mint" />}
                  <span className="font-body text-[13px] font-bold uppercase tracking-[0.12em] text-flyd-korall">
                    Steg {s.n}
                  </span>
                </div>
                <p className="mt-2 font-display text-[26px] font-semibold leading-tight text-flyd-sand">{s.title}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ol ref={liste} className="relative lg:col-span-7">
        <span aria-hidden="true" className={clsx('absolute bottom-0 left-[11px] top-0 w-[2px] rounded-pille', f.linje)} />
        <span
          ref={fyll}
          aria-hidden="true"
          className={clsx('absolute bottom-0 left-[11px] top-0 w-[2px] origin-top scale-y-0 rounded-pille', f.fyll)}
        />
        {steps.map((st, i) => {
          const er = i === aktiv;
          return (
            <li
              key={st.n}
              data-steg={i}
              className={clsx(
                'relative py-10 pl-14 lg:flex lg:flex-col lg:justify-center lg:py-0',
                medBilder ? 'lg:min-h-[62vh]' : 'lg:min-h-[42vh]',
              )}
            >
              <span
                aria-hidden="true"
                className={clsx(
                  'absolute left-0 top-11 flex h-6 w-6 items-center justify-center rounded-[7px] transition-colors duration-300 lg:top-1/2 lg:-translate-y-1/2',
                  er ? f.på : f.av,
                )}
              >
                {er && <span className="h-2 w-2 rounded-[2px] bg-flyd-korall" />}
              </span>
              {st.ikonSrc && (
                // eslint-disable-next-line @next/next/no-img-element -- SVG, next/image gir ingenting her
                <img src={st.ikonSrc} alt="" aria-hidden="true" width={56} height={56} className="mb-5 h-14 w-14" />
              )}
              <p className={clsx('font-body text-[13px] font-bold uppercase leading-[1.2] tracking-[0.12em]', f.etikett)}>
                Steg {st.n}
              </p>
              <h3
                className={clsx(
                  'mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.1] transition-colors duration-300',
                  er ? f.tittel[0] : f.tittel[1],
                )}
              >
                {st.title}
              </h3>
              <p className={clsx('mt-4 max-w-[46ch] text-[17px] leading-[1.65]', f.brod)}>{st.body}</p>
              {medBilder && (
                <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-bilde bg-flyd-skog lg:hidden">
                  <Image src={st.imgSrc!} alt="" fill sizes="100vw" className="object-cover" />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
