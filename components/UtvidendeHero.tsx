'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';

/**
 * Heltekortet på forsiden starter innrykket med radius 24 px og
 * vokser til full bredde (uten radius – utfallende bilde) mens du scroller
 * forbi det. Idé fra «Scroll Expansion Hero» på 21st.dev, men teksten står
 * stille og er synlig fra første stund, så H1 og typewriteren er urørt.
 *
 * Bare clip-path endres (ingen layout per bilde). Scrolllytteren setter én
 * CSS-variabel, --utvid (0–1). Ved prefers-reduced-motion står kortet som
 * innrykket kort.
 */
export default function UtvidendeHero({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const oppdater = () => {
      raf = 0;
      // Full bredde når en drøy tredel av kortet er scrollet forbi.
      const p = Math.min(1, Math.max(0, window.scrollY / (el.offsetHeight * 0.38)));
      el.style.setProperty('--utvid', p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(oppdater);
    };
    oppdater();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        // Innrykket fra start: kortet flukter med innholdsbredden på store skjermer.
        '[--hero-inn:max(12px,calc((100vw_-_1280px)_/_2))] md:[--hero-inn:max(20px,calc((100vw_-_1280px)_/_2))]',
        className,
      )}
      style={
        {
          '--utvid': 0,
          clipPath:
            'inset(0 calc(var(--hero-inn) * (1 - var(--utvid))) round calc(24px * (1 - var(--utvid))))',
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
