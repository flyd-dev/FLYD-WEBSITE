'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { TextLink } from '@/components/Button';
import { customerLogos } from '@/data/logos';

/**
 * Prototype (designlab): kundelogoene som faner, og hver fane viser ett tall
 * og ett sitat fra kunden. Idé fra «Logo Cloud Story Tabs» på 21st.dev
 * (mohammadshehadeh, MIT), tegnet om etter designmanualen: ingen skygge eller
 * kantlinje rundt kort, tallet i Poppins 600 Petrol, aktiv fane med
 * Flyd-teal strek under. Fanene følger WAI-ARIA-mønsteret (piltaster,
 * Home/End), og ved prefers-reduced-motion er overgangen bare en kort toning.
 */
export type Kundehistorie = {
  /** Må stemme med `name` i data/logos.ts. */
  kunde: string;
  tall: string;
  tallTekst: string;
  tallNote?: string;
  sitat: string;
  navn: string;
  rolle: string;
  href?: string;
};

export default function KundeHistorier({ historier }: { historier: Kundehistorie[] }) {
  const [aktiv, setAktiv] = useState(0);
  const faner = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const h = historier[aktiv];

  const velg = (i: number) => {
    const neste = (i + historier.length) % historier.length;
    setAktiv(neste);
    faner.current[neste]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') velg(aktiv + 1);
    else if (e.key === 'ArrowLeft') velg(aktiv - 1);
    else if (e.key === 'Home') velg(0);
    else if (e.key === 'End') velg(historier.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Kundehistorier"
        onKeyDown={onKeyDown}
        className="grid grid-cols-3 border-b border-flyd-linje-sand md:grid-cols-6"
      >
        {historier.map((k, i) => {
          const logo = customerLogos.find((l) => l.name === k.kunde);
          const valgt = i === aktiv;
          return (
            <button
              key={k.kunde}
              ref={(el) => {
                faner.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-fane-${i}`}
              aria-selected={valgt}
              aria-controls={`${id}-panel`}
              tabIndex={valgt ? 0 : -1}
              onClick={() => setAktiv(i)}
              className="group relative flex h-20 items-center justify-center px-3 md:h-24"
            >
              {logo ? (
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={36}
                  sizes="140px"
                  className={clsx(
                    'h-8 w-auto max-w-full object-contain mix-blend-multiply transition-[filter,opacity] duration-300 md:h-9',
                    valgt ? 'opacity-100 grayscale-0' : 'opacity-50 grayscale group-hover:opacity-80',
                  )}
                  draggable={false}
                />
              ) : (
                <span className="font-display text-[15px] font-semibold">{k.kunde}</span>
              )}
              <span
                aria-hidden="true"
                className={clsx(
                  'absolute inset-x-3 -bottom-px h-[2px] origin-left bg-flyd-teal transition-transform duration-300 motion-reduce:transition-none',
                  valgt ? 'scale-x-100' : 'scale-x-0',
                )}
              />
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-fane-${aktiv}`}
        tabIndex={0}
        className="relative min-h-[300px] rounded-flis pt-10 md:pt-14"
      >
        {/* reducedMotion="user": ved redusert bevegelse faller forflytningen bort og bare tonen er igjen. */}
        <MotionConfig reducedMotion="user">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={h.kunde}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12"
          >
            <div className="md:col-span-5">
              <p className="font-body text-[13px] font-bold uppercase leading-[1.2] tracking-[0.12em] text-flyd-skifer">
                {String(aktiv + 1).padStart(2, '0')} / {String(historier.length).padStart(2, '0')}
              </p>
              <p className="mt-5 font-display text-[clamp(3.5rem,7vw,5.75rem)] font-semibold leading-none tracking-[-0.02em] text-flyd-petrol">
                {h.tall}
              </p>
              <p className="mt-4 font-display text-[20px] font-semibold leading-snug">{h.tallTekst}</p>
              {h.tallNote && <p className="mt-1.5 text-[15px] leading-[1.55] text-flyd-skifer">{h.tallNote}</p>}
            </div>

            <figure className="md:col-span-7 md:border-l md:border-flyd-linje-sand md:pl-12">
              <blockquote className="font-display text-ingress font-medium text-flyd-skog">
                «{h.sitat}»
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
                <div>
                  <p className="font-medium text-flyd-skog">{h.navn}</p>
                  <p className="text-[15px] text-flyd-skifer">
                    {h.rolle}, {h.kunde}
                  </p>
                </div>
                {h.href && <TextLink href={h.href}>Les hele historien</TextLink>}
              </figcaption>
            </figure>
          </motion.div>
        </AnimatePresence>
        </MotionConfig>
      </div>
    </div>
  );
}
