import clsx from 'clsx';

/**
 * Nummerert liste (designmanualen kap. 06): tosifret nummer i Rust – Korall
 * på mørk bunn – og tynne linjer mellom radene. Tallene settes i 24 px slik
 * at de regnes som stor tekst (Rust på Sand er 4,4:1).
 */
export default function NumberedList({
  items,
  tone = 'light',
  className,
}: {
  items: React.ReactNode[];
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <ol
      className={clsx(
        'border-t',
        dark ? 'border-flyd-sand/15' : 'border-flyd-linje-sand',
        className,
      )}
    >
      {items.map((item, i) => (
        <li
          key={i}
          data-reveal
          className={clsx(
            'flex items-baseline gap-6 border-b py-5 md:gap-8 md:py-6',
            dark ? 'border-flyd-sand/15' : 'border-flyd-linje-sand',
          )}
        >
          <span
            className={clsx(
              'w-9 flex-shrink-0 font-display text-[24px] font-semibold leading-none tabular-nums',
              dark ? 'text-flyd-korall' : 'text-flyd-rust',
            )}
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <span
            className={clsx(
              'text-[17px] leading-[1.55]',
              dark ? 'text-flyd-sand' : 'text-flyd-skog',
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}
