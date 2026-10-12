'use client';

import { useEffect } from 'react';

/**
 * Én felles pekerlytter for hele nettstedet:
 * - `.lys`: lyskjeglen i kortet følger pekeren (--mx/--my).
 * - `.magnet`: knappen trekkes noen piksler mot pekeren (--tx/--ty).
 * Bare med mus/styreplate og uten prefers-reduced-motion. Lytteren er passiv
 * og gjør maks én oppdatering per bilde, så den påvirker ikke INP.
 */
export default function PointerFx() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    let frame = 0;
    let last: PointerEvent | null = null;
    let magnet: HTMLElement | null = null;

    const update = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const target = e.target instanceof Element ? e.target : null;

      const lys = target?.closest<HTMLElement>('.lys');
      if (lys) {
        const r = lys.getBoundingClientRect();
        lys.style.setProperty('--mx', `${e.clientX - r.left}px`);
        lys.style.setProperty('--my', `${e.clientY - r.top}px`);
      }

      const m = target?.closest<HTMLElement>('.magnet') ?? null;
      if (magnet && magnet !== m) {
        magnet.style.removeProperty('--tx');
        magnet.style.removeProperty('--ty');
      }
      magnet = m;
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        m.style.setProperty('--tx', `${(dx * 8).toFixed(1)}px`);
        m.style.setProperty('--ty', `${(dy * 6).toFixed(1)}px`);
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(update);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
