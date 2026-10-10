import clsx from 'clsx';

/**
 * «Flyt»: myke linjer som tegnes inn og glir sakte videre – navnet Flyd som
 * bevegelse. Bare pynt (aria-hidden), ren SVG og CSS, ingen JavaScript.
 * Mint på mørk bunn, Flyd-teal på lys. Står stille ved prefers-reduced-motion.
 */
const paths = [
  'M-40 260 C 160 120, 340 360, 560 220 S 900 80, 1140 200',
  'M-40 300 C 180 170, 360 400, 580 260 S 920 130, 1140 250',
  'M-40 340 C 200 220, 380 440, 600 300 S 940 180, 1140 300',
  'M-40 380 C 220 270, 400 480, 620 340 S 960 230, 1140 350',
];

export default function FlytLinjer({
  tone = 'dark',
  className,
}: {
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1100 560"
      preserveAspectRatio="xMidYMid slice"
      className={clsx(
        'flytlinjer pointer-events-none absolute inset-0 h-full w-full',
        tone === 'dark' ? 'text-flyd-mint' : 'text-flyd-teal',
        className,
      )}
    >
      {paths.map((d, i) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={i === 0 ? 2.5 : 1.5}
          strokeLinecap="round"
          pathLength={1}
          className="flytlinje"
          style={{ '--i': i } as React.CSSProperties}
        />
      ))}
      <circle r="5" className="flytprikk fill-flyd-korall">
        <animateMotion dur="9s" repeatCount="indefinite" path={paths[0]} />
      </circle>
    </svg>
  );
}
