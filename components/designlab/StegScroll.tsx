'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import FlydIcon from '@/components/FlydIcon';
import type { ProcessStep } from '@/components/ProcessCards';

/**
 * Prototype (designlab): «Slik jobber vi» der du scroller gjennom stegene
 * mens overskriften og bildet står fast ved siden av. Bildet bytter til
 * steget du leser, og linjen til venstre fylles i Flyd-teal. Idé fra
 * «Sticky Scroll Reveal» (Aceternity, MIT) på 21st.dev.
 *
 * Aktivt steg skilles med farge på tittel og markør, ikke med gjennomsiktig
 * tekst, så alle steg holder kontrastkravet. Under lg er ingenting fast:
 * hvert steg får sitt eget bilde. Ved prefers-reduced-motion byttes bildet
 * uten toning.
 */
export default function StegScroll({ steps, intro }: { steps: ProcessStep[]; intro: React.ReactNode }) {
  const [aktiv, setAktiv] = useState(0);
  const liste = useRef<HTMLOListElement>(null);
  const fyll = useRef<HTMLSpanElement>(null);

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
          {/* Høyden følger skjermen, så overskrift og bilde får plass også på lave laptopskjermer. */}
          <div className="relative mt-10 hidden h-[min(34vh,320px)] overflow-hidden rounded-bilde bg-flyd-skog lg:block">
            {steps.map((st, i) => (
              <Image
                key={st.n}
                src={st.imgSrc}
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
                <FlydIcon name={s.icon} className="h-6 w-6 text-flyd-mint" />
                <span className="font-body text-[13px] font-bold uppercase tracking-[0.12em] text-flyd-korall">
                  Steg {s.n}
                </span>
              </div>
              <p className="mt-2 font-display text-[26px] font-semibold leading-tight text-flyd-sand">{s.title}</p>
            </div>
          </div>
        </div>
      </div>

      <ol ref={liste} className="relative lg:col-span-7">
        <span aria-hidden="true" className="absolute bottom-0 left-[11px] top-0 w-[2px] rounded-pille bg-flyd-linje-mint" />
        <span
          ref={fyll}
          aria-hidden="true"
          className="absolute bottom-0 left-[11px] top-0 w-[2px] origin-top scale-y-0 rounded-pille bg-flyd-teal"
        />
        {steps.map((st, i) => {
          const er = i === aktiv;
          return (
            <li
              key={st.n}
              data-steg={i}
              className="relative py-10 pl-14 lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:py-0"
            >
              <span
                aria-hidden="true"
                className={clsx(
                  'absolute left-0 top-11 flex h-6 w-6 items-center justify-center rounded-[7px] transition-colors duration-300 lg:top-1/2 lg:-translate-y-1/2',
                  er ? 'bg-flyd-teal' : 'bg-flyd-lysmint ring-2 ring-inset ring-flyd-linje-mint',
                )}
              >
                {er && <span className="h-2 w-2 rounded-[2px] bg-flyd-korall" />}
              </span>
              <p className="font-body text-[13px] font-bold uppercase leading-[1.2] tracking-[0.12em] text-flyd-skog">
                Steg {st.n}
              </p>
              <h3
                className={clsx(
                  'mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.1] transition-colors duration-300',
                  er ? 'text-flyd-skog' : 'text-flyd-skifer',
                )}
              >
                {st.title}
              </h3>
              <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.65] text-flyd-skifer">{st.body}</p>
              <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-bilde bg-flyd-skog lg:hidden">
                <Image src={st.imgSrc} alt="" fill sizes="100vw" className="object-cover" />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
