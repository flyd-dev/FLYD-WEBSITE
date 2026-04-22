'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

type Props = {
  targetRef: React.RefObject<HTMLElement>;
};

export default function ScrollProgressLine({ targetRef }: Props) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-3 top-28 bottom-10 z-30 hidden md:block lg:left-6"
    >
      <div className="absolute inset-0 w-px bg-flyd-ink/15 mix-blend-difference" />
      <motion.div
        style={{ scaleY }}
        className="absolute inset-0 w-px bg-flyd-teal origin-top"
      />
    </div>
  );
}

export function ScrollProgressLineWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref}>
      <ScrollProgressLine targetRef={ref} />
      {children}
    </div>
  );
}
