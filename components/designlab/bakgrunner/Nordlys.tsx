import clsx from 'clsx';

/**
 * «Nordlys» (designlab): myke lysfelt i Flyd-teal og Mint som driver sakte
 * over den mørke flaten, med et fint korn over, så gradientene ikke får
 * striper. Idé fra «Aurora», «Silk shader» og «Mesh Gradient» på 21st.dev.
 * Ren CSS (radialgradienter som flyttes med transform) og en liten
 * støytekstur som SVG. Står stille ved prefers-reduced-motion.
 */
export default function Nordlys({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={clsx('nordlys absolute inset-0 overflow-hidden', className)}>
      <span className="nordlys-felt nordlys-felt-1" />
      <span className="nordlys-felt nordlys-felt-2" />
      <span className="nordlys-felt nordlys-felt-3" />
      <span className="nordlys-korn" />
    </div>
  );
}
