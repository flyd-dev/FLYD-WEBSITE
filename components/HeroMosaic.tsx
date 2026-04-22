'use client';

import Image from 'next/image';

type Card = {
  src: string;
  alt: string;
  /** aspect ratio expressed as a tailwind-style class */
  ratio: string;
};

const columnA: Card[] = [
  { src: '/header/ig-1.jpg', alt: 'Fra Flyd-hverdagen', ratio: 'aspect-[3/4]' },
  { src: '/header/office-1.jpg', alt: 'Flyd-kontoret', ratio: 'aspect-[4/3]' },
  { src: '/header/ig-4.jpg', alt: 'Flyd-teamet i arbeid', ratio: 'aspect-[4/5]' },
  { src: '/header/office-2.jpg', alt: 'Møte hos Flyd', ratio: 'aspect-[3/4]' },
  { src: '/header/office-3.jpg', alt: 'Flyd-kontoret', ratio: 'aspect-[4/3]' },
];

const columnB: Card[] = [
  { src: '/header/office-4.jpg', alt: 'Flyd-teamet i arbeid', ratio: 'aspect-[3/4]' },
  { src: '/header/ig-2.jpg', alt: 'Fra Flyd-hverdagen', ratio: 'aspect-[4/3]' },
  { src: '/header/office-5.jpg', alt: 'Flyd-kontoret', ratio: 'aspect-[4/5]' },
  { src: '/header/ig-3.jpg', alt: 'Fra Flyd-hverdagen', ratio: 'aspect-[4/3]' },
  { src: '/header/office-6.jpg', alt: 'Flyd-teamet i arbeid', ratio: 'aspect-[3/4]' },
];

function MosaicCard({ card, priority }: { card: Card; priority?: boolean }) {
  return (
    <div
      className={`relative mb-4 w-full ${card.ratio} overflow-hidden rounded-[14px] bg-flyd-ink/5 shadow-[0_18px_40px_-24px_rgba(31,31,31,0.35),0_2px_6px_-2px_rgba(76,142,147,0.15)] ring-1 ring-flyd-ink/5`}
    >
      <Image
        src={card.src}
        alt={card.alt}
        fill
        sizes="(min-width:1024px) 18vw, 40vw"
        className="object-cover"
        priority={priority}
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
  priority,
}: {
  cards: Card[];
  duration: number;
  delay?: number;
  priority?: boolean;
}) {
  // duplicate once for a seamless 50% translate loop
  const loop = [...cards, ...cards];
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
          <MosaicCard
            key={`${card.src}-${i}`}
            card={card}
            priority={priority && i < 2}
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
          100% { transform: translate3d(0, -50%, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-mosaic-track { animation: none !important; }
        }
      `}</style>

      {/*
        Absolute + inset-0 means this component contributes NOTHING to the
        parent's intrinsic size. The parent (hero media column) must have
        position: relative and overflow-hidden — the parent decides the height,
        and everything here is clipped to it. The track inside can be taller
        than the container; it just scrolls and gets clipped.
      */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative mx-auto grid h-full max-w-[520px] grid-cols-2 gap-x-4">
          <MosaicColumn cards={columnA} duration={46} priority />
          <div className="pt-10 overflow-hidden">
            <MosaicColumn cards={columnB} duration={58} delay={-14} />
          </div>

          {/* top + bottom fades blend the moving edges into paper background */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-flyd-paper to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-flyd-paper to-transparent z-10" />
        </div>
      </div>
    </>
  );
}
