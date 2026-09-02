'use client';

import Image from 'next/image';

type Card = {
  src: string;
  alt: string;
  /** aspect ratio expressed as a tailwind-style class */
  ratio: string;
};

// Kortformatet følger kildebildets orientering: liggende foto i liggende kort,
// stående foto i stående kort. Kildene er 1000 px på lengste side (DSC_5138 er
// et 1200×1600-utsnitt), så et liggende foto i et stående kort ville blitt
// beskåret av object-cover og strukket på Retina når kortene nå er opptil
// 370 px brede.
const columnA: Card[] = [
  { src: '/header/ig-1.webp', alt: 'Fra Flyd-hverdagen', ratio: 'aspect-[3/4]' },
  { src: '/header/office-1.webp', alt: 'Flyd-kontoret', ratio: 'aspect-[4/3]' },
  { src: '/header/ig-4.webp', alt: 'Flyd-teamet i arbeid', ratio: 'aspect-[4/5]' },
  { src: '/header/ig-3.webp', alt: 'Fra Flyd-hverdagen', ratio: 'aspect-[4/3]' },
  { src: '/header/office-3.webp', alt: 'Flyd-kontoret', ratio: 'aspect-square' },
];

// Høyre kolonne blør 20 px forbi viewportkanten – motiver med ansikter helt
// ute i høyre bildekant hører derfor hjemme i venstre kolonne.
const columnB: Card[] = [
  { src: '/header/office-4.webp', alt: 'Flyd-teamet i arbeid', ratio: 'aspect-[4/3]' },
  { src: '/header/DSC_5138.webp', alt: 'Flyd-teamet i arbeid', ratio: 'aspect-[3/4]' },
  { src: '/header/ig-2.webp', alt: 'Fra Flyd-hverdagen', ratio: 'aspect-[4/3]' },
  { src: '/header/office-2.webp', alt: 'Møte hos Flyd', ratio: 'aspect-square' },
  { src: '/header/DSC_4439.webp', alt: 'Flyd-kontoret', ratio: 'aspect-[4/3]' },
];

// Settet gjentas tre ganger og sporet flyttes én settlengde per runde. Med to
// kopier ble sporet kortere enn 100vh på høye viewporter (iPad Pro i lg,
// 2560×1440) og viste en tom stripe før hoppet.
const REPEAT = 3;

function MosaicCard({
  card,
  decorative,
  className,
  src = card.src,
}: {
  card: Card;
  decorative: boolean;
  /** størrelse/plassering – kolonne (bredde) eller stripe (høyde) */
  className: string;
  /** alternativ bildefil, f.eks. den lille mobilversjonen */
  src?: string;
}) {
  return (
    <div
      className={`relative ${className} ${card.ratio} overflow-hidden rounded-2xl bg-flyd-ink/5 shadow-[0_22px_48px_-26px_rgba(31,31,31,0.35),0_2px_6px_-2px_rgba(76,142,147,0.15)] ring-1 ring-flyd-ink/5`}
      aria-hidden={decorative || undefined}
    >
      {/* Ingen priority: mosaikken er skjult under lg, og preload lastet
          bildene unødig på mobil. Lazy henter dem kun når de faktisk vises;
          de to øverste kortene preloades media-gated fra app/page.tsx så
          LCP på desktop ikke venter på et lazy-oppdaget bilde. */}
      <Image
        src={src}
        alt={decorative ? '' : card.alt}
        fill
        sizes="(min-width:1024px) 21vw, 40vw"
        className="object-cover"
      />
      {/* subtle warm treatment so the mosaic sits cleanly against paper background */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{ background: 'linear-gradient(180deg, rgba(31,31,31,0.02), rgba(76,142,147,0.06))' }}
      />
    </div>
  );
}

