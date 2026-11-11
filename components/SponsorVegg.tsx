'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import FlydIcon from './FlydIcon';
import type { Sponsoravtale, Sponsorkategori } from '@/data/samfunnsansvar';

/**
 * Logoveggen på /om-flyd/samfunnsansvar/: kartet over hvor vi støtter noen,
 * og kortene med logoene. Idé fra logovegger og «map + list»-oppsett på
 * 21st.dev, tegnet etter designmanualen (kort uten skygge og kantlinje,
 * Korall-punkter som i kontorkartet, pilleknapper).
 *
 * Kort med bilde (utøvere og lag uten logo) er dobbelt så brede, og
 * rutenettet pakkes tett (`grid-flow-dense`) så radene går opp.
 *
 * Pillene filtrerer på type. Et sted i kartet kan velges, og da dempes
 * kortene fra andre steder. Peker du på et kort, lyser stedet opp i kartet.
 * Selve kartflaten tegnes på serveren og sendes inn som `kart`, så
 * kartdataene ikke havner i JavaScript-pakken. Ved prefers-reduced-motion
 * byttes kortene uten bevegelse.
 */
export type KartSted = { id: string; navn: string; left: number; top: number; navnPlass: 'venstre' | 'hoyre' | 'under' };

// Hvor navnet står i forhold til punktet.
const navnPlass = {
  venstre: 'right-full top-1/2 mr-1.5 -translate-y-1/2',
  hoyre: 'left-full top-1/2 ml-1.5 -translate-y-1/2',
  under: 'left-1/2 top-full mt-1 -translate-x-1/2',
} as const;

// Lange ord f\u00E5r myk bindestrek, s\u00E5 de ikke stikker ut av smale kort (320 px).
const delbar = (tekst: string) =>
  tekst
    .replace('Fotballklubb', 'Fotball\u00ADklubb')
    .replace('Sportsdrill', 'Sports\u00ADdrill')
    .replace('Motorsportanlegg', 'Motorsport\u00ADanlegg');

