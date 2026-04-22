'use client';

import { useEffect } from 'react';

export default function Reveal() {
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

    // Mark everything hidden first, then reveal as they intersect.
    els.forEach((el) => el.setAttribute('data-reveal', 'hidden'));

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
    // doesn't fire IntersectionObserver consistently) — reveal it.
    const fallback = window.setTimeout(() => {
      document
        .querySelectorAll('[data-reveal="hidden"]')
        .forEach((el) => reveal(el));
    }, 1200);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return null;
}
