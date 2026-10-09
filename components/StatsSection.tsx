'use client';

import { useEffect, useRef, useState } from 'react';
import type { Stat } from '@/data/stats';

// [BEKREFT]-merknader vises lokalt og på forhåndsvisninger, aldri i produksjon.
const visBekreft = process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production';

function parseStat(value: string): { num: number | null; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { num: null, suffix: value };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

function CountUp({
  target,
  suffix,
  start,
  delay,
  duration = 1600,
}: {
  target: number;
  suffix: string;
  start: boolean;
  delay: number;
  duration?: number;
}) {
  // Starter på måltallet, så HTML-en og første render har det ekte tallet.
  const [display, setDisplay] = useState(target);
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (!start) return;
    setDisplay(0);
    setDone(false);
    let raf = 0;
    let startTime: number | null = null;
    const timeout = window.setTimeout(() => {
      const tick = (now: number) => {
        if (startTime === null) startTime = now;
        const progress = Math.min((now - startTime) / duration, 1);
        // ease-out quart – calm landing, no overshoot
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplay(Math.round(target * eased));
        if (progress < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setDone(true);
        }
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [start, target, duration, delay]);

  return (
    <>
      {display}
      <span
        style={{
          opacity: done ? 1 : 0,
          transition: 'opacity 400ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {suffix}
      </span>
    </>
  );
}

// Nøkkeltall: stort tall i Petrol med farget topplinje – teal, mint, korall.
const topLines = ['bg-flyd-teal', 'bg-flyd-mint', 'bg-flyd-korall', 'bg-flyd-petrol'];

export default function StatsSection({
  stats,
  columns = 4,
}: {
  stats: Stat[];
  /** 4 på forsiden; 3 der tallene står i en smalere kolonne. */
  columns?: 3 | 4;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Server-HTML og første render viser tallene ferdig. Animasjonen tar over
  // bare når seksjonen ligger under bretten ved innlasting.
  const [animate, setAnimate] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const alreadyVisible = el.getBoundingClientRect().top < window.innerHeight;
    if (prefersReduced || alreadyVisible) return;
    setAnimate(true);
    setInView(false);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const blockDelayBase = 150;
  const stagger = 140;
  const blockDuration = 800;
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

  return (
    <div
      ref={ref}
      className={`grid gap-x-6 gap-y-10 md:gap-8 ${
        columns === 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4'
      }`}
    >
      {stats.map((s, i) => {
        const { num, suffix } = parseStat(s.value);
        const delay = blockDelayBase + i * stagger;
        const canCount = animate && num !== null && num > 0;

        return (
          <div key={s.label}>
            {/* Farget topplinje (designmanualen «Nøkkeltall»). */}
            <div
              aria-hidden="true"
              className={`h-1 w-full rounded-pille ${topLines[i % topLines.length]}`}
              style={{
                transformOrigin: 'left center',
                transform: inView ? 'scaleX(1)' : 'scaleX(0)',
                transition: !animate ? 'none' : `transform ${blockDuration}ms ${ease} ${delay}ms`,
              }}
            />
            <div
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(8px)',
                transition: !animate
                  ? 'none'
                  : `opacity ${blockDuration}ms ${ease} ${delay + 200}ms, transform ${blockDuration}ms ${ease} ${delay + 200}ms`,
              }}
            >
              <div
                className={`mt-5 font-display font-semibold leading-none tracking-[-0.01em] text-flyd-petrol tabular-nums ${
                  columns === 3 ? 'text-[34px] md:text-[44px]' : 'text-[44px] md:text-[56px]'
                }`}
              >
                {canCount ? (
                  <CountUp target={num!} suffix={suffix} start={inView} delay={delay + 200} />
                ) : (
                  s.value
                )}
              </div>
              <div className="mt-2 text-[15px] leading-snug text-flyd-skifer">{s.label}</div>
              {visBekreft && !s.bekreftet && (
                <div className="mt-1 text-[13px] font-medium text-flyd-skog">
                  [BEKREFT: tallet]
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
