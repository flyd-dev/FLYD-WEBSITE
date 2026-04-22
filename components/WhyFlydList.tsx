'use client';

import { useEffect, useRef, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

type Props = {
  items: string[];
};

export default function WhyFlydList({ items }: Props) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setChecked(items.map(() => true));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setChecked(items.map(() => true));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = itemRefs.current.findIndex((el) => el === entry.target);
          if (idx === -1) return;
          setChecked((prev) => {
            if (prev[idx]) return prev;
            const next = [...prev];
            // Small stagger so each row feels like it ticks in sequence
            setTimeout(() => {
              setChecked((p) => {
                if (p[idx]) return p;
                const n = [...p];
                n[idx] = true;
                return n;
              });
            }, idx * 90);
            return next;
          });
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.6, rootMargin: '0px 0px -15% 0px' },
    );

    itemRefs.current.forEach((el) => {
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, [items]);

  return (
    <ul className="lg:col-span-7 space-y-0 divide-y divide-flyd-paper/10 border-t border-b border-flyd-paper/10">
      {items.map((item, i) => (
        <li
          key={item}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          data-reveal
          className="flex items-start gap-5 py-5 md:py-6"
        >
          <span className="mt-0.5 inline-flex flex-shrink-0 items-center justify-center">
            <Checkbox
              checked={checked[i]}
              onCheckedChange={(v) =>
                setChecked((prev) => {
                  const next = [...prev];
                  next[i] = v === true;
                  return next;
                })
              }
              aria-label={item}
            />
          </span>
          <span
            className={[
              'text-[17px] leading-relaxed transition-colors duration-500',
              checked[i] ? 'text-flyd-paper' : 'text-flyd-paper/60',
            ].join(' ')}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