function MosaicColumn({
  cards,
  duration,
  delay = 0,
}: {
  cards: Card[];
  duration: number;
  delay?: number;
}) {
  const loop = Array.from({ length: REPEAT }, () => cards).flat();
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="hero-mosaic-track flex flex-col"
        style={{
          animation: `hero-mosaic-up ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
          willChange: 'transform',
        }}
      >
        {loop.map((card, i) => (
          // Kun første sett har alt-tekst; kopiene er rent visuelle.
          <MosaicCard
            key={`${card.src}-${i}`}
            card={card}
            decorative={i >= cards.length}
            className="mb-5 w-full"
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroMosaic() {
  return (
    <>
      {/* keyframes scoped to this component */}
      <style>{`
        @keyframes hero-mosaic-up {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(0, -${(100 / REPEAT).toFixed(4)}%, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-mosaic-track { animation: none !important; }
        }
      `}</style>

      {/*
        Absolute + inset-0 means this component contributes NOTHING to the
        parent's intrinsic size. The parent (hero media column) must have
        position: relative and overflow-hidden – the parent decides the height,
        and everything here is clipped to it. The track inside can be taller
        than the container; it just scrolls and gets clipped.

        Forelderen strekker seg helt ut til høyre viewportkant (se
        .hero-bleed-right i globals.css). Rutenettet er 20 px bredere enn
        forelderen og forankret i høyre kant, slik at høyre kolonne blør forbi
        kanten og de avrundede hjørnene ikke henger på skjermkanten.
        max-w gir kort på maks ~370 px – grensen for hva kildebildene tåler
        på 2× DPR – og på svært brede skjermer blir luften mot teksten større
        i stedet for at kortene vokser.
      */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 -right-5 grid w-[calc(100%+1.25rem)] max-w-[760px] grid-cols-2 gap-x-5">
          <MosaicColumn cards={columnA} duration={74} />
          <div className="pt-16 overflow-hidden">
            <MosaicColumn cards={columnB} duration={86} delay={-24} />
          </div>
        </div>

        {/* top + bottom fades blend the moving edges into paper background.
            Bunnen er helt dekkende de nederste ~25 px så ingen kortsilhuett
            står igjen mot den blågrønne stats-seksjonen rett under. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-flyd-paper to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-flyd-paper from-[15%] via-flyd-paper/70 via-[45%] to-transparent" />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------------ */

// Mobil/tablett (< lg): én lav, horisontal stripe under hero-teksten i stedet
// for kolonnene. Formatene veksler for rytme; det lyse gruppebildet først
// siden det er det som er synlig ved lasting.
const stripCards: Card[] = [
  columnA[1], // office-1    4/3
  columnB[1], // DSC_5138    3/4
  columnB[2], // ig-2        4/3
  columnA[2], // ig-4        4/5
  columnB[4], // DSC_4439    4/3
  columnB[3], // office-2    1/1
  columnA[0], // ig-1        3/4
  columnA[3], // ig-3        4/3
  columnA[4], // office-3    1/1
  columnB[0], // office-4    4/3
];

// To kopier holder: ett sett er ~1800 px bredt, langt mer enn noen viewport
// under lg, så en -50 %-loop er sømløs.
const STRIP_REPEAT = 2;

/** Liten mobilversjon (640 px langside) – desktopfilene er 2–4× større. */
const smallSrc = (src: string) => src.replace('/header/', '/header/sm/');

export function HeroMosaicStrip() {
  const loop = Array.from({ length: STRIP_REPEAT }, () => stripCards).flat();
  return (
    <>
      <style>{`
        @keyframes hero-mosaic-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-${(100 / STRIP_REPEAT).toFixed(4)}%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-strip-track { animation: none !important; }
          /* Uten bevegelse: la brukeren bla i stripen selv i stedet. */
          .hero-strip { overflow-x: auto; }
        }
      `}</style>

      <div className="hero-strip relative w-full overflow-hidden touch-pan-y">
        <div
          className="hero-strip-track flex w-max gap-3 md:gap-4"
          style={{
            animation: `hero-mosaic-left 70s linear infinite`,
            willChange: 'transform',
          }}
        >
          {loop.map((card, i) => (
            <MosaicCard
              key={`${card.src}-${i}`}
              card={card}
              decorative={i >= stripCards.length}
              className="h-40 shrink-0 md:h-48"
              src={smallSrc(card.src)}
            />
          ))}
        </div>

        {/* side fades blend the moving edges into paper background */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-flyd-paper to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-flyd-paper to-transparent" />
      </div>
    </>
  );
}
