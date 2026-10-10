'use client';

import { useSyncExternalStore } from 'react';
import { Typewriter } from '@/components/ui/typewriter';
import PauseToggle from '@/components/PauseToggle';

// Delt pausetilstand mellom typewriteren (inne i H1) og pauseknappen (utenfor
// H1, så knappens navn ikke blir en del av overskriften).
let paused = false;
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const getPaused = () => paused;
const togglePaused = () => {
  paused = !paused;
  listeners.forEach((fn) => fn());
};
const usePaused = () => useSyncExternalStore(subscribe, getPaused, () => false);

export function HeroTypewriter({ text }: { text: string[] }) {
  return (
    <Typewriter
      text={text}
      speed={70}
      waitTime={1800}
      deleteSpeed={40}
      className="text-flyd-mint"
      cursorClassName="ml-1 text-flyd-mint"
      paused={usePaused()}
    />
  );
}

/** Pauseknapp for typewriteren i forsidens H1 (WCAG 2.2.2). */
export function HeroTypewriterPause({ className }: { className?: string }) {
  return (
    <PauseToggle
      paused={usePaused()}
      onToggle={togglePaused}
      what="animasjonen i overskriften"
      tone="dark"
      className={className}
    />
  );
}
