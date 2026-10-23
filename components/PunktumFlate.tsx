import clsx from 'clsx';

/**
 * Bakgrunnen på de mørke flatene: et fint rutenett av små avrundede firkanter
 * – logoens punktum – som tones ut mot kantene, et mykt lys som driver sakte
 * over flaten, og noen få punktum som lyser svakt opp og slukner igjen, som
 * datapunkter. Idé fra «Dot Grid», «Vignette Grid» og «Background Snippets»
 * på 21st.dev, tegnet om etter manualen. Erstatter flytlinjene (for urolige).
 *
 * Rutenettet er sterkest øverst til høyre og svakt bak teksten til venstre.
 * Bare pynt (aria-hidden), ren CSS (.punktumflate i globals.css). Lyset står
 * stille og glimtene vises ikke ved prefers-reduced-motion.
 */

// Glimtene, i ruter fra høyre kant og fra toppen, så de havner der rutenettet er sterkest.
// Det fjerde er Korall – logoens punktum – de andre Mint.
const glimt: [number, number][] = [
  [3, 2],
  [9, 5],
  [6, 9],
  [14, 3],
  [19, 7],
  [25, 2],
  [12, 11],
];

export type PunktumTone = 'skog' | 'petrol' | 'teal';

export default function PunktumFlate({ tone = 'skog', className }: { tone?: PunktumTone; className?: string }) {
  return (
    <div aria-hidden="true" className={clsx('punktumflate', `punktumflate-${tone}`, className)}>
      <div className="punktumflate-lys" />
      <div className="punktumflate-rutenett">
        {glimt.map(([x, y], i) => (
          <span
            key={i}
            className={clsx('punktumflate-glimt', i === 3 && 'punktumflate-glimt-korall')}
            style={{ '--x': x, '--y': y, '--i': i } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
