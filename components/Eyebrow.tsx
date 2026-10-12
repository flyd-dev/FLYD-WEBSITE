import clsx from 'clsx';

/**
 * Kicker – versal etikett over hver overskrift (designmanualen kap. 05/06):
 * DM Sans 700, versaler, +12 % sperring.
 *
 * - dark (Skog):   Korall-tekst, som i manualen (6,4:1).
 * - petrol:        Mint-tekst – Korall gir bare 4,2:1 på Petrol.
 * - light (Sand/Lys mint): Skog-tekst med et Korall-punktum foran. Manualen
 *   bruker Rust her, men Rust er 4,4:1 på Sand og 4,2:1 på Lys mint – under
 *   kravet på 4,5:1 for liten tekst (manualens egen tabell: «kun stor tekst»).
 *   Punktumet er logoens punktum og bærer aksenten i stedet.
 */
export default function Eyebrow({
  children,
  className,
  tone = 'light',
  as: Tag = 'p',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'light' | 'dark' | 'petrol';
  as?: 'p' | 'span' | 'div' | 'h2' | 'h3';
}) {
  const color =
    tone === 'dark'
      ? 'text-flyd-korall'
      : tone === 'petrol'
      ? 'text-flyd-mint'
      : 'puls-prikk flex items-center gap-2.5 text-flyd-skog before:h-2 before:w-2 before:flex-shrink-0 before:rounded-[2px] before:bg-flyd-korall before:content-[""]';

  return (
    <Tag
      className={clsx(
        'font-body text-[13px] font-bold uppercase leading-[1.2] tracking-[0.12em]',
        color,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
