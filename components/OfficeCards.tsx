import Link from 'next/link';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import FlydIcon from './FlydIcon';
import { hasOwnName, type Office } from '@/data/offices';

/**
 * Kontorkort: Sand-kort på Lys mint, radius 16 px, uten skygge og kantlinje.
 */
export default function OfficeCards({
  offices,
  compact = false,
  className,
}: {
  offices: Office[];
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'grid grid-cols-1 gap-4 sm:grid-cols-2',
        compact ? 'lg:grid-cols-5' : 'lg:grid-cols-3 md:gap-5',
        className,
      )}
    >
      {offices.map((o) => (
        <Link
          key={o.slug}
          href={`/kontor/${o.slug}/`}
          data-reveal
          className={clsx(
            'lys group flex flex-col rounded-kort bg-flyd-sand transition-transform duration-300 ease-out hover:-translate-y-1 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
            compact ? 'p-6' : 'p-7 md:p-8',
          )}
        >
          <FlydIcon name="lokal" className="h-6 w-6 text-flyd-teal" />
          <h3
            className={clsx(
              'mt-5 font-display font-semibold leading-tight text-flyd-skog',
              compact ? 'text-[19px]' : 'text-[22px]',
            )}
          >
            {o.city}
          </h3>
          {!compact && hasOwnName(o) && <p className="mt-1 text-[15px] text-flyd-skifer">{o.name}</p>}
          <p className="mt-3 text-[15px] leading-relaxed text-flyd-skifer">
            {o.street}
            {!compact && (
              <>
                <br />
                {o.postal}
              </>
            )}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[15px] font-medium text-flyd-petrol decoration-flyd-teal decoration-2 underline-offset-[6px] group-hover:underline">
            Se kontoret
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2}
              aria-hidden="true"
            />
          </span>
        </Link>
      ))}
    </div>
  );
}
