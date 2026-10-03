import clsx from 'clsx';
import FlydIcon, { type FlydIconName } from './FlydIcon';

/**
 * Nummerert liste (designmanualen kap. 06): tosifret nummer i Rust – Korall
 * på mørk bunn – og tynne linjer mellom radene. Tallene settes i 24 px slik
 * at de regnes som stor tekst (Rust på Sand er 4,4:1).
 *
 * Med `icons` (ett per punkt) står et ikon fra Flyds ikonsett der nummeret
 * ville stått – til lister der rekkefølgen ikke betyr noe. Da blir listen
 * en <ul>.
 */
export default function NumberedList({
  items,
  icons,
  tone = 'light',
  className,
}: {
  items: React.ReactNode[];
  icons?: FlydIconName[];
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const dark = tone === 'dark';
  const List = icons ? 'ul' : 'ol';
  return (
    <List
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
            'flex border-b py-5 md:py-6',
            icons ? 'items-start gap-5 md:gap-6' : 'items-baseline gap-6 md:gap-8',
            dark ? 'border-flyd-sand/15' : 'border-flyd-linje-sand',
          )}
        >
          {icons ? (
            <FlydIcon
              name={icons[i]}
              className={clsx(
                'h-7 w-7 flex-shrink-0',
                dark ? 'text-flyd-mint' : 'text-flyd-teal',
              )}
            />
          ) : (
            <span
              className={clsx(
                'w-9 flex-shrink-0 font-display text-[24px] font-semibold leading-none tabular-nums',
                dark ? 'text-flyd-korall' : 'text-flyd-rust',
              )}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          )}
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
    </List>
  );
}
