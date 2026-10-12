import clsx from 'clsx';
import FlytLinjer from './FlytLinjer';

/**
 * Bakgrunnsrytme etter designmanualen: Sand og Lys mint veksler på innhold,
 * Petrol for seksjonsskiller, Skog for forsider og mørke flater, Flyd-teal
 * kun på avslutningsflater (signaturen).
 */
export type Tone = 'sand' | 'lysmint' | 'skog' | 'petrol' | 'teal';

const tones: Record<Tone, string> = {
  sand: 'bg-flyd-sand text-flyd-skog',
  lysmint: 'bg-flyd-lysmint text-flyd-skog',
  skog: 'on-dark bg-flyd-skog text-flyd-sand',
  petrol: 'on-dark bg-flyd-petrol text-flyd-sand',
  teal: 'on-dark bg-flyd-teal text-flyd-sand',
};

export const isDark = (tone: Tone) => tone === 'skog' || tone === 'petrol' || tone === 'teal';

export default function Section({
  id,
  tone = 'sand',
  children,
  className,
  size = 'default',
  flyt = false,
}: {
  id?: string;
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  /** Animerte flytlinjer bak innholdet. På lys bunn tones de ut mot venstre, så de aldri står bak tekst. */
  flyt?: boolean;
}) {
  const padding =
    size === 'sm' ? 'py-16 md:py-20' : size === 'lg' ? 'py-24 md:py-32' : 'py-20 md:py-28';
  return (
    <section
      id={id}
      className={clsx('relative scroll-mt-24', flyt && 'overflow-hidden', tones[tone], padding, className)}
    >
      {flyt && (
        <FlytLinjer
          tone={isDark(tone) ? 'dark' : 'light'}
          className={
            isDark(tone)
              ? 'opacity-50'
              : 'opacity-60 [mask-image:linear-gradient(to_right,transparent_35%,black_75%)]'
          }
        />
      )}
      {flyt ? <div className="relative">{children}</div> : children}
    </section>
  );
}
