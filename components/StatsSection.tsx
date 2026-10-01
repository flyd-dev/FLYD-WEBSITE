'use client';

import { useEffect, useRef, useState } from 'react';

type Stat = { value: string; label: string };

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
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return;
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
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) {
      setReduced(true);
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
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
        const canCount = num !== null && num > 0;

        return (
          <div key={s.label}>
            {/* Farget topplinje (designmanualen «Nøkkeltall»). */}
            <div
              aria-hidden="true"
              className={`h-1 w-full rounded-pille ${topLines[i % topLines.length]}`}
              style={{
                transformOrigin: 'left center',
                transform: inView ? 'scaleX(1)' : 'scaleX(0)',
                transition: reduced ? 'none' : `transform ${blockDuration}ms ${ease} ${delay}ms`,
              }}
            />
            <div
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(8px)',
                transition: reduced
                  ? 'none'
                  : `opacity ${blockDuration}ms ${ease} ${delay + 200}ms, transform ${blockDuration}ms ${ease} ${delay + 200}ms`,
              }}
            >
              <div
                className={`mt-5 font-display font-semibold leading-none tracking-[-0.01em] text-flyd-petrol tabular-nums ${
                  columns === 3 ? 'text-[34px] md:text-[44px]' : 'text-[44px] md:text-[56px]'
                }`}
              >
                {canCount && !reduced ? (
                  <CountUp target={num!} suffix={suffix} start={inView} delay={delay + 200} />
                ) : (
                  s.value
                )}
              </div>
              <div className="mt-2 text-[15px] leading-snug text-flyd-skifer">{s.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
