import clsx from 'clsx';
import GlassBrett, { type GlassTone } from './GlassBrett';

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
  /** Glassbrettet bak innholdet (GlassBrett). Vises bare på mørke toner (Skog, Petrol, Flyd-teal). */
  flyt?: boolean;
}) {
  const padding =
    size === 'sm' ? 'py-16 md:py-20' : size === 'lg' ? 'py-24 md:py-32' : 'py-20 md:py-28';
  // Bare på mørke flater. Bak overskrifter på lys bunn ble det for mye uro.
  const visFlyt = flyt && isDark(tone);
  return (
    <section
      id={id}
      className={clsx('relative scroll-mt-24', visFlyt && 'overflow-hidden', tones[tone], padding, className)}
    >
      {visFlyt && <GlassBrett tone={tone as GlassTone} />}
      {visFlyt ? <div className="relative">{children}</div> : children}
    </section>
  );
}
