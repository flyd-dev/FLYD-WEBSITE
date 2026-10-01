import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ServiceTile, type ServiceIconName, type ServiceTone } from './ServiceIcon';

/**
 * Tjenestekort (designmanualen kap. 06 «Kort med ikon»): Sand-kort på Lys
 * mint, radius 16 px, ingen skygger eller kantlinjer. Ikonet ligger på en
 * flis (radius 12 px) i Petrol, Flyd-teal eller Skog.
 */
export default function ServiceCard({
  title,
  text,
  icon,
  tone,
  href,
}: {
  title: string;
  text: string;
  icon: ServiceIconName;
  tone: ServiceTone;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-kort bg-flyd-sand p-3 transition-transform duration-300 ease-out hover:-translate-y-1 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <ServiceTile name={icon} tone={tone} className="h-36 w-full shrink-0 rounded-flis" />
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <h3 className="font-display text-[20px] font-semibold leading-[1.2] text-flyd-skog">
          {title}
        </h3>
        <p className="mt-2 text-[15px] leading-[1.55] text-flyd-skifer">{text}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[15px] font-medium text-flyd-petrol decoration-flyd-teal decoration-2 underline-offset-[6px] group-hover:underline">
          Les mer
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
