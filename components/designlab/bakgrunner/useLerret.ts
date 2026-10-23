'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Felles motor for bakgrunnene i designlab: tilpasser lerretet til elementet,
 * tegner bare når flaten er synlig (IntersectionObserver), og tegner ett
 * stillbilde ved prefers-reduced-motion. `tegn` får tid i sekunder.
 */
export function useLerret(
  ref: RefObject<HTMLCanvasElement>,
  oppsett: (lerret: HTMLCanvasElement) => null | {
    tegn: (tid: number) => void;
    tilpass: (b: number, h: number, dpr: number) => void;
    rydd?: () => void;
  },
  { maksDpr = 1.5, fps = 60 }: { maksDpr?: number; fps?: number } = {},
) {
  useEffect(() => {
    const lerret = ref.current;
    if (!lerret) return;
    const motor = oppsett(lerret);
    if (!motor) return;
    const rolig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ramme = 0;
    let synlig = false;
    let sist = 0;
    const start = performance.now();
    const intervall = 1000 / fps;

    const tilpass = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maksDpr);
      const { width, height } = lerret.getBoundingClientRect();
      lerret.width = Math.max(1, Math.round(width * dpr));
      lerret.height = Math.max(1, Math.round(height * dpr));
      motor.tilpass(width, height, dpr);
      if (rolig || !synlig) motor.tegn(rolig ? 12 : (performance.now() - start) / 1000);
    };
    const løkke = (na: number) => {
      ramme = requestAnimationFrame(løkke);
      if (na - sist < intervall) return;
      sist = na;
      motor.tegn((na - start) / 1000);
    };
    const io = new IntersectionObserver(([e]) => {
      synlig = e.isIntersecting;
      if (rolig) return;
      if (synlig && !ramme) ramme = requestAnimationFrame(løkke);
      if (!synlig && ramme) {
        cancelAnimationFrame(ramme);
        ramme = 0;
      }
    });
    const ro = new ResizeObserver(tilpass);
    ro.observe(lerret);
    io.observe(lerret);
    tilpass();
    return () => {
      io.disconnect();
      ro.disconnect();
      if (ramme) cancelAnimationFrame(ramme);
      motor.rydd?.();
    };
    // oppsett er stabil per komponent
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, maksDpr, fps]);
}
