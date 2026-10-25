'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';

/**
 * Et kjernebudskap som avdekkes ord for ord mens du
 * scroller. Idé fra «Text Reveal» på 21st.dev. Teksten ligger ferdig i
 * HTML-en med full styrke (søkemotorer og uten JavaScript); skriptet demper
 * ordene som ikke er nådd ennå. Ordet er fullt synlig før avsnittet er
 * halvveis opp på skjermen, så ingen må lese dempet tekst. Står urørt ved
 * prefers-reduced-motion.
 */
export default function TekstAvdekking({ tekst, className }: { tekst: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const ord = tekst.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>('[data-ord]'));
    let raf = 0;
    const oppdater = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 når avsnittet kommer inn nederst (90 %), 1 når toppen er 45 % opp.
      const p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.45)));
      const n = spans.length;
      spans.forEach((s, i) => {
        const o = Math.min(1, Math.max(0, p * (n + 2) - i));
        s.style.opacity = String(0.22 + 0.78 * o);
      });
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
      spans.forEach((s) => (s.style.opacity = ''));
    };
  }, []);

  return (
    <p ref={ref} className={clsx(className)}>
      {ord.map((w, i) => (
        <span key={i} data-ord className="transition-opacity duration-150">
          {w}
          {i < ord.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}