export default function SponsorVegg({
  avtaler,
  kategorier,
  steder,
  kart,
  kartForhold,
}: {
  avtaler: Sponsoravtale[];
  kategorier: { id: Sponsorkategori; tittel: string }[];
  steder: KartSted[];
  /** Kartflaten (hav og land), tegnet på serveren. */
  kart: ReactNode;
  /** Bredde / høyde på kartutsnittet. */
  kartForhold: number;
}) {
  const [kategori, setKategori] = useState<Sponsorkategori | 'alle'>('alle');
  const [valgtSted, setValgtSted] = useState<string | null>(null);
  // Stedet til kortet pekeren står på (lyser opp punktet) og punktet pekeren står på (demper andre kort).
  const [pekKort, setPekKort] = useState<string | null>(null);
  const [pekPunkt, setPekPunkt] = useState<string | null>(null);

  const synlige = avtaler.filter((a) => kategori === 'alle' || a.kategori === kategori);
  const antallPaSted = (id: string) => synlige.filter((a) => a.sted === id).length;
  const stedNavn = (id: string) => steder.find((s) => s.id === id)?.navn ?? '';
  const fremhevet = pekPunkt ?? valgtSted;

  const velgKategori = (k: Sponsorkategori | 'alle') => {
    setKategori(k);
    // Et valgt sted uten treff i den nye kategorien nullstilles, så listen aldri står dempet uten grunn.
    if (valgtSted && !avtaler.some((a) => a.sted === valgtSted && (k === 'alle' || a.kategori === k))) {
      setValgtSted(null);
    }
  };

  const piller: { id: Sponsorkategori | 'alle'; tittel: string; antall: number }[] = [
    { id: 'alle', tittel: 'Alle', antall: avtaler.length },
    ...kategorier.map((k) => ({ ...k, antall: avtaler.filter((a) => a.kategori === k.id).length })),
  ];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
      {/* KARTET */}
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <figure className="m-0">
            <div
              className="relative overflow-hidden rounded-bilde bg-flyd-linje-mint/60"
              style={{ aspectRatio: String(kartForhold) }}
            >
              {kart}
              <ul aria-label="Stedene i kartet">
                {steder.map((s) => {
                  const n = antallPaSted(s.id);
                  const aktiv = fremhevet === s.id || pekKort === s.id;
                  const valgt = valgtSted === s.id;
                  return (
                    <li key={s.id} className="absolute" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
                      <button
                        type="button"
                        disabled={n === 0}
                        aria-pressed={valgt}
                        aria-label={`${s.navn}: ${n} ${n === 1 ? 'avtale' : 'avtaler'}`}
                        onClick={() => setValgtSted(valgt ? null : s.id)}
                        onMouseEnter={() => setPekPunkt(s.id)}
                        onMouseLeave={() => setPekPunkt(null)}
                        onFocus={() => setPekPunkt(s.id)}
                        onBlur={() => setPekPunkt(null)}
                        className="group absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pille focus-visible:outline-offset-2 disabled:cursor-default"
                      >
                        {/* Punktet: Korall med Sand-kant, som i kontorkartet. Uten treff er det tomt. */}
                        <span
                          aria-hidden="true"
                          className={clsx(
                            'block h-[22px] w-[22px] flex-shrink-0 rounded-pille border-[3px] border-flyd-sand shadow-[0_0_0_1px_rgba(23,41,42,0.25)] transition-transform duration-200 motion-reduce:transition-none',
                            n === 0 ? 'bg-flyd-linje-mint' : 'bg-flyd-korall',
                            aktiv && n > 0 && 'scale-125',
                            valgt && 'ring-4 ring-flyd-korall/35',
                          )}
                        />
                        <span
                          className={clsx(
                            'absolute flex items-center gap-1.5 whitespace-nowrap rounded-pille px-2 py-0.5 font-display text-[13px] font-semibold transition-colors duration-200 sm:px-2.5 sm:text-[14px]',
                            navnPlass[s.navnPlass],
                            valgt || aktiv ? 'bg-flyd-skog text-flyd-sand' : 'bg-flyd-sand/85 text-flyd-skog',
                            n === 0 && 'opacity-60',
                          )}
                        >
                          {s.navn}
                          {n > 0 && <span className="font-body text-[12px] font-bold tabular-nums">{n}</span>}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <figcaption className="mt-3 text-[13px] text-flyd-skifer">
              Velg et sted for å se hvem vi støtter der. Kartdata: Kartverket (CC BY 4.0).
            </figcaption>
          </figure>
        </div>
      </div>

      {/* KORTENE */}
      <div className="lg:col-span-8">
        <div role="group" aria-label="Vis" className="flex flex-wrap gap-2">
          {piller.map((p) => {
            const aktiv = kategori === p.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={aktiv}
                onClick={() => velgKategori(p.id)}
                className={clsx(
                  'inline-flex items-center gap-2 rounded-pille border px-4 py-2 text-[15px] font-medium transition-colors duration-200 active:translate-y-[1px]',
                  aktiv
                    ? 'border-flyd-skog bg-flyd-skog text-flyd-sand'
                    : 'border-flyd-skog/30 text-flyd-skog hover:border-flyd-skog hover:bg-flyd-linje-mint',
                )}
              >
                {p.tittel}
                <span className={clsx('text-[13px] tabular-nums', aktiv ? 'text-flyd-dempet' : 'text-flyd-skifer')}>
                  {p.antall}
                </span>
              </button>
            );
          })}
        </div>

        {/* Hva som vises nå – leses opp når filteret endres. */}
        <p aria-live="polite" className="mt-5 flex min-h-[28px] flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-flyd-skifer">
          {valgtSted ? (
            <>
              <span>
                {stedNavn(valgtSted)}: {antallPaSted(valgtSted)} av {synlige.length}
              </span>
              <button
                type="button"
                onClick={() => setValgtSted(null)}
                className="rounded-[4px] font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4 transition-colors hover:text-flyd-skog hover:decoration-flyd-skog"
              >
                Vis alle steder
              </button>
            </>
          ) : (
            <span>
              Viser {synlige.length} av {avtaler.length}
            </span>
          )}
        </p>

        <MotionConfig reducedMotion="user">
          <ul className="mt-5 grid grid-flow-dense grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {synlige.map((a) => {
                const dempet = fremhevet != null && a.sted !== fremhevet;
                const innhold = (
                  <>
                    {a.bilde ? (
                      // Bilde i stedet for logo: bred flis, bildet fyller den.
                      <span className="relative block aspect-[5/2] overflow-hidden rounded-flis bg-flyd-lysmint">
                        <Image
                          src={a.bilde.src}
                          alt={a.bilde.alt}
                          fill
                          sizes="(min-width: 1024px) 380px, (min-width: 640px) 60vw, 90vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />
                      </span>
                    ) : (
                      // Flisen har fast form; logoen ligger absolutt inni, så høye merker ikke strekker kortet.
                      <span className="relative block aspect-[4/3] rounded-flis bg-flyd-lysmint">
                        <span className="absolute inset-4 flex items-center justify-center sm:inset-5">
                          {a.logo ? (
                            <Image
                              src={a.logo.src}
                              alt=""
                              width={a.logo.bredde}
                              height={a.logo.hoyde}
                              sizes="(min-width: 640px) 160px, 40vw"
                              className="h-auto max-h-full w-auto max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                            />
                          ) : (
                            <FlydIcon name="lokal" className="h-12 w-12 text-flyd-teal sm:h-14 sm:w-14" />
                          )}
                        </span>
                      </span>
                    )}
                    <span className="flex flex-1 flex-col px-2 pb-2 pt-4">
                      <span className="font-display text-[17px] font-semibold leading-[1.25] text-flyd-skog sm:text-[19px]">
                        {delbar(a.navn)}
                      </span>
                      <span className="mt-1.5 text-[14px] leading-snug text-flyd-skifer sm:text-[15px]">
                        {delbar(a.type)} · {stedNavn(a.sted)}
                      </span>
                      {a.url && (
                        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[14px] font-medium text-flyd-petrol">
                          Besøk
                          <ArrowUpRight
                            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                          <span className="sr-only"> {a.navn} (åpnes i nytt vindu)</span>
                        </span>
                      )}
                    </span>
                  </>
                );
                const kort =
                  'lys group flex h-full flex-col rounded-kort bg-flyd-sand p-2.5 transition-[background-color,opacity] duration-300 sm:p-3';
                return (
                  <motion.li
                    key={a.navn}
                    layout
                    className={a.bilde ? 'col-span-2' : undefined}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    onMouseEnter={() => setPekKort(a.sted)}
                    onMouseLeave={() => setPekKort(null)}
                  >
                    {a.url ? (
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onFocus={() => setPekKort(a.sted)}
                        onBlur={() => setPekKort(null)}
                        className={clsx(kort, 'hover:bg-flyd-linje-sand', dempet && 'opacity-40')}
                      >
                        {innhold}
                      </a>
                    ) : (
                      <div className={clsx(kort, dempet && 'opacity-40')}>{innhold}</div>
                    )}
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </MotionConfig>
      </div>
    </div>
  );
}
