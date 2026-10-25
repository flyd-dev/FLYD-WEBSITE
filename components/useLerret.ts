'use client';

import { useEffect, type RefObject } from 'react';

type Motor = {
  tegn: (tid: number) => void;
  tilpass: (b: number, h: number, dpr: number) => void;
  rydd?: () => void;
};

/**
 * Motor for animerte lerreter (GlassBrett): starter først når flaten nærmer
 * seg skjermen (så shaderen ikke kompileres mens siden lastes), tilpasser
 * lerretet til elementet, tegner bare mens flaten er synlig, og tegner ett
 * stillbilde ved prefers-reduced-motion. `tegn` får tid i sekunder.
 */
export function useLerret(
  ref: RefObject<HTMLCanvasElement>,
  oppsett: (lerret: HTMLCanvasElement) => Motor | null,
  { maksDpr = 1.5, fps = 60 }: { maksDpr?: number; fps?: number } = {},
) {
  useEffect(() => {
    const lerret = ref.current;
    if (!lerret) return;
    const rolig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let motor: Motor | null = null;
    let ramme = 0;
    let synlig = false;
    let sist = 0;
    const start = performance.now();
    const intervall = 1000 / fps;
    const naa = () => (rolig ? 12 : (performance.now() - start) / 1000);

    const tilpass = () => {
      if (!motor) return;
      const dpr = Math.min(window.devicePixelRatio || 1, maksDpr);
      const { width, height } = lerret.getBoundingClientRect();
      lerret.width = Math.max(1, Math.round(width * dpr));
      lerret.height = Math.max(1, Math.round(height * dpr));
      motor.tilpass(width, height, dpr);
      if (rolig || !synlig) motor.tegn(naa());
    };
    const løkke = (tid: number) => {
      ramme = requestAnimationFrame(løkke);
      if (tid - sist < intervall) return;
      sist = tid;
      motor?.tegn((tid - start) / 1000);
    };
    const ro = new ResizeObserver(tilpass);
    const io = new IntersectionObserver(
      ([e]) => {
        synlig = e.isIntersecting;
        if (synlig && !motor) {
          motor = oppsett(lerret);
          if (!motor) {
            io.disconnect();
            return;
          }
          ro.observe(lerret);
          tilpass();
        }
        if (rolig || !motor) return;
        if (synlig && !ramme) ramme = requestAnimationFrame(løkke);
        if (!synlig && ramme) {
          cancelAnimationFrame(ramme);
          ramme = 0;
        }
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(lerret);
    return () => {
      io.disconnect();
      ro.disconnect();
      if (ramme) cancelAnimationFrame(ramme);
      motor?.rydd?.();
    };
    // oppsett er stabil per komponent
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, maksDpr, fps]);
}
