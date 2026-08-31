'use client';

import { useEffect, useRef } from 'react';
import type { PointerEvent as ReactPointerEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import Image from 'next/image';
import { customerLogos } from '@/data/logos';

/** Sekunder på én runde når karusellen ruller av seg selv. Samme tempo som før. */
const LOOP_SECONDS = 40;
/** Kopier av lista. Ekstra kopier gjør at dragging aldri avslører tomrom i endene. */
const SETS = 3;
/** Hvor raskt farten etter et slipp dør ut. Høyere tall = kortere etterslep. */
const FRICTION = 3;
/** Tak på etterslepet (px/sek) så et hardt kast ikke spinner ut av kontroll. */
const MAX_FLING = 2400;
/** Piltast flytter denne lengden; med Shift går det raskere. */
const KEY_STEP = 80;

export default function LogoMarquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);

  // Alt som endrer seg per frame lever i refs — vi vil ikke rendre på nytt 60 ganger i sekundet.
  const offset = useRef(0);
  const setWidth = useRef(0);
  const fling = useRef(0);
  const dragging = useRef(false);
  const activePointer = useRef<number | null>(null);
  const lastX = useRef(0);
  const lastMoveAt = useRef(0);
  const hovering = useRef(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const firstSet = firstSetRef.current;
    if (!viewport || !track || !firstSet) return;

    // Bredden på ett sett er løkkelengden. Den måles på nytt når bildene har lastet.
    const measure = () => {
      setWidth.current = firstSet.offsetWidth;
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(firstSet);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      reducedMotion.current = motionQuery.matches;
    };
    syncMotion();
    motionQuery.addEventListener('change', syncMotion);

    let frame = 0;
    let previous = performance.now();

    const start = () => {
      if (frame) return;
      previous = performance.now(); // ikke ta igjen tapt tid — start der vi slapp
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const tick = (now: number) => {
      // Kutt lange sprang (bytte av fane) så karusellen ikke hopper når man kommer tilbake.
      const elapsed = Math.min((now - previous) / 1000, 0.1);
      previous = now;
      const width = setWidth.current;

      if (width > 0) {
        if (!dragging.current) {
          const autoSpeed = reducedMotion.current || hovering.current ? 0 : width / LOOP_SECONDS;
          offset.current += (fling.current - autoSpeed) * elapsed;
          fling.current *= Math.exp(-FRICTION * elapsed);
          if (Math.abs(fling.current) < 1) fling.current = 0;
        }

        // Hold posisjonen i (-width, 0]. Da ligger det alltid et likt sett på hver side,
        // og løkka er sømløs uansett hvilken vei man drar.
        let wrapped = offset.current % width;
        if (wrapped > 0) wrapped -= width;
        offset.current = wrapped;
        track.style.transform = `translate3d(${wrapped}px, 0, 0)`;
      }

      frame = requestAnimationFrame(tick);
    };

    // Karusellen står stille til den er på skjermen. Ellers ville den ha rullet
    // ferdig halve runden mens folk fortsatt leser toppen av siden, og de
    // viktigste kundene var passert før noen så dem. Sparer også CPU.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.5 },
    );
    visibility.observe(viewport);

    return () => {
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();
      motionQuery.removeEventListener('change', syncMotion);
    };
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    dragging.current = true;
    activePointer.current = event.pointerId;
    lastX.current = event.clientX;
    lastMoveAt.current = performance.now();
    fling.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current || event.pointerId !== activePointer.current) return;
    const now = performance.now();
    const dx = event.clientX - lastX.current;
    const seconds = (now - lastMoveAt.current) / 1000;
    offset.current += dx;
    if (seconds > 0) {
      // Glatt ut farten litt, ellers avgjør det siste lille rykket hele etterslepet.
      fling.current = fling.current * 0.7 + (dx / seconds) * 0.3;
    }
    lastX.current = event.clientX;
    lastMoveAt.current = now;
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current || event.pointerId !== activePointer.current) return;
    dragging.current = false;
    activePointer.current = null;
    // Holdt fingeren stille før slipp? Da skal den bli stående, ikke kastes videre.
    if (performance.now() - lastMoveAt.current > 100) fling.current = 0;
    fling.current = Math.max(-MAX_FLING, Math.min(MAX_FLING, fling.current));
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? KEY_STEP * 3 : KEY_STEP;
    if (event.key === 'ArrowLeft') {
      offset.current += step;
      event.preventDefault();
    } else if (event.key === 'ArrowRight') {
      offset.current -= step;
      event.preventDefault();
    }
  };

  return (
    <div
      ref={viewportRef}
      // touch-pan-y: loddrett sidescroll på mobil er fortsatt nettleserens jobb,
      // vannrett drag er vår.
      className="relative w-full cursor-grab select-none overflow-hidden py-4 touch-pan-y active:cursor-grabbing"
      role="region"
      aria-label="Et utvalg kunder. Dra til siden eller bruk piltastene for å bla."
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      // Hover-pause gjelder kun mus. Uten sjekken ville et tapp på mobil sette
      // karusellen permanent på pause.
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') hovering.current = true;
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') hovering.current = false;
      }}
      onKeyDown={handleKeyDown}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-flyd-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-flyd-paper to-transparent" />

      <div
        ref={trackRef}
        className="flex w-max items-center"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      >
        {Array.from({ length: SETS }).map((_, setIndex) => (
          <div
            key={setIndex}
            ref={setIndex === 0 ? firstSetRef : undefined}
            className="flex shrink-0 items-center"
          >
            {customerLogos.map((logo, i) => (
              <div
                key={logo.name}
                className="mr-20 flex h-10 flex-shrink-0 items-center justify-center opacity-50 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0"
                title={logo.name}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={40}
                  sizes="160px"
                  className="h-10 w-auto object-contain"
                  draggable={false}
                  priority={setIndex === 0 && i < 6}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Selve sporet er duplisert og skjult for skjermlesere — her er kundene som tekst. */}
      <ul className="sr-only">
        {customerLogos.map((logo) => (
          <li key={logo.name}>{logo.name}</li>
        ))}
      </ul>
    </div>
  );
}
