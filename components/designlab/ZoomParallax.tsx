'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

/**
 * Prototype (designlab): sju bilder fra kontorene som zoomer ut av hverandre
 * mens du scroller, til midtbildet – flyd-logoen på glassveggen i Egersund –
 * fyller det meste av skjermen. Idé fra «Zoom Parallax» (Efferd) på 21st.dev.
 * Ekte Flyd-folk, ingen filtre. Midtbildet stopper på 3× (ca. 75 % av
 * skjermen), så det ikke blir uskarpt, og radiusen deles på skalaen, så
 * hjørnene er 24 px på skjermen gjennom hele zoomen.
 *
 * Ved prefers-reduced-motion blir det en vanlig bildemosaikk uten scrolleffekt.
 * Valget tas etter lasting, så server og klient rendrer likt første gang.
 */
export type ZoomBilde = { src: string; alt: string };

// Plassering i forhold til midten (vw/vh), som i originalen. Indeks 0 er midtbildet.
const plass: React.CSSProperties[] = [
  { width: '25vw', height: '25vh' },
  { top: '-30vh', left: '5vw', width: '35vw', height: '30vh' },
  { top: '-10vh', left: '-25vw', width: '20vw', height: '45vh' },
  { left: '27.5vw', width: '25vw', height: '25vh' },
  { top: '27.5vh', left: '5vw', width: '20vw', height: '25vh' },
  { top: '27.5vh', left: '-22.5vw', width: '30vw', height: '25vh' },
  { top: '22.5vh', left: '25vw', width: '15vw', height: '15vh' },
];

function useRedusertBevegelse() {
  const [redusert, setRedusert] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setRedusert(mq.matches);
    const f = () => setRedusert(mq.matches);
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);
  return redusert;
}

export default function ZoomParallax({ bilder }: { bilder: ZoomBilde[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const redusert = useRedusertBevegelse();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const s3 = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const s5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const s6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const s8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const s9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const skala: MotionValue<number>[] = [s3, s5, s6, s5, s6, s8, s9];
  const r3 = useTransform(s3, (v) => 24 / v);
  const r5 = useTransform(s5, (v) => 24 / v);
  const r6 = useTransform(s6, (v) => 24 / v);
  const r8 = useTransform(s8, (v) => 24 / v);
  const r9 = useTransform(s9, (v) => 24 / v);
  const radius: MotionValue<number>[] = [r3, r5, r6, r5, r6, r8, r9];

  if (redusert) {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {bilder.slice(0, 4).map((b) => (
          <div key={b.src} className="relative aspect-[4/5] overflow-hidden rounded-bilde bg-flyd-lysmint">
            <Image src={b.src} alt={b.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[240vh] md:h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {bilder.slice(0, plass.length).map((b, i) => (
          <motion.div
            key={b.src}
            style={{ scale: skala[i] }}
            className="absolute inset-0 flex items-center justify-center will-change-transform"
          >
            <motion.div
              className="relative overflow-hidden bg-flyd-lysmint"
              style={{ ...plass[i], borderRadius: radius[i] }}
            >
              <Image
                src={b.src}
                alt={b.alt}
                fill
                sizes={i === 0 ? '100vw' : '40vw'}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
