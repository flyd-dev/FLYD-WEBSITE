'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Reveal() {
  // Re-kjør ved klientnavigasjon – layouten (og dermed denne komponenten)
  // beholdes på tvers av sider, så uten pathname-avhengigheten ville nye
  // siders [data-reveal]-elementer aldri bli observert.
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.setAttribute('data-reveal', 'shown'));
      return;
    }
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      els.forEach((el) => el.setAttribute('data-reveal', 'shown'));
      return;
    }

    // Innhold som allerede er synlig i viewporten (typisk hero) skal ALDRI
    // skjules og tones inn igjen – det utsetter LCP med flere sekunder fordi
    // siste maling teller. Kun elementer under folden får reveal-animasjon.
    const initiallyVisible = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };
    els.forEach((el) => {
      el.setAttribute('data-reveal', initiallyVisible(el) ? 'shown' : 'hidden');
    });

    const reveal = (el: Element) => {
      (el as HTMLElement).setAttribute('data-reveal', 'shown');
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -10% 0px' },
    );
    els.forEach((el) => io.observe(el));

    // Safety net: any element still hidden after 1.2s (e.g. bot/headless that
    // doesn't fire IntersectionObserver consistently) – reveal it.
    const fallback = window.setTimeout(() => {
      document
        .querySelectorAll('[data-reveal="hidden"]')
        .forEach((el) => reveal(el));
    }, 1200);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [pathname]);

  return null;
}
