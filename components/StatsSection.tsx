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
        // ease-out quart — calm landing, no overshoot
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

export default function StatsSection({ stats }: { stats: Stat[] }) {
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

  const lineDuration = 800;
  const blockDelayBase = 550;
  const stagger = 160;
  const blockDuration = 900;
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

  return (
    <div ref={ref}>
      <div
        aria-hidden="true"
        className="h-px w-full bg-flyd-ink/25 mb-6 md:mb-8"
        style={{
          transformOrigin: 'left center',
          transform: inView ? 'scaleX(1)' : 'scaleX(0)',
          transition: reduced
            ? 'none'
            : `transform ${lineDuration}ms ${ease}`,
        }}
      />

      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
        {stats.map((s, i) => {
          const { num, suffix } = parseStat(s.value);
          const delay = blockDelayBase + i * stagger;
          const canCount = num !== null && num > 0;

          return (
            <div
              key={s.label}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(10px)',
                filter: inView ? 'blur(0px)' : 'blur(4px)',
                transition: reduced
                  ? 'none'
                  : `opacity ${blockDuration}ms ${ease} ${delay}ms, transform ${blockDuration}ms ${ease} ${delay}ms, filter ${blockDuration}ms ${ease} ${delay}ms`,
                willChange: 'opacity, transform, filter',
              }}
            >
              <div className="font-display text-3xl md:text-4xl font-semibold tracking-tighter text-flyd-ink tabular-nums">
                {canCount && !reduced ? (
                  <CountUp
                    target={num!}
                    suffix={suffix}
                    start={inView}
                    delay={delay}
                  />
                ) : (
                  s.value
                )}
              </div>
              <div className="mt-1.5 text-[11px] md:text-[12px] text-flyd-ink/75 leading-snug">
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
